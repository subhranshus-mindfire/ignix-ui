// utils/components.ts
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { mergeTailwindConfig } from './tailwind';
import type { ComponentConfig, Registry, ComponentConfigFile } from '../types';

const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry';

export async function getComponent(name: string): Promise<ComponentConfig | null> {
  try {
    // Fetch registry
    const { data: registry } = await axios.get<Registry>(`${REGISTRY_BASE_URL}/registry.json`);
    
    const componentInfo = registry.components[name];
    if (!componentInfo) {
      throw new Error(`Component ${name} not found in registry`);
    }

    // Fetch all component files
    const files = await Promise.all(
      Object.entries(componentInfo.files).map(async ([key, fileInfo]) => {
        const fileUrl = `${REGISTRY_BASE_URL}/${fileInfo.path}`;
        const { data: content } = await axios.get(fileUrl);
        return [key, { ...fileInfo, content }];
      })
    );

    return {
      ...componentInfo,
      files: Object.fromEntries(files)
    };
  } catch (error) {
    console.error(`Error fetching component ${name}:`, error);
    return null;
  }
}

export async function installComponent(
  component: ComponentConfig,
  projectRoot: string = process.cwd()
): Promise<void> {
  // Create base directories
  const componentsDir = path.join(projectRoot, 'src/components/ui');
  await fs.ensureDir(componentsDir);

  // Create component directory
  const componentDir = path.join(componentsDir, component.name.toLowerCase());
  await fs.ensureDir(componentDir);

  // Install all component files
  for (const [_, fileInfo] of Object.entries(component.files)) {
    const filePath = path.join(componentDir, path.basename(fileInfo.path));
    if (fileInfo.content !== undefined) {
      await fs.writeFile(filePath, fileInfo.content);
    } else {
      console.warn(`File content for ${filePath} is undefined.`);
    }

    // If this is a config file, handle Tailwind configuration
    if (fileInfo.type === 'config' && fileInfo.content) {
      const config: ComponentConfigFile = eval(`(${fileInfo.content})`);
      if (config.tailwind) {
        await mergeTailwindConfig(config.tailwind, projectRoot);
      }
    }
  }

  // Create/update index.ts for component exports
  const indexPath = path.join(componentsDir, 'index.ts');
  const indexContent = await fs.pathExists(indexPath)
    ? await fs.readFile(indexPath, 'utf-8')
    : '';

  const exportStatement = `export * from './${component.name.toLowerCase()}';\n`;
  if (!indexContent.includes(exportStatement)) {
    await fs.appendFile(indexPath, exportStatement);
  }
}

export async function getAvailableComponents(): Promise<ComponentConfig[]> {
  try {
    const { data: registry } = await axios.get<Registry>(`${REGISTRY_BASE_URL}/registry.json`);
    return Object.values(registry.components);
  } catch (error) {
    console.error('Error loading components from registry:', error);
    return [];
  }
}