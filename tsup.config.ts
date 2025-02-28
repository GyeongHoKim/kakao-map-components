import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'browser',
  outDir: 'dist',
  format: ['iife', 'esm'],
  globalName: 'KakaoMapComponents',
  clean: true,
  splitting: false,
  dts: true,
  sourcemap: false,
  minify: false,
  target: 'es2020',
});