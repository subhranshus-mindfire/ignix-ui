/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Service responsible for tracking CLI usage analytics while respecting user privacy
 * Implements singleton pattern for consistent tracking across the application
 */
import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export class TelemetryService {
  private static instance: TelemetryService;
  private enabled: boolean;
  private userId: string;

  /**
   * Private constructor to enforce singleton pattern
   * Initializes telemetry settings and user identification
   */
  private constructor() {
    this.enabled = process.env.DISABLE_TELEMETRY !== 'true';
    this.userId = this.getUserId();
  }

  /**
   * Returns singleton instance of TelemetryService
   */
  static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  /**
   * Tracks a CLI event with retry logic and exponential backoff
   * @param name - Name of the event to track
   * @param properties - Additional properties to include with the event
   */
  async trackEvent(name: string, properties?: Record<string, any>): Promise<void> {
    if (!this.enabled) return;

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const event = {
          name,
          properties: {
            ...properties,
            os: os.platform(),
            nodeVersion: process.version,
            timestamp: new Date().toISOString(),
            userId: this.userId,
            retryCount,
          },
        };

        // TODO: Implement actual telemetry sending
        // For now just log
        console.debug('Telemetry event:', event);
        break;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error('Failed to send telemetry after retries:', error);
        }
        // Exponential backoff between retries
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, retryCount) * 100));
      }
    }
  }

  /**
   * Retrieves or generates a unique user ID for telemetry tracking
   * Stores ID in local config file for persistence
   */
  private getUserId(): string {
    const configPath = path.join(os.homedir(), '.animation-ui', 'config.json');
    try {
      const config = fs.readJsonSync(configPath);
      return config.userId;
    } catch {
      const userId = uuidv4();
      fs.outputJsonSync(configPath, { userId });
      return userId;
    }
  }
}
