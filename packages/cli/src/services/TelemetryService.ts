import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export class TelemetryService {
  private static instance: TelemetryService;
  private enabled: boolean;
  private userId: string;

  private constructor() {
    this.enabled = process.env.DISABLE_TELEMETRY !== 'true';
    this.userId = this.getUserId();
  }

  static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  async trackEvent(name: string, properties?: Record<string, any>): Promise<void> {
    if (!this.enabled) return;

    const event = {
      name,
      properties: {
        ...properties,
        os: os.platform(),
        nodeVersion: process.version,
        timestamp: new Date().toISOString(),
        userId: this.userId
      }
    };

    // For future implementation
    console.debug('Telemetry event:', event);
  }

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