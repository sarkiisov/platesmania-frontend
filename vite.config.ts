/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import importMetaEnv from '@import-meta-env/unplugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    importMetaEnv.vite({ example: '.env.example' })
  ],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    setupFiles: ['./vitest-setup.js'],
    coverage: {
      include: ['src/**'],
      exclude: ['**/index.ts']
    }
  }
})
