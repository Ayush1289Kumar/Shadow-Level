import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Shadow-Level/',
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
})