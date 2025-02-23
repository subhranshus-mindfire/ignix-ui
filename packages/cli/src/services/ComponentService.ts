import axios from 'axios';
import path from 'path';
import fs from 'fs-extra';
import { REGISTRY_CONFIG , PROJECT_PATHS} from '../config/constants';
import { ComponentNotFoundError, RegistryError } from '../errors/CLIError';
import type { ComponentConfig, Registry } from '../types';

export class ComponentService {
  private static instance: ComponentService;
  private registry: Registry | null = null;

  static getInstance(): ComponentService {
    if (!ComponentService.instance) {
      ComponentService.instance = new ComponentService();
    }
    return ComponentService.instance;
  }

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
      files: Object.fromEntries(files)
    };
  }

  async getAvailableComponents(): Promise<ComponentConfig[]> {
    const registry = await this.loadRegistry();
    return Object.values(registry.components);
  }

  async installComponent(component: ComponentConfig): Promise<void> {
    const componentsDir = path.join(process.cwd(), PROJECT_PATHS.COMPONENTS_DIR);
    const componentDir = path.join(componentsDir, component.name.toLowerCase());
    
    await fs.ensureDir(componentDir);
    
    for (const [_, fileInfo] of Object.entries(component.files)) {
      if (!fileInfo.content) {
        throw new Error(`Missing content for file: ${fileInfo.path}`);
      }

      // Handle tailwind config files differently
      if (fileInfo.type === 'tailwind-config') {
        await this.mergeTailwindConfig(fileInfo.content);
        continue;
      }

      const filePath = path.join(componentDir, path.basename(fileInfo.path));
      await fs.writeFile(filePath, fileInfo.content);
    }

    await this.updateIndexFile(componentsDir, component.name);
  }

  private async mergeTailwindConfig(newConfig: string): Promise<void> {
    const configPath = path.resolve(PROJECT_PATHS.CONFIG_FILES.TAILWIND);
    
    if (!await fs.pathExists(configPath)) {
      throw new Error('Tailwind config file not found. Please run `animation-ui init` first.');
    }

    try {
      // Read existing config
      const existingConfig = await fs.readFile(configPath, 'utf-8');
      
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
              ...newConfigObj.theme?.extend?.keyframes
            },
            animation: {
              ...existingConfigObj.theme?.extend?.animation,
              ...newConfigObj.theme?.extend?.animation
            }
          }
        }
      };

      // Convert back to string with proper formatting
      const mergedConfigString = `module.exports = ${JSON.stringify(mergedConfig, null, 2)}`;

      // Write merged config back to file
      await fs.writeFile(configPath, mergedConfigString);
    } catch (error) {
      throw new Error(`Failed to merge tailwind config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private parseTailwindConfig(config: string): any {
    try {
      // Remove 'module.exports =' and parse the rest
      const configContent = config.replace(/module\.exports\s*=\s*/, '').trim();
      // Parse the object, handling the case where it might end with a semicolon
      return JSON.parse(configContent.replace(/;$/, ''));
    } catch (error) {
      // If JSON.parse fails, try evaluating as JavaScript object
      const cleanConfig = config
        .replace(/module\.exports\s*=\s*/, '')
        .replace(/;$/, '')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ') // Convert property names to quoted strings
        .replace(/'/g, '"'); // Replace single quotes with double quotes
      
      return JSON.parse(cleanConfig);
    }
  }

  private async updateIndexFile(componentsDir: string, componentName: string): Promise<void> {
    const indexPath = path.join(componentsDir, 'index.ts');
    const exportStatement = `export * from './${componentName.toLowerCase()}';\n`;

    const indexContent = await fs.pathExists(indexPath)
      ? await fs.readFile(indexPath, 'utf-8')
      : '';

    if (!indexContent.includes(exportStatement)) {
      await fs.appendFile(indexPath, exportStatement);
    }
  }
} 