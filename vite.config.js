import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the build work at https://<user>.github.io/ and at
// https://<user>.github.io/<repo>/ without any changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
