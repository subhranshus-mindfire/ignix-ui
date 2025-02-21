import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { mergeTailwindConfig } from './tailwind';
import type { ComponentConfig, Registry, ComponentConfigFile } from '../types';

const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry';

export async function getComponent(name: string): Promise<ComponentConfig | null> {
  try {
    console.log(`Fetching registry from: ${REGISTRY_BASE_URL}/registry.json`);
    
    // Fetch registry
    const response = await axios.get<Registry>(`${REGISTRY_BASE_URL}/registry.json`);
    const registry = response.data;
    
    // Validate registry
    if (!registry || !registry.components) {
      throw new Error('Invalid registry format: Missing components object');
    }

    // Look up component (case insensitive)
    const componentInfo = registry.components[name.toLowerCase()];
    if (!componentInfo) {
      throw new Error(`Component "${name}" not found in registry`);
    }

    console.log(`Fetching files for component: ${name}`);

    // Fetch all component files
    const files = await Promise.all(
      Object.entries(componentInfo.files).map(async ([key, fileInfo]) => {
        try {
          const fileUrl = `${REGISTRY_BASE_URL}/${fileInfo.path}`;
          console.log(`Fetching file: ${fileUrl}`);
          
          const { data: content } = await axios.get(fileUrl);
          return [key, { ...fileInfo, content }];
        } catch (error) {
          console.error(`Error fetching file ${fileInfo.path}:`, error);
          throw new Error(`Failed to fetch file: ${fileInfo.path}`);
        }
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
  const componentsDir = path.join(projectRoot, 'src/components/ui');
  await fs.ensureDir(componentsDir);

  const componentDir = path.join(componentsDir, component.name.toLowerCase());
  await fs.ensureDir(componentDir);

  // Install all component files
  for (const [_, fileInfo] of Object.entries(component.files)) {
    const filePath = path.join(componentDir, path.basename(fileInfo.path));
    
    if (!fileInfo.content) {
      throw new Error(`Missing content for file: ${fileInfo.path}`);
    }

    await fs.writeFile(filePath, fileInfo.content);
    console.log(`Written file: ${filePath}`);

    // Handle config files
    if (fileInfo.type === 'config' && fileInfo.content) {
      try {
        // Extract the configuration object using regex
        const configMatch = fileInfo.content.match(/module\.exports\s*=\s*({[\s\S]*})/);
        if (configMatch) {
          const configObject = eval(`(${configMatch[1]})`);
          if (configObject.theme?.extend) {
            await mergeTailwindConfig(configObject.theme.extend, projectRoot);
            console.log('Updated Tailwind configuration');
          }
        }
      } catch (error) {
        console.error('Error processing config file:', error);
        throw error;
      }
    }
  }

  // Update index.ts
  const indexPath = path.join(componentsDir, 'index.ts');
  const indexContent = await fs.pathExists(indexPath)
    ? await fs.readFile(indexPath, 'utf-8')
    : '';

  const exportStatement = `export * from './${component.name.toLowerCase()}';\n`;
  if (!indexContent.includes(exportStatement)) {
    await fs.appendFile(indexPath, exportStatement);
    console.log('Updated component index file');
  }
}