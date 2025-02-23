import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { DependencyService } from '../services/DependencyService';
import { PROJECT_PATHS } from '../config/constants';
import { Logger } from '../utils/logger';

export class InitCommand {
  private logger = new Logger();
  private dependencyService = DependencyService.getInstance();

  async execute(): Promise<void> {
    const spinner = ora('Initializing animation-ui...').start();

    try {
      await this.createProjectStructure();
      await this.createConfigFiles();
      await this.installDependencies();

      spinner.succeed('Successfully initialized animation-ui');
      this.logger.printInitInstructions();
    } catch (error) {
      spinner.fail();
      this.logger.error(error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  }

  private async createProjectStructure(): Promise<void> {
    const uiDir = path.resolve(PROJECT_PATHS.COMPONENTS_DIR);
    const utilsDir = path.resolve(PROJECT_PATHS.UTILS_DIR);
    
    await fs.ensureDir(uiDir);
    await fs.ensureDir(utilsDir);
  }

  private async createConfigFiles(): Promise<void> {
    await this.createTailwindConfig();
    await this.createUtilsFile();
  }

  private async createTailwindConfig(): Promise<void> {
    const configPath = path.resolve(PROJECT_PATHS.CONFIG_FILES.TAILWIND);
    if (await fs.pathExists(configPath)) return;

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

    await fs.writeFile(configPath, config);
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

  private async installDependencies(): Promise<void> {
    const dependencies = ['framer-motion', 'clsx', 'tailwind-merge'];
    const devDependencies = ['tailwindcss', 'autoprefixer', 'postcss'];
    
    await this.dependencyService.installDependencies(dependencies);
    await this.dependencyService.installDependencies(devDependencies);
  }
}
