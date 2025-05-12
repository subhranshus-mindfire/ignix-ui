/**
 * Service responsible for managing package dependencies
 * Handles installation across multiple package managers (npm, yarn, pnpm, bun)
 */
import { execSync } from 'child_process';
import { getPackageManager } from '../utils/getPackageManager';
import { CLIError } from '../errors/CLIError';

export class DependencyService {
  private static instance: DependencyService;

  /**
   * Returns singleton instance of DependencyService
   */
  static getInstance(): DependencyService {
    if (!DependencyService.instance) {
      DependencyService.instance = new DependencyService();
    }
    return DependencyService.instance;
  }

  /**
   * Installs multiple dependencies using the project's package manager
   * @param dependencies - Array of package names to install
   * @throws Error if installation fails
   */
  async installDependencies(dependencies: string[]): Promise<void> {
    if (!dependencies.length) return;

    const maxRetries = 3;
    let lastError: Error | null = null;

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

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  /**
   * Generates the appropriate install command for the package manager
   * @param pkgManager - Package manager to use (npm, yarn, pnpm, bun)
   * @param dependencies - Array of packages to install
   */
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
