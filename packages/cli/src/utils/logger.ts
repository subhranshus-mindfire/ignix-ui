import chalk from 'chalk';
import type { ComponentConfig } from '../types';

export class Logger {
  info(message: string): void {
    console.log(chalk.blue(message));
  }

  success(message: string): void {
    console.log(chalk.green(message));
  }

  error(message: string, suggestions?: string[]): void {
    console.error(chalk.red(`Error: ${message}`));
    if (suggestions?.length) {
      console.log('\nSuggestions:');
      suggestions.forEach((suggestion) => {
        console.log(chalk.cyan(`- ${suggestion}`));
      });
    }
  }

  printUsageInstructions(component: ComponentConfig): void {
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

  printInitInstructions(): void {
    console.log('\nNext steps:');
    console.log('1. Add components using:', chalk.cyan('npx animation-ui add <component>'));
    console.log('2. Start using animations in your project!\n');
  }
}
