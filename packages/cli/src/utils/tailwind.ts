import fs from 'fs-extra';
import path from 'path';

export async function mergeTailwindConfig(
  configToMerge: any,
  projectRoot: string = process.cwd()
): Promise<void> {
  const configPath = path.join(projectRoot, 'tailwind.config.ts');
  const jsConfigPath = path.join(projectRoot, 'tailwind.config.js');

  // Determine which config file exists
  const finalConfigPath = (await fs.pathExists(configPath)) ? configPath : jsConfigPath;

  if (!(await fs.pathExists(finalConfigPath))) {
    throw new Error('tailwind.config.ts or tailwind.config.js not found');
  }

  // Read and evaluate the existing config file
  const configContent = await fs.readFile(finalConfigPath, 'utf-8');

  // Handle both module.exports and export default syntax
  const configMatch = configContent.match(/(?:module\.exports|export default)\s*=\s*({[\s\S]*})/);
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

  // Create the new config content while preserving the format
  const isTypeScript = finalConfigPath.endsWith('.ts');
  const configHeader = isTypeScript
    ? `import type { Config } from 'tailwindcss'\n\nexport default `
    : `/** @type {import('tailwindcss').Config} */\nmodule.exports = `;

  // Convert the config to a string while preserving the format
  const configString = JSON.stringify(mergedConfig, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from property names
    .replace(/"/g, "'") // Replace double quotes with single quotes
    .replace(/'([^']*)':/g, '$1:') // Remove quotes from property names (again, for nested objects)
    .replace(/\[/g, '[\n    ') // Format arrays
    .replace(/\]/g, '\n  ]')
    .replace(/\{\n/g, '{\n  ') // Indent object contents
    .replace(/\n\}/g, '\n  }');

  const newConfigContent = `${configHeader}${configString}`;

  // Write the updated config
  await fs.writeFile(finalConfigPath, newConfigContent);
}
