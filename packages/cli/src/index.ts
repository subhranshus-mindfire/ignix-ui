#!/usr/bin/env node
import { Command } from 'commander';
import { AddCommand } from './commands/add';
import { InitCommand } from './commands/init';

const program = new Command();

program
  .name('animation-ui')
  .description('CLI for adding animation-ui components')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize animations in your project')
  .option('-y, --yes', 'Skip confirmation prompt')
  .action(async () => {
    const command = new InitCommand();
    await command.execute();
  });

program
  .command('add')
  .description('Add an animation component to your project')
  .argument('[component]', 'The component to add')
  .action(async (component) => {
    const command = new AddCommand();
    await command.execute(component);
  });

program.parse();
