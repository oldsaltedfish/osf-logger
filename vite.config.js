import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/logger.js',
      name: 'Logger',
      fileName: 'logger'
    }
  }
})
