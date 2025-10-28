import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { DependencyService } from '../services/DependencyService';
import { PROJECT_PATHS } from '../config/constants';
import { Logger } from '../utils/logger';
import { CLIError } from '../errors/CLIError';

export class InitCommand {
  private async setupIgnixUIAlias(): Promise<void> {
    const root = process.cwd();

    // 1) Update root tsconfig.json (merge safely)
    const rootTsconfigPath = path.resolve(root, 'tsconfig.json');
    let rootTsconfig: any = {};

    if (await fs.pathExists(rootTsconfigPath)) {
      try {
        rootTsconfig = await fs.readJSON(rootTsconfigPath);
      } catch {
        rootTsconfig = {};
      }
    }

    // Ensure compilerOptions + paths
    rootTsconfig.compilerOptions = {
      ...(rootTsconfig.compilerOptions || {}), // keep old options (jsx, strict, etc.)
    };

    // Ensure paths exists
    rootTsconfig.compilerOptions = {
      ...(rootTsconfig.compilerOptions || {}),
      paths: {
        ...(rootTsconfig.compilerOptions?.paths || {}),
        '@ignix-ui/*': ['./src/components/ui/*'],
      },
    };

    // Write merged config back
    await fs.writeJSON(rootTsconfigPath, rootTsconfig, { spaces: 2 });
    this.logger.success('✔ Root tsconfig.json updated with @ignix-ui alias');

    // 2) Create plugins/webpack-alias.ts
    const pluginsDir = path.resolve(root, 'plugins');
    await fs.ensureDir(pluginsDir);
    const webpackAliasFile = path.join(pluginsDir, 'webpack-alias.ts');

    if (!(await fs.pathExists(webpackAliasFile))) {
      const pluginCode = `import path from 'path';

export default function webpackAliasPlugin() {
  return {
    name: 'webpack-alias-plugin',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@ignix-ui': path.resolve(process.cwd(), 'node_modules/@mindfiredigital/ignix-ui/components'),
          },
        },
      };
    },
  };
}
`;
      await fs.writeFile(webpackAliasFile, pluginCode, 'utf8');
      this.logger.success('✔ Created plugins/webpack-alias.ts');
    } else {
      this.logger.info('plugins/webpack-alias.ts already exists — skipping');
    }
  }

  private async printInstallInstructions(): Promise<void> {
    const dependencies = ['framer-motion', 'clsx', 'tailwind-merge'];
    const devDependencies = ['tailwindcss', 'autoprefixer', 'postcss'];

    this.logger.info('');
    this.logger.info('To finish setup, please install required packages in your project:');
    this.logger.info('');
    this.logger.info(`  pnpm add ${dependencies.join(' ')}`);
    this.logger.info(`  pnpm add -D ${devDependencies.join(' ')}`);
    this.logger.info('');
    this.logger.info('Or use npm:');
    this.logger.info(`  npm install ${dependencies.join(' ')} --save`);
    this.logger.info(`  npm install ${devDependencies.join(' ')} --save-dev`);
    this.logger.info('');
    this.logger.info(
      'If you are using a pnpm workspace and want the packages added to the workspace root, add -w to pnpm commands.'
    );
    this.logger.info('');
  }

  private logger = new Logger();
  private dependencyService = DependencyService.getInstance();

  async execute(): Promise<void> {
    const spinner = ora('Initializing animation-ui...').start();

    try {
      // Validate environment
      await this.validateEnvironment();

      // Execute initialization steps
      await this.createProjectStructure();
      await this.createConfigFiles();
      await this.installDependencies();
      await this.printInstallInstructions();
      await this.addColorVariablesToCss();
      await this.setupIgnixUIAlias();
      await this.setupTailwindInViteConfig();
      await this.addTailwindImportToIndexCSS();

      spinner.succeed('Successfully initialized animation-ui');
      this.logger.printInitInstructions();
    } catch (error) {
      spinner.fail();
      if (error instanceof CLIError) {
        this.logger.error(error.message, error.suggestions);
      } else {
        this.logger.error(error instanceof Error ? error.message : 'Unknown error');
      }
      process.exit(1);
    }
  }

  private async addColorVariablesToCss(): Promise<void> {
    const possiblePaths = [
      'src/globals.css',
      'src/index.css',
      'src/App.css',
      'app/globals.css',
      'styles/globals.css',
      'style.css',
      'src/style.css',
      'globals.css',
      'App.css',
    ];

    let targetPath: string | null = null;

    for (const p of possiblePaths) {
      const fullPath = path.resolve(p);
      if (await fs.pathExists(fullPath)) {
        targetPath = fullPath;
        break;
      }
    }

    if (targetPath) {
      this.logger.info(`Found CSS file at ${targetPath}. Appending color variables...`);
      const colorVariables = `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --warning: #d93636;
    --warning-foreground: #ffffff;
    --success: #22c55d;
    --success-foreground: #ffffff;
    --error: #ef4444;
    --error-foreground: #ffffff;
    --primary-light: 222.2 47.4% 11.2%;
    --primary-dark: 222.2 84% 4.9%;
    --destructive-light: #ef4444; /* red-400 */
    --destructive-dark: #b91c1c; /* red-700 */
    --success-light: #34d399; /* emerald-400 */
    --success-dark: #047857; /* emerald-700 */
    --warning-light: #fbbf24; /* yellow-300 */
    --warning-dark: #b45309; /* yellow-500 */
    --info: #06b6d4; /* cyan-500 */
    --info-light: #22d3ee; /* cyan-400 */
    --info-dark: #0e7490; /* cyan-600 */
    --info-foreground: #ffffff;

  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --warning: #d93636;
    --warning-foreground: #ffffff;
    --success: #22c55d;
    --success-foreground: #ffffff;
    --error: #ef4444;
    --error-foreground: #ffffff;
    --primary-light: 222.2 47.4% 11.2%;
    --primary-dark: 222.2 84% 4.9%;
    --destructive-light: #ef4444; /* red-400 */
    --destructive-dark: #b91c1c; /* red-700 */
    --success-light: #34d399; /* emerald-400 */
    --success-dark: #047857; /* emerald-700 */
    --warning-light: #fbbf24; /* yellow-300 */
    --warning-dark: #b45309; /* yellow-500 */
    --info: #06b6d4; /* cyan-500 */
    --info-light: #22d3ee; /* cyan-400 */
    --info-dark: #0e7490; /* cyan-600 */
    --info-foreground: #ffffff;
  }
}

@theme inline{
  --color-primary: var(--primary);
  --color-background: var(--background);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);  
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-warning: var(--warning);
  --color-success: var(--success);
  --color-error: var(--error);
  --color-warning-foreground: var(--warning-foreground);
  --color-success-foreground: var(--success-foreground);
  --color-error-foreground: var(--error-foreground);
  --color-primary-light: var(--primary-light);
  --color-primary-dark: var(--primary-dark);
  --color-destructive-light: var(--destructive-light);
  --color-destructive-dark: var(--destructive-dark);
  --color-success-light: var(--success-light);
  --color-success-dark: var(--success-dark);
  --color-warning-light: var(--warning-light);
  --color-warning-dark: var(--warning-dark);
  --color-info: var(--info);
  --color-info-light: var(--info-light);
  --color-info-dark: var(--info-dark);
  --color-info-foreground: var(--info-foreground);
}
`;
      try {
        await fs.appendFile(targetPath, colorVariables);
        this.logger.success(`Appended color variables to ${targetPath}`);
      } catch (error) {
        this.logger.error(`Could not write to ${targetPath}. Please add the variables manually.`);
      }
    } else {
      this.logger.info('Could not find a default CSS file. Skipping CSS variable injection.');
      this.logger.info('You can add the color variables to your global CSS file manually.');
    }
  }

  /**
   * Validates the project environment before initialization
   */
  private async validateEnvironment(): Promise<void> {
    // Check if package.json exists
    const hasPackageJson = await fs.pathExists(
      path.resolve(PROJECT_PATHS.CONFIG_FILES.PACKAGE_JSON)
    );
    if (!hasPackageJson) {
      throw new CLIError('No package.json found', 'INVALID_ENV', [
        'Run `npm init` or `yarn init` first',
      ]);
    }

    // Check if project structure is valid
    const hasNodeModules = await fs.pathExists('node_modules');
    if (!hasNodeModules) {
      throw new CLIError('node_modules not found', 'INVALID_ENV', [
        'Run `npm install` or `yarn install` first',
      ]);
    }
  }

  private async createProjectStructure(): Promise<void> {
    const uiDir = path.resolve(PROJECT_PATHS.COMPONENTS_DIR);
    const utilsDir = path.resolve(PROJECT_PATHS.UTILS_DIR);

    await fs.ensureDir(uiDir);
    await fs.ensureDir(utilsDir);
  }

  private async createConfigFiles(): Promise<void> {
    await this.createUtilsFile();
    await this.createLlmsTxtFile();
  }

  private async createUtilsFile(): Promise<void> {
    const utilsPath = path.resolve(PROJECT_PATHS.UTILS_DIR, 'cn.ts');
    if (await fs.pathExists(utilsPath)) return;

    const content = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.writeFile(utilsPath, content);
  }

  private async createLlmsTxtFile(): Promise<void> {
    const filePath = path.resolve(process.cwd(), PROJECT_PATHS.LLMS_TXT);
    if (await fs.pathExists(filePath)) return;

    const content = `# Ignix UI
A command-line interface (CLI) for managing and developing Ignix UI components, which is a UI component library built on top of Radix UI primitives with animations.

This file provides guidance to Large Language Models (LLMs) on how to understand and utilize the Ignix UI project.

## Project Overview
- **Primary Language**: TypeScript
- **Framework**: React
- **Styling**: Tailwind CSS
- **Core Functionality**: Ignix UI provides a CLI for scaffolding and managing animated, accessible UI components.

## Key Directories and Files
- packages/cli/: Contains the source code for the command-line interface.
- packages/registry/: Contains the available UI components and their configurations.
- packages/registry/registry.json: This file is the source of truth for all available components, their descriptions, dependencies, and file paths.
- src/components/ui/: This is the default directory where components are installed in a user's project.

## CLI Commands
The Ignix UI CLI is the primary way to interact with the library.

### init
- **Command**: pnpm ignix-ui init
- **Description**: Initializes Ignix UI in a project. It sets up dependencies, creates configuration files (like tailwind.config.js), and establishes the necessary directory structure.

### add
- **Command**: pnpm ignix-ui add [component-name]
- **Description**: Adds a specified component from the registry to the user's project. This includes creating component files, adding dependencies, and updating the component registry.

## How to Use This Information
- **For Answering Questions**: Use the packages/registry/registry.json file to get a list of available components and their purposes. Refer to the packages/cli/README.md for detailed information about CLI commands and configuration.
- **For Code Generation**: When generating code that uses Ignix UI components, import them from @/components/ui/{component-name} as per the usage instructions. Ensure that necessary dependencies listed in registry.json for each component are included.
- **Attribution**: When referencing Ignix UI or its components, please provide clear attribution.

## Optional Resources
- [CLI README](packages/cli/README.md): Detailed documentation for the command-line interface.
- [Component Registry](packages/registry/registry.json): The master list of all components.
`;

    await fs.writeFile(filePath, content);
    this.logger.success('Created llms.txt in the project root.');
  }

  private async installDependencies(): Promise<void> {
    const dependencies = ['framer-motion', 'clsx', 'tailwind-merge'];
    const devDependencies = ['tailwindcss', '@tailwindcss/vite'];

    await this.dependencyService.installDependencies(dependencies);
    await this.dependencyService.installDependencies(devDependencies);
  }

  private async setupTailwindInViteConfig(): Promise<void> {
    const root = process.cwd();
    const viteConfigPaths = [path.join(root, 'vite.config.ts'), path.join(root, 'vite.config.js')];

    for (const configPath of viteConfigPaths) {
      if (await fs.pathExists(configPath)) {
        let content = await fs.readFile(configPath, 'utf-8');

        // Ensure import exists
        if (!content.includes('@tailwindcss/vite')) {
          content = `import tailwindcss from '@tailwindcss/vite';\n` + content;
        }

        // Ensure plugin is added
        if (!content.includes('tailwindcss()')) {
          content = content.replace(
            /plugins\s*:\s*\[([\s\S]*?)\]/,
            (match, inner) => `plugins: [${inner.trim()}${inner.trim() ? ', ' : ''}tailwindcss()]`
          );
        }

        await fs.writeFile(configPath, content, 'utf-8');
        this.logger.success('✅ TailwindCSS Vite plugin added to vite.config');
        return;
      }
    }

    this.logger.error(
      '⚠️ No vite.config.js or vite.config.ts found. Please add `@tailwindcss/vite` manually.'
    );
  }

  private async addTailwindImportToIndexCSS(): Promise<void> {
    const root = process.cwd();
    const cssPaths = [
      path.join(root, 'src', 'index.css'),
      path.join(root, 'src', 'main.css'),
      path.join(root, 'index.css'),
    ];

    for (const cssPath of cssPaths) {
      if (await fs.pathExists(cssPath)) {
        let content = await fs.readFile(cssPath, 'utf-8');

        // Check if Tailwind import is already there
        if (content.includes('@import "tailwindcss"')) {
          this.logger.info('Tailwind already imported in CSS.');
          return;
        }

        // Add import to the very top
        content = `@import "tailwindcss";\n\n` + content;
        await fs.writeFile(cssPath, content, 'utf-8');

        this.logger.success(`✅ Added @import "tailwindcss"; to ${path.basename(cssPath)}`);
        return;
      }
    }

    this.logger.error('⚠️ No index.css or main.css found to add @import "tailwindcss";');
  }
}
