/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { execSync } from 'child_process';

interface DependencyOptions {
  dependencies?: string[];
  devDependencies?: string[];
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'bun';
}

export async function addDependencies(options: DependencyOptions) {
  const pkgManager = options.packageManager || 'npm';

  // Handle dependencies for npm, yarn, pnpm, and bun
  if (options.dependencies?.length) {
    if (pkgManager === 'bun') {
      execSync(`bun add ${options.dependencies.join(' ')}`, {
        stdio: 'inherit',
      });
    } else {
      execSync(`${pkgManager} add ${options.dependencies.join(' ')}`, {
        stdio: 'inherit',
      });
    }
  }

  // Handle devDependencies for npm, yarn, pnpm, and bun
  if (options.devDependencies?.length) {
    if (pkgManager === 'bun') {
      execSync(`bun add --dev ${options.devDependencies.join(' ')}`, {
        stdio: 'inherit',
      });
    } else {
      execSync(`${pkgManager} add -D ${options.devDependencies.join(' ')}`, {
        stdio: 'inherit',
      });
    }
  }
}
