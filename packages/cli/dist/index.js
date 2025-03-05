#!/usr/bin/env node

// src/index.ts
import { Command } from 'commander';

// src/commands/add.ts
import prompts from 'prompts';
import ora from 'ora';
import chalk2 from 'chalk';

// src/services/ComponentService.ts
import axios from 'axios';
import path from 'path';
import fs from 'fs-extra';

// src/config/constants.ts
var REGISTRY_CONFIG = {
  /** Base URL for the component registry */
  BASE_URL:
    'https://raw.githubusercontent.com/lakinmindfire/animate-ui/feature/tailwind-merge-config/packages/registry',
  /** Registry path configuration */
  PATHS: {
    /** Path to registry index file */
    REGISTRY: '/registry.json',
    /** Base path for component files */
    COMPONENTS: '/components',
  },
};
var PROJECT_PATHS = {
  /** Directory for UI components */
  COMPONENTS_DIR: 'src/components/ui',
  /** Directory for utility functions */
  UTILS_DIR: 'src/utils',
  /** Configuration file paths */
  CONFIG_FILES: {
    /** Tailwind configuration file */
    TAILWIND: 'tailwind.config.js',
    /** Package configuration file */
    PACKAGE_JSON: 'package.json',
  },
};

// src/errors/CLIError.ts
var CLIError = class extends Error {
  constructor(message, code, suggestions) {
    super(message);
    this.code = code;
    this.suggestions = suggestions;
    this.name = 'CLIError';
  }
};
var ComponentNotFoundError = class extends CLIError {
  constructor(componentName) {
    super(`Component "${componentName}" not found in registry`, 'COMPONENT_NOT_FOUND', [
      'Check available components with: npx animation-ui list',
    ]);
  }
};
var RegistryError = class extends CLIError {
  constructor(message) {
    super(`Registry error: ${message}`, 'REGISTRY_ERROR', ['Try again later or report this issue']);
  }
};

// src/services/ComponentService.ts
var ComponentService = class _ComponentService {
  static instance;
  registry = null;
  /**
   * Returns singleton instance of ComponentService
   */
  static getInstance() {
    if (!_ComponentService.instance) {
      _ComponentService.instance = new _ComponentService();
    }
    return _ComponentService.instance;
  }
  /**
   * Loads and caches the component registry
   * Implements caching to prevent unnecessary network requests
   */
  async loadRegistry() {
    var _a;
    if (this.registry) return this.registry;
    try {
      const response = await axios.get(
        `${REGISTRY_CONFIG.BASE_URL}${REGISTRY_CONFIG.PATHS.REGISTRY}`
      );
      if (!((_a = response.data) == null ? void 0 : _a.components)) {
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
  async getComponent(name) {
    const registry = await this.loadRegistry();
    const componentName = name.toLowerCase();
    const component = registry.components[componentName];
    if (!component) {
      throw new ComponentNotFoundError(name);
    }
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
  async getAvailableComponents() {
    const registry = await this.loadRegistry();
    return Object.values(registry.components);
  }
  /**
   * Installs a component with rollback capability
   */
  async installComponent(component) {
    const installedFiles = [];
    const componentsDir = path.join(process.cwd(), PROJECT_PATHS.COMPONENTS_DIR);
    try {
      this.validateComponent(component);
      const componentDir = path.join(componentsDir, component.name.toLowerCase());
      await fs.ensureDir(componentDir);
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
      await this.rollbackInstallation(installedFiles);
      throw error;
    }
  }
  /**
   * Validates component structure before installation
   */
  validateComponent(component) {
    if (!component.name || !component.files) {
      throw new CLIError('Invalid component structure', 'INVALID_COMPONENT', [
        'Ensure you have the latest CLI version',
      ]);
    }
  }
  /**
   * Rolls back installation if something fails
   */
  async rollbackInstallation(files) {
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
  async mergeTailwindConfig(newConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const configPath = path.resolve(PROJECT_PATHS.CONFIG_FILES.TAILWIND);
    try {
      if (!(await fs.pathExists(configPath))) {
        throw new CLIError('Tailwind config file not found', 'CONFIG_NOT_FOUND', [
          'Run `animation-ui init` first to create the config file',
        ]);
      }
      const existingConfig = await fs.readFile(configPath, 'utf-8');
      if (!this.isValidTailwindConfig(existingConfig)) {
        throw new CLIError('Invalid tailwind config format', 'INVALID_CONFIG', [
          'Ensure your tailwind.config.js follows the correct format',
        ]);
      }
      const existingConfigObj = this.parseTailwindConfig(existingConfig);
      const newConfigObj = this.parseTailwindConfig(newConfig);
      const mergedConfig = {
        ...existingConfigObj,
        theme: {
          extend: {
            ...((_a = existingConfigObj.theme) == null ? void 0 : _a.extend),
            keyframes: {
              ...((_c = (_b = existingConfigObj.theme) == null ? void 0 : _b.extend) == null
                ? void 0
                : _c.keyframes),
              ...((_e = (_d = newConfigObj.theme) == null ? void 0 : _d.extend) == null
                ? void 0
                : _e.keyframes),
            },
            animation: {
              ...((_g = (_f = existingConfigObj.theme) == null ? void 0 : _f.extend) == null
                ? void 0
                : _g.animation),
              ...((_i = (_h = newConfigObj.theme) == null ? void 0 : _h.extend) == null
                ? void 0
                : _i.animation),
            },
          },
        },
      };
      const mergedConfigString = `module.exports = ${this.objectToString(mergedConfig)}`;
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
  isValidTailwindConfig(config) {
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
  objectToString(obj, indent = 2) {
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
      return `{
${' '.repeat(indent)}${entries}
${' '.repeat(Math.max(0, indent - 2))}}`;
    }
    return String(obj);
  }
  parseTailwindConfig(config) {
    try {
      const cleanConfig = config
        .replace(/module\.exports\s*=\s*/, '')
        .replace(/;$/, '')
        .trim();
      return Function(`return ${cleanConfig}`)();
    } catch (error) {
      throw new Error(
        `Invalid tailwind config format: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
  async updateIndexFile(componentsDir, componentName) {
    const indexPath = path.join(componentsDir, 'index.ts');
    const exportStatement = `export * from './${componentName.toLowerCase()}';
`;
    const indexContent = (await fs.pathExists(indexPath))
      ? await fs.readFile(indexPath, 'utf-8')
      : '';
    if (!indexContent.includes(exportStatement)) {
      await fs.appendFile(indexPath, exportStatement);
    }
  }
};

// src/services/DependencyService.ts
import { execSync } from 'child_process';

// src/utils/getPackageManager.ts
import { detect } from '@antfu/ni';
async function getPackageManager(targetDir) {
  const packageManager = await detect({ programmatic: true, cwd: targetDir });
  if (packageManager === 'yarn@berry') return 'yarn';
  if (packageManager === 'pnpm@6') return 'pnpm';
  if (packageManager === 'bun') return 'bun';
  return packageManager ?? 'npm';
}

// src/services/DependencyService.ts
var DependencyService = class _DependencyService {
  static instance;
  /**
   * Returns singleton instance of DependencyService
   */
  static getInstance() {
    if (!_DependencyService.instance) {
      _DependencyService.instance = new _DependencyService();
    }
    return _DependencyService.instance;
  }
  /**
   * Installs multiple dependencies using the project's package manager
   * @param dependencies - Array of package names to install
   * @throws Error if installation fails
   */
  async installDependencies(dependencies) {
    if (!dependencies.length) return;
    const maxRetries = 3;
    let lastError = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const pkgManager = await getPackageManager(process.cwd());
        const installCmd = this.getInstallCommand(pkgManager, dependencies);
        execSync(installCmd, { stdio: 'inherit' });
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        if (attempt === maxRetries) {
          throw new CLIError(
            `Failed to install dependencies: ${lastError.message}`,
            'INSTALL_FAILED',
            [
              'Check your internet connection',
              'Ensure you have write permissions',
              'Try installing manually with npm/yarn/pnpm',
            ]
          );
        }
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1e3));
      }
    }
  }
  /**
   * Generates the appropriate install command for the package manager
   * @param pkgManager - Package manager to use (npm, yarn, pnpm, bun)
   * @param dependencies - Array of packages to install
   */
  getInstallCommand(pkgManager, dependencies) {
    const deps = dependencies.join(' ');
    switch (pkgManager) {
      case 'yarn':
        return `yarn add ${deps}`;
      case 'pnpm':
        return `pnpm add ${deps}`;
      case 'bun':
        return `bun add ${deps}`;
      default:
        return `npm install ${deps}`;
    }
  }
};

// src/utils/logger.ts
import chalk from 'chalk';
var Logger = class {
  info(message) {
    console.log(chalk.blue(message));
  }
  success(message) {
    console.log(chalk.green(message));
  }
  error(message, suggestions) {
    console.error(chalk.red(`Error: ${message}`));
    if (suggestions == null ? void 0 : suggestions.length) {
      console.log('\nSuggestions:');
      suggestions.forEach((suggestion) => {
        console.log(chalk.cyan(`- ${suggestion}`));
      });
    }
  }
  printUsageInstructions(component) {
    console.log('\nYou can now import the component from:');
    console.log(
      chalk.cyan(
        `import { ${component.name} } from "@/components/ui/${component.name.toLowerCase()}"`
      )
    );
    if (Object.keys(component.files).length > 1) {
      console.log('\nThis component includes:');
      Object.entries(component.files).forEach(([_, file]) => {
        console.log(chalk.cyan(`- ${file.path}`));
      });
    }
  }
  printInitInstructions() {
    console.log('\nNext steps:');
    console.log('1. Add components using:', chalk.cyan('npx animation-ui add <component>'));
    console.log('2. Start using animations in your project!\n');
  }
};

// src/services/TelemetryService.ts
import os from 'os';
import path2 from 'path';
import fs2 from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
var TelemetryService = class _TelemetryService {
  static instance;
  enabled;
  userId;
  /**
   * Private constructor to enforce singleton pattern
   * Initializes telemetry settings and user identification
   */
  constructor() {
    this.enabled = process.env.DISABLE_TELEMETRY !== 'true';
    this.userId = this.getUserId();
  }
  /**
   * Returns singleton instance of TelemetryService
   */
  static getInstance() {
    if (!_TelemetryService.instance) {
      _TelemetryService.instance = new _TelemetryService();
    }
    return _TelemetryService.instance;
  }
  /**
   * Tracks a CLI event with retry logic and exponential backoff
   * @param name - Name of the event to track
   * @param properties - Additional properties to include with the event
   */
  async trackEvent(name, properties) {
    if (!this.enabled) return;
    const maxRetries = 3;
    let retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        const event = {
          name,
          properties: {
            ...properties,
            os: os.platform(),
            nodeVersion: process.version,
            timestamp: /* @__PURE__ */ new Date().toISOString(),
            userId: this.userId,
            retryCount,
          },
        };
        console.debug('Telemetry event:', event);
        break;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error('Failed to send telemetry after retries:', error);
        }
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, retryCount) * 100));
      }
    }
  }
  /**
   * Retrieves or generates a unique user ID for telemetry tracking
   * Stores ID in local config file for persistence
   */
  getUserId() {
    const configPath = path2.join(os.homedir(), '.animation-ui', 'config.json');
    try {
      const config = fs2.readJsonSync(configPath);
      return config.userId;
    } catch {
      const userId = uuidv4();
      fs2.outputJsonSync(configPath, { userId });
      return userId;
    }
  }
};

// src/commands/add.ts
var AddCommand = class {
  componentService = ComponentService.getInstance();
  dependencyService = DependencyService.getInstance();
  logger = new Logger();
  async execute(componentName) {
    var _a;
    const spinner = ora();
    const telemetry = TelemetryService.getInstance();
    try {
      await telemetry.trackEvent('add_command_start');
      spinner.start('Loading available components...');
      componentName = await this.getComponentName(componentName);
      spinner.succeed();
      spinner.start(`Fetching ${componentName} component...`);
      const component = await this.componentService.getComponent(componentName);
      spinner.succeed();
      if ((_a = component.dependencies) == null ? void 0 : _a.length) {
        spinner.start('Installing dependencies...');
        await this.dependencyService.installDependencies(component.dependencies);
        spinner.succeed();
      }
      spinner.start('Installing component files...');
      await this.componentService.installComponent(component);
      spinner.succeed(chalk2.green(`Successfully added ${component.name}`));
      await telemetry.trackEvent('add_command_success', {
        component: componentName,
      });
      this.logger.printUsageInstructions(component);
    } catch (error) {
      spinner.fail();
      await telemetry.trackEvent('add_command_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      if (error instanceof CLIError) {
        this.logger.error(error.message, error.suggestions);
      } else {
        this.logger.error(error instanceof Error ? error.message : 'Unknown error');
      }
      process.exit(1);
    }
  }
  async getComponentName(name) {
    if (name) return name.toLowerCase();
    const components = await this.componentService.getAvailableComponents();
    const response = await prompts({
      type: 'select',
      name: 'component',
      message: 'Select a component to add',
      choices: components.map((c) => ({
        title: c.name,
        value: c.name.toLowerCase(),
        description: c.description,
      })),
    });
    if (!response.component) {
      throw new Error('No component selected');
    }
    return response.component;
  }
};

// src/commands/init.ts
import ora2 from 'ora';
import fs3 from 'fs-extra';
import path3 from 'path';
var InitCommand = class {
  logger = new Logger();
  dependencyService = DependencyService.getInstance();
  async execute() {
    const spinner = ora2('Initializing animation-ui...').start();
    try {
      await this.validateEnvironment();
      await this.createProjectStructure();
      await this.createConfigFiles();
      await this.installDependencies();
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
  /**
   * Validates the project environment before initialization
   */
  async validateEnvironment() {
    const hasPackageJson = await fs3.pathExists(
      path3.resolve(PROJECT_PATHS.CONFIG_FILES.PACKAGE_JSON)
    );
    if (!hasPackageJson) {
      throw new CLIError('No package.json found', 'INVALID_ENV', [
        'Run `npm init` or `yarn init` first',
      ]);
    }
    const hasNodeModules = await fs3.pathExists('node_modules');
    if (!hasNodeModules) {
      throw new CLIError('node_modules not found', 'INVALID_ENV', [
        'Run `npm install` or `yarn install` first',
      ]);
    }
  }
  async createProjectStructure() {
    const uiDir = path3.resolve(PROJECT_PATHS.COMPONENTS_DIR);
    const utilsDir = path3.resolve(PROJECT_PATHS.UTILS_DIR);
    await fs3.ensureDir(uiDir);
    await fs3.ensureDir(utilsDir);
  }
  async createConfigFiles() {
    await this.createTailwindConfig();
    await this.createUtilsFile();
  }
  async createTailwindConfig() {
    const configPath = path3.resolve(PROJECT_PATHS.CONFIG_FILES.TAILWIND);
    if (await fs3.pathExists(configPath)) return;
    const config = `module.exports = {
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
}`;
    await fs3.writeFile(configPath, config);
  }
  async createUtilsFile() {
    const utilsPath = path3.resolve(PROJECT_PATHS.UTILS_DIR, 'cn.ts');
    if (await fs3.pathExists(utilsPath)) return;
    const content = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;
    await fs3.writeFile(utilsPath, content);
  }
  async installDependencies() {
    const dependencies = ['framer-motion', 'clsx', 'tailwind-merge'];
    const devDependencies = ['tailwindcss', 'autoprefixer', 'postcss'];
    await this.dependencyService.installDependencies(dependencies);
    await this.dependencyService.installDependencies(devDependencies);
  }
};

// src/index.ts
var program = new Command();
program.name('animation-ui').description('CLI for adding animation-ui components').version('0.1.0');
program
  .command('init')
  .description('Initialize animations in your project')
  .option('-y, --yes', 'Skip confirmation prompt')
  .action(async () => {
    const command = new InitCommand();
    await command.execute();
  });
program
  .command('add')
  .description('Add an animation component to your project')
  .argument('[component]', 'The component to add')
  .action(async (component) => {
    const command = new AddCommand();
    await command.execute(component);
  });
program.parse();
