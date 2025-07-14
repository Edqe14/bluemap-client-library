import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dtsPlugin from 'vite-plugin-dts';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    vue(),
    dtsPlugin({
      insertTypesEntry: true,
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    cssMinify: 'lightningcss',
    lib: {
      entry: fileURLToPath(new URL('./src/js/BlueMap.js', import.meta.url)),
      name: 'bluemap',
      formats: ['es', 'umd'],
    },
    terserOptions: {},
    sourcemap: true,
  },
  server: {
    proxy: {
      '/settings.json': {
        target: 'https://bluecolored.de/bluemap',
        changeOrigin: true,
      },
      '/maps': {
        target: 'https://bluecolored.de/bluemap',
        changeOrigin: true,
      },
    },
  },
});
