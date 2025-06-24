import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'], // Only use CommonJS format for now
  dts: true,
  clean: true,
  target: 'node14',
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: false,
  minify: true,
  treeshake: true,
  noExternal: ['commander', 'inquirer', 'chalk', 'ora', '@antfu/ni', 'fs-extra', 'axios'],
  banner: {
    js: '#!/usr/bin/env node',
  },
  outDir: 'dist',
  esbuildOptions(options) {
    options.platform = 'node';
    options.mainFields = ['module', 'main'];
    options.conditions = ['import', 'require'];
    options.bundle = true;
    options.outdir = 'dist';
    // Remove TypeScript-specific options that esbuild doesn't support
    delete (options as any).incremental;
  },
});
