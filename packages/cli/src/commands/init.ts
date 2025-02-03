import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { getPackageManager } from '../utils/getPackageManager';
import { addDependencies } from '../utils/dependencies';

export async function init(options: { yes?: boolean }) {
  const spinner = ora('Initializing animation-ui...').start();

  try {
    // Check if project has required dependencies
    const packageJson = await fs.readJSON('package.json');
    
    // Initialize tailwind.config.js if it doesn't exist
    const tailwindConfigPath = path.resolve('tailwind.config.js');
    if (!await fs.pathExists(tailwindConfigPath)) {
      await fs.writeFile(
        tailwindConfigPath,
        `module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}`
      );
    }

    // Create components/ui directory if it doesn't exist
    const uiDir = path.resolve('src/components/ui');
    await fs.ensureDir(uiDir);

    // Add utils/cn.ts
    const utilsDir = path.resolve('utils');
    await fs.ensureDir(utilsDir);
    await fs.writeFile(
      path.join(utilsDir, 'cn.ts'),
      `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
    );

    // Add required dependencies
 // Get the package manager for the project
 const pkgManager = await getPackageManager(process.cwd());

    await addDependencies({
      dependencies: [
        'framer-motion',
        'clsx',
        'tailwind-merge'
      ],
      devDependencies: [
        'tailwindcss',
        'autoprefixer',
        'postcss'
      ],
      packageManager: pkgManager
    });

    spinner.succeed(chalk.green('Successfully initialized animation-ui'));
    
    console.log('\nNext steps:');
    console.log('1. Add components using:', chalk.cyan('npx animation-ui add <component>'));
    console.log('2. Start using animations in your project!\n');

  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize animation-ui'));
    console.error(error);
    process.exit(1);
  }
}
