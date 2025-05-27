/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import importMetaEnv from '@import-meta-env/unplugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    // Only apply importMetaEnv when not testing
    mode !== 'test' && importMetaEnv.vite({ example: '.env.example' })
  ].filter(Boolean),
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    setupFiles: ['./vitest-setup.js'],
    coverage: {
      include: ['src/**'],
      exclude: ['**/index.ts', 'src/*.tsx', 'src/providers/*.tsx', 'src/components/pages/*/*.tsx']
    }
  }
}))
