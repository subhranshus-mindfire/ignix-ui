import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import { ComponentService } from '../services/ComponentService';
import { DependencyService } from '../services/DependencyService';
import { Logger } from '../utils/logger';

export class AddCommand {
  private componentService = ComponentService.getInstance();
  private dependencyService = DependencyService.getInstance();
  private logger = new Logger();

  async execute(componentName?: string): Promise<void> {
    const spinner = ora();

    try {
      // Get component name if not provided
      componentName = await this.getComponentName(componentName);
      
      spinner.start(`Fetching ${componentName} component...`);
      const component = await this.componentService.getComponent(componentName);

      // Install dependencies
      if (component.dependencies?.length) {
        spinner.text = `Installing dependencies...`;
        await this.dependencyService.installDependencies(component.dependencies);
      }

      // Install component
      spinner.text = `Installing component files...`;
      await this.componentService.installComponent(component);

      spinner.succeed(chalk.green(`Successfully added ${component.name}`));
      
      this.logger.printUsageInstructions(component);

    } catch (error) {
      spinner.fail();
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      process.exit(1);
    }
  }

  private async getComponentName(name?: string): Promise<string> {
    if (name) return name.toLowerCase();

    const components = await this.componentService.getAvailableComponents();
    
    const response = await prompts({
      type: 'select',
      name: 'component',
      message: 'Select a component to add',
      choices: components.map(c => ({
        title: c.name,
        value: c.name.toLowerCase(),
        description: c.description
      }))
    });

    if (!response.component) {
      throw new Error('No component selected');
    }

    return response.component;
  }
}