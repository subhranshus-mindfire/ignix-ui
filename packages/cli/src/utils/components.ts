import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { mergeTailwindConfig } from './tailwind';
import type { ComponentConfig, Registry } from '../types';

const REGISTRY_BASE_URL =
  'https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry';

/**
 * Fetches component information and files from the registry
 */
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
    const componentName = name.toLowerCase();
    const componentInfo = registry.components[componentName];

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
          if (typeof content !== 'string') {
            throw new Error(`Invalid content type for file: ${fileInfo.path}`);
          }

          return [key, { ...fileInfo, content }];
        } catch (error) {
          console.error(`Error fetching file ${fileInfo.path}:`, error);
          throw new Error(`Failed to fetch file: ${fileInfo.path}`);
        }
      })
    );

    const component: ComponentConfig = {
      ...componentInfo,
      files: Object.fromEntries(files),
    };

    return component;
  } catch (error) {
    console.error(`Error fetching component ${name}:`, error);
    return null;
  }
}

/**
 * Installs a component and its files into the project
 */
export async function installComponent(
  component: ComponentConfig,
  projectRoot: string = process.cwd()
): Promise<void> {
  try {
    const componentsDir = path.join(projectRoot, 'src/components/ui');
    await fs.ensureDir(componentsDir);

    const componentDir = path.join(componentsDir, component.name.toLowerCase());
    await fs.ensureDir(componentDir);

    // Track processed files for error reporting
    const processedFiles: string[] = [];

    // Install all component files
    for (const [key, fileInfo] of Object.entries(component.files)) {
      try {
        if (!fileInfo.content) {
          throw new Error(`Missing content for file: ${fileInfo.path}`);
        }

        // Skip writing config files to disk, but still process them
        if (fileInfo.type === 'tailwind-config') {
          await processFile(fileInfo, fileInfo.content, projectRoot);
          continue;
        }

        // Write other files to disk
        const filePath = path.join(componentDir, path.basename(fileInfo.path));
        await fs.writeFile(filePath, fileInfo.content);
        console.log(`Written file: ${filePath}`);
        processedFiles.push(filePath);

        // Process the file (for non-config files)
        await processFile(fileInfo, fileInfo.content, projectRoot);
      } catch (error) {
        console.error(`Error processing file ${key}:`, error);
        // Cleanup on failure
        await cleanupFailedInstallation(processedFiles);
        throw error;
      }
    }

    // Update index.ts
    await updateIndexFile(componentsDir, component.name);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to install component: ${error.message}`);
    } else {
      throw new Error('Failed to install component: Unknown error');
    }
  }
}

async function processFile(fileInfo: any, content: string, projectRoot: string): Promise<void> {
  switch (fileInfo.type) {
    case 'component':
    case 'types':
    case 'hook': {
      // Handle component files by creating them in the target directory
      const targetPath = path.join(projectRoot, fileInfo.path);
      await fs.ensureDir(path.dirname(targetPath));
      await fs.writeFile(targetPath, content);
      break;
    }
    case 'tailwind-config': {
      // Only merge the config, don't create a new file
      await processConfigFile(content, projectRoot);
      break;
    }
    default:
      throw new Error(`Unknown file type: ${fileInfo.type}`);
  }
}

/**
 * Processes a config file and updates Tailwind configuration
 */
async function processConfigFile(content: string, projectRoot: string): Promise<void> {
  try {
    // Find the configuration object in the file content
    const configMatch = content.match(/module\.exports\s*=\s*({[\s\S]*})/);
    if (!configMatch) {
      throw new Error('Invalid config file format');
    }

    // Parse the configuration
    const config = eval(`(${configMatch[1]})`);

    // If there's tailwind configuration, merge it
    if (config.tailwind) {
      await mergeTailwindConfig(config.tailwind, projectRoot);
      console.log('Updated Tailwind configuration');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing config file: ${error.message}`);
    } else {
      throw new Error('Error processing config file: Unknown error');
    }
  }
}

/**
 * Updates the index.ts file with new component exports
 */
async function updateIndexFile(componentsDir: string, componentName: string): Promise<void> {
  const indexPath = path.join(componentsDir, 'index.ts');
  const exportStatement = `export * from './${componentName.toLowerCase()}';\n`;

  try {
    // Read existing content or create empty string
    const indexContent = (await fs.pathExists(indexPath))
      ? await fs.readFile(indexPath, 'utf-8')
      : '';

    // Only add export if it doesn't exist
    if (!indexContent.includes(exportStatement)) {
      await fs.appendFile(indexPath, exportStatement);
      console.log('Updated component index file');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update index file: ${error.message}`);
    } else {
      throw new Error('Failed to update index file: Unknown error');
    }
  }
}

/**
 * Cleans up files if installation fails
 */
async function cleanupFailedInstallation(files: string[]): Promise<void> {
  for (const file of files) {
    try {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
        console.log(`Cleaned up file: ${file}`);
      }
    } catch (error) {
      console.error(`Failed to clean up file ${file}:`, error);
    }
  }
}

/**
 * Gets a list of all available components from the registry
 */
export async function getAvailableComponents(): Promise<ComponentConfig[]> {
  try {
    console.log('Fetching available components...');
    const { data: registry } = await axios.get<Registry>(`${REGISTRY_BASE_URL}/registry.json`);

    if (!registry || !registry.components) {
      throw new Error('Invalid registry format: Missing components object');
    }

    return Object.values(registry.components);
  } catch (error) {
    console.error('Error loading components from registry:', error);
    return [];
  }
}
