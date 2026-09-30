import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset, music, and resume paths working on any host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.vs/**'],
    },
  },
})
