#!/usr/bin/env node

import fs from 'fs';
import { getPaths } from './utils/path.js';
import { indexBoilerplate, demoBoilerplate, testBoilerplate } from './utils/boilerplates.js';
import { updateRegistry } from './utils/registry.js';

// CLI argument
const args = process.argv.slice(2);
const nameArg = args.find((arg) => arg.startsWith('--name='));
const componentName = nameArg?.split('=')[1];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Get all paths
const paths = getPaths(componentName);

// Ensure directories exist
[paths.uiDir, paths.registryComponent].forEach((dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Write files
fs.writeFileSync(paths.indexFile, indexBoilerplate(componentName), 'utf8');
fs.writeFileSync(paths.indexFileRegistry, indexBoilerplate(componentName), 'utf8');
fs.writeFileSync(paths.demoFile, demoBoilerplate(componentName), 'utf8');
fs.writeFileSync(paths.testFile, testBoilerplate(componentName), 'utf8');

// Update registry.json
updateRegistry(paths.registryFile, componentName);

console.log(`✅ Component ${componentName} created successfully!`);
