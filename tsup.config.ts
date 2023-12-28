import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  sourcemap: true,
  tsconfig: resolve(__dirname, './tsconfig.json'),
  format: ['esm', 'cjs'],
  outDir: 'dist',
  minify: true,
  dts: true,
});
