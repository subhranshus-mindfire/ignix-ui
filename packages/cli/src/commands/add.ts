// commands/add.ts
import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import { getComponent, getAvailableComponents, installComponent } from '../utils/components';
import { addDependencies } from '../utils/dependencies';

export async function add(componentName?: string) {
  try {
    if (!componentName) {
      const components = await getAvailableComponents();
      const response = await prompts({
        type: 'select',
        name: 'component',
        message: 'Select a component to add',
        choices: components.map((c) => ({
          title: c.name,
          value: c.name,
          description: c.description,
        })),
      });
      componentName = response.component;
    }

    if (!componentName) {
      console.log(chalk.red('\nNo component selected'));
      process.exit(1);
    }

    const spinner = ora(`Fetching ${componentName} component...`).start();
    
    const component = await getComponent(componentName);
    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`));
      const components = await getAvailableComponents();
      console.log(
        'Available components:',
        components.map((c) => c.name).join(', ')
      );
      process.exit(1);
    }

    spinner.text = `Installing ${component.name} component...`;

    // Install dependencies first
    if (component.dependencies?.length) {
      await addDependencies({
        dependencies: component.dependencies,
      });
    }

    // Install the component
    await installComponent(component);

    spinner.succeed(chalk.green(`Added ${component.name} component`));

    console.log('\nYou can now import the component from:');
    console.log(
      chalk.cyan(
        `import { ${component.name} } from "@/components/ui/${component.name.toLowerCase()}"`
      )
    );
  } catch (error) {
    console.error(chalk.red('Failed to add component:'), error);
    process.exit(1);
  }
}