import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 3003,
    open: false,
    cors: true,
    host: '0.0.0.0'
  },
  preview: {
    port: 3003,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})