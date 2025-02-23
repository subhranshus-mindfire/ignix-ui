import { execSync } from 'child_process';
import { getPackageManager } from '../utils/getPackageManager';

export class DependencyService {
  private static instance: DependencyService;

  static getInstance(): DependencyService {
    if (!DependencyService.instance) {
      DependencyService.instance = new DependencyService();
    }
    return DependencyService.instance;
  }

  async installDependencies(dependencies: string[]): Promise<void> {
    if (!dependencies.length) return;

    const pkgManager = await getPackageManager(process.cwd());
    const installCmd = this.getInstallCommand(pkgManager, dependencies);
    
    try {
      execSync(installCmd, { stdio: 'inherit' });
    } catch (error) {
      throw new Error(`Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getInstallCommand(pkgManager: string, dependencies: string[]): string {
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
} 