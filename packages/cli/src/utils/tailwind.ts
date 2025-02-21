// utils/tailwind.ts
import fs from 'fs-extra';
import path from 'path';

export async function mergeTailwindConfig(
  configToMerge: any,
  projectRoot: string = process.cwd()
): Promise<void> {
  const configPath = path.join(projectRoot, 'tailwind.config.ts');
  const jsConfigPath = path.join(projectRoot, 'tailwind.config.js');
  
  // Determine which config file exists
  const finalConfigPath = await fs.pathExists(configPath) ? configPath : jsConfigPath;
  
  if (!await fs.pathExists(finalConfigPath)) {
    throw new Error('tailwind.config.ts or tailwind.config.js not found');
  }

  // Read the existing config file
  const configContent = await fs.readFile(finalConfigPath, 'utf-8');
  
  // Extract the configuration object
  const configMatch = configContent.match(/module\.exports\s*=\s*({[\s\S]*})/);
  if (!configMatch) {
    throw new Error('Invalid Tailwind config format');
  }

  // Parse the existing config
  const existingConfig = eval(`(${configMatch[1]})`);

  // Deep merge the configurations
  const mergedConfig = {
    ...existingConfig,
    theme: {
      ...existingConfig.theme,
      extend: {
        ...existingConfig.theme?.extend,
        keyframes: {
          ...existingConfig.theme?.extend?.keyframes,
          ...configToMerge.keyframes,
        },
        animation: {
          ...existingConfig.theme?.extend?.animation,
          ...configToMerge.animation,
        },
      },
    },
  };

  // Create the new config content
  const newConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(mergedConfig, null, 2)}`;

  // Write the updated config
  await fs.writeFile(finalConfigPath, newConfigContent);
}