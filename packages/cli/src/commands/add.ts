import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { getAvailableComponents } from '../utils/components';
import { addDependencies } from '../utils/dependencies';

export async function add(componentName?: string) {
  try {
    const components = await getAvailableComponents();

    if (!componentName) {
      // Show list of available components
      const response = await prompts({
        type: 'select',
        name: 'component',
        message: 'Select a component to add',
        choices: components.map(c => ({ title: c.name, value: c.name }))
      });
      componentName = response.component;
    }

    if (!componentName) {
      console.log(chalk.red('\nNo component selected'));
      process.exit(1);
    }

    const component = components.find(c => c.name === componentName);
    if (!component) {
      console.log(chalk.red(`\nComponent "${componentName}" not found`));
      console.log('Available components:', components.map(c => c.name).join(', '));
      process.exit(1);
    }

    const spinner = ora(`Adding ${component.name} component...`).start();

    // Create component file
    const componentDir = path.resolve('src/components/ui');
    await fs.ensureDir(componentDir);
    await fs.writeFile(
      path.join(componentDir, `${component.name}.tsx`),
      component.content
    );

    // Install dependencies if needed
    if (component.dependencies?.length) {
      await addDependencies({
        dependencies: component.dependencies
      });
    }

    spinner.succeed(chalk.green(`Added ${component.name} component`));
    
    console.log('\nYou can now import the component from:');
    console.log(chalk.cyan(`import { ${component.name} } from "@/components/ui/${component.name}"`));

  } catch (error) {
    console.error(chalk.red('Failed to add component:'), error);
    process.exit(1);
  }
}
