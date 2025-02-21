// utils/tailwind.ts
import fs from 'fs-extra';
import path from 'path';
import type { TailwindConfig } from '../types';

export async function mergeTailwindConfig(
  config: TailwindConfig,
  projectRoot: string = process.cwd()
): Promise<void> {
  const configPath = path.join(projectRoot, 'tailwind.config.js');
  
  if (!await fs.pathExists(configPath)) {
    throw new Error('tailwind.config.js not found');
  }

  let existingConfig = await import(configPath);

  // Ensure the theme.extend structure exists
  existingConfig = {
    ...existingConfig,
    theme: {
      ...existingConfig.theme,
      extend: {
        ...existingConfig.theme?.extend,
        keyframes: {
          ...existingConfig.theme?.extend?.keyframes,
          ...config.keyframes,
        },
        animation: {
          ...existingConfig.theme?.extend?.animation,
          ...config.animation,
        },
      },
    },
  };

  // Write the updated config
  const configContent = `module.exports = ${JSON.stringify(existingConfig, null, 2)}`;
  await fs.writeFile(configPath, configContent);
}