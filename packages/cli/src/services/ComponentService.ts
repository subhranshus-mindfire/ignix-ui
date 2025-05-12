/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Service responsible for managing UI components
 * Handles component fetching, installation, and configuration management
 */
import axios from 'axios';
import path from 'path';
import fs from 'fs-extra';
import { REGISTRY_CONFIG, PROJECT_PATHS } from '../config/constants';
import { ComponentNotFoundError, RegistryError, CLIError } from '../errors/CLIError';
import type { ComponentConfig, Registry } from '../types';

export class ComponentService {
  private static instance: ComponentService;
  private registry: Registry | null = null;

  /**
   * Returns singleton instance of ComponentService
   */
  static getInstance(): ComponentService {
    if (!ComponentService.instance) {
      ComponentService.instance = new ComponentService();
    }
    return ComponentService.instance;
  }

  /**
   * Loads and caches the component registry
   * Implements caching to prevent unnecessary network requests
   */
  private async loadRegistry(): Promise<Registry> {
    if (this.registry) return this.registry;

    try {
      const response = await axios.get<Registry>(
        `${REGISTRY_CONFIG.BASE_URL}${REGISTRY_CONFIG.PATHS.REGISTRY}`
      );

      if (!response.data?.components) {
        throw new RegistryError('Invalid registry format');
      }

      this.registry = response.data;
      return this.registry;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new RegistryError(`Failed to fetch registry: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Fetches a component and its files from the registry
   * @param name - Name of the component to fetch
   */
  async getComponent(name: string): Promise<ComponentConfig> {
    const registry = await this.loadRegistry();
    const componentName = name.toLowerCase();
    const component = registry.components[componentName];

    if (!component) {
      throw new ComponentNotFoundError(name);
    }

    // Fetch component files
    const files = await Promise.all(
      Object.entries(component.files).map(async ([key, fileInfo]) => {
        const fileUrl = `${REGISTRY_CONFIG.BASE_URL}/${fileInfo.path}`;
        const { data: content } = await axios.get(fileUrl);
        return [key, { ...fileInfo, content }];
      })
    );

    return {
      ...component,
      files: Object.fromEntries(files),
    };
  }

  /**
   * Retrieves list of available components from registry
   */
  async getAvailableComponents(): Promise<ComponentConfig[]> {
    const registry = await this.loadRegistry();
    return Object.values(registry.components);
  }

  /**
   * Installs a component with rollback capability
   */
  async installComponent(component: ComponentConfig): Promise<void> {
    const installedFiles: string[] = [];
    const componentsDir = path.join(process.cwd(), PROJECT_PATHS.COMPONENTS_DIR);

    try {
      // Validate component structure
      this.validateComponent(component);

      // Create component directory
      const componentDir = path.join(componentsDir, component.name.toLowerCase());
      await fs.ensureDir(componentDir);

      // Track installed files for potential rollback
      for (const [, fileInfo] of Object.entries(component.files)) {
        if (!fileInfo.content) {
          throw new CLIError(`Missing content for file: ${fileInfo.path}`, 'INVALID_COMPONENT', [
            'Try updating the CLI to the latest version',
          ]);
        }

        if (fileInfo.type === 'tailwind-config') {
          await this.mergeTailwindConfig(fileInfo.content);
          continue;
        }

        const filePath = path.join(componentDir, path.basename(fileInfo.path));
        await fs.writeFile(filePath, fileInfo.content);
        installedFiles.push(filePath);
      }

      await this.updateIndexFile(componentsDir, component.name);
    } catch (error) {
      // Rollback on failure
      await this.rollbackInstallation(installedFiles);
      throw error;
    }
  }

  /**
   * Validates component structure before installation
   */
  private validateComponent(component: ComponentConfig): void {
    if (!component.name || !component.files) {
      throw new CLIError('Invalid component structure', 'INVALID_COMPONENT', [
        'Ensure you have the latest CLI version',
      ]);
    }
  }

  /**
   * Rolls back installation if something fails
   */
  private async rollbackInstallation(files: string[]): Promise<void> {
    for (const file of files) {
      try {
        await fs.remove(file);
      } catch (error) {
        console.error(`Failed to rollback file ${file}:`, error);
      }
    }
  }

  /**
   * Merges new Tailwind configuration with existing config
   * Implements validation and safe merging strategies
   * @param newConfig - New configuration to merge
   */
  private async mergeTailwindConfig(newConfig: string): Promise<void> {
    const configPath = path.resolve(PROJECT_PATHS.CONFIG_FILES.TAILWIND);

    try {
      if (!(await fs.pathExists(configPath))) {
        throw new CLIError('Tailwind config file not found', 'CONFIG_NOT_FOUND', [
          'Run `animation-ui init` first to create the config file',
        ]);
      }

      const existingConfig = await fs.readFile(configPath, 'utf-8');

      // Add validation for config format
      if (!this.isValidTailwindConfig(existingConfig)) {
        throw new CLIError('Invalid tailwind config format', 'INVALID_CONFIG', [
          'Ensure your tailwind.config.js follows the correct format',
        ]);
      }

      // Convert configs to objects
      const existingConfigObj = this.parseTailwindConfig(existingConfig);
      const newConfigObj = this.parseTailwindConfig(newConfig);

      // Deep merge the theme.extend properties
      const mergedConfig = {
        ...existingConfigObj,
        theme: {
          extend: {
            ...existingConfigObj.theme?.extend,
            keyframes: {
              ...existingConfigObj.theme?.extend?.keyframes,
              ...newConfigObj.theme?.extend?.keyframes,
            },
            animation: {
              ...existingConfigObj.theme?.extend?.animation,
              ...newConfigObj.theme?.extend?.animation,
            },
          },
        },
      };

      // Convert back to string with proper formatting
      const mergedConfigString = `module.exports = ${this.objectToString(mergedConfig)}`;

      // Write merged config back to file
      await fs.writeFile(configPath, mergedConfigString);
    } catch (error) {
      if (error instanceof CLIError) throw error;
      throw new CLIError(
        `Failed to merge tailwind config: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        'MERGE_FAILED'
      );
    }
  }

  /**
   * Validates Tailwind configuration format
   * @param config - Configuration string to validate
   */
  private isValidTailwindConfig(config: string): boolean {
    try {
      const cleanConfig = config
        .replace(/module\.exports\s*=\s*/, '')
        .replace(/;$/, '')
        .trim();
      Function(`return ${cleanConfig}`)();
      return true;
    } catch {
      return false;
    }
  }

  private objectToString(obj: any, indent = 2): string {
    if (Array.isArray(obj)) {
      const arrayItems = obj
        .map((item) => (typeof item === 'string' ? `'${item}'` : this.objectToString(item)))
        .join(', ');
      return `[${arrayItems}]`;
    }

    if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj)
        .map(([key, value]) => {
          const valueStr = typeof value === 'string' ? `'${value}'` : this.objectToString(value);
          return `${key}: ${valueStr}`;
        })
        .join(',\n' + ' '.repeat(indent));
      return `{\n${' '.repeat(indent)}${entries}\n${' '.repeat(Math.max(0, indent - 2))}}`;
    }

    return String(obj);
  }

  private parseTailwindConfig(config: string): any {
    try {
      // First attempt: eval the config directly (safer than using Function)
      const cleanConfig = config
        .replace(/module\.exports\s*=\s*/, '')
        .replace(/;$/, '')
        .trim();

      // Use Function to evaluate the JavaScript object
      // This safely handles arrays and other JS syntax
      return Function(`return ${cleanConfig}`)();
    } catch (error) {
      throw new Error(
        `Invalid tailwind config format: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  private async updateIndexFile(componentsDir: string, componentName: string): Promise<void> {
    const indexPath = path.join(componentsDir, 'index.ts');
    const exportStatement = `export * from './${componentName.toLowerCase()}';\n`;

    const indexContent = (await fs.pathExists(indexPath))
      ? await fs.readFile(indexPath, 'utf-8')
      : '';

    if (!indexContent.includes(exportStatement)) {
      await fs.appendFile(indexPath, exportStatement);
    }
  }
}
