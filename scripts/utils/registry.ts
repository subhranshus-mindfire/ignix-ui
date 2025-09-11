import fs from 'fs';

export function updateRegistry(registryFile: string, componentName: string): void {
  const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));

  registry.components[componentName.toLowerCase()] = {
    name: componentName,
    description: `Auto-generated ${componentName} component`,
    dependencies: [] as string[],
    files: {
      main: {
        path: `components/${componentName}/index.tsx`,
        type: 'component',
      },
    },
  };

  fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2), 'utf8');
}
