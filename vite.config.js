import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'sci-utils',
      fileName: 'sci-utils',
    },
    manifest: false,
    rollupOptions: {
      external: [
      ],
    },
  },
})