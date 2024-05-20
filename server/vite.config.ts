import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    manifest: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, './src/server.ts'),
      formats: ['cjs'],
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, '../core/src'),
    },
  },
})
