import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import { getComponent, getAvailableComponents, installComponent } from '../utils/components';
import { addDependencies } from '../utils/dependencies';
import path from 'path';
import fs from 'fs-extra';

export async function add(componentName?: string) {
  let spinner;
  try {
    // If no component name provided, show selection prompt
    if (!componentName) {
      const components = await getAvailableComponents();
      if (!components.length) {
        console.log(chalk.red('\nNo components found in registry'));
        process.exit(1);
      }

      const response = await prompts({
        type: 'select',
        name: 'component',
        message: 'Select a component to add',
        choices: components.map((c) => ({
          title: c.name,
          value: c.name.toLowerCase(), // Ensure lowercase for consistency
          description: c.description,
        })),
      });
      componentName = response.component;
    }

    if (!componentName) {
      console.log(chalk.red('\nNo component selected'));
      process.exit(1);
    }

    // Convert component name to lowercase for consistency
    componentName = componentName.toLowerCase();

    // Start spinner
    spinner = ora(`Fetching ${componentName} component...`).start();
    
    // Get component details
    const component = await getComponent(componentName);
    
    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`));
      const components = await getAvailableComponents();
      if (components.length > 0) {
        console.log('\nAvailable components:');
        components.forEach(c => {
          console.log(chalk.cyan(`- ${c.name}: ${c.description}`));
        });
      }
      process.exit(1);
    }

    // Update spinner text
    spinner.text = `Installing ${component.name} component...`;

    // Verify project structure
    const projectRoot = process.cwd();
    const srcDir = path.join(projectRoot, 'src');
    if (!await fs.pathExists(srcDir)) {
      spinner.fail(chalk.red('Project structure not found. Make sure you\'re in the correct directory.'));
      process.exit(1);
    }

    // Install dependencies first
    if (component.dependencies?.length) {
      spinner.text = `Installing dependencies for ${component.name}...`;
      try {
        await addDependencies({
          dependencies: component.dependencies,
        });
      } catch (error) {
        spinner.fail(chalk.red('Failed to install dependencies'));
        console.error(error);
        process.exit(1);
      }
    }

    // Install the component
    spinner.text = `Installing ${component.name} component files...`;
    try {
      await installComponent(component);
    } catch (error) {
      spinner.fail(chalk.red(`Failed to install ${component.name} component files`));
      console.error(error);
      process.exit(1);
    }

    // Success message
    spinner.succeed(chalk.green(`Successfully added ${component.name} component`));

    // Usage instructions
    console.log('\nYou can now import the component from:');
    console.log(
      chalk.cyan(
        `import { ${component.name} } from "@/components/ui/${component.name.toLowerCase()}"`
      )
    );

    // Additional instructions if there are multiple files
    if (Object.keys(component.files).length > 1) {
      console.log('\nThis component includes multiple files:');
      Object.entries(component.files).forEach(([key, file]) => {
        console.log(chalk.cyan(`- ${file.path}`));
      });
    }

  } catch (error) {
    if (spinner) {
      spinner.fail(chalk.red('Failed to add component'));
    }
    console.error('\nError details:', error);
    process.exit(1);
  }
}