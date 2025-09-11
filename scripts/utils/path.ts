import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ComponentPaths {
  uiDir: string;
  registryComponent: string;
  demoFile: string;
  indexFile: string;
  indexFileRegistry: string;
  testFile: string;
  registryFile: string;
}

/**
 * Returns all important paths for a component
 */
export function getPaths(componentName: string): ComponentPaths {
  return {
    uiDir: path.join(__dirname, '../../apps/docs/src/components/ui', componentName),
    registryComponent: path.join(__dirname, '../../packages/registry/components/', componentName),
    demoFile: path.join(__dirname, '../../apps/docs/src/components/Demo', `${componentName}.tsx`),
    indexFile: path.join(
      __dirname,
      '../../apps/docs/src/components/ui',
      componentName,
      'index.tsx'
    ),
    indexFileRegistry: path.join(
      __dirname,
      '../../packages/registry/components',
      componentName,
      'index.tsx'
    ),
    testFile: path.join(
      __dirname,
      '../../apps/docs/src/components/ui',
      componentName,
      `${componentName}.test.tsx`
    ),
    registryFile: path.join(__dirname, '../../packages/registry/registry.json'),
  };
}
