#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';

const program = new Command();

program
  .name('animation-ui')
  .description('CLI for adding animation-ui components')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize animations in your project')
  .option('-y, --yes', 'Skip confirmation prompt')
  .action(async (options) => {
    await init(options);
  });

program
  .command('add')
  .description('Add a animation component to your project')
  .argument('[component]', 'The component to add')
  .action(async (component) => {
    await add(component);
  });

program.parse();
