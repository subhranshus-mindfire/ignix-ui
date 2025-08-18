import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  target: 'node14',
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: false,
  minify: true,
  treeshake: true,
  noExternal: ['commander', 'chalk', 'ora', '@antfu/ni', 'fs-extra', 'axios'],
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
    delete (options as any).incremental;
  },
});
