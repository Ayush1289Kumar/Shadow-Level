import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    // tsconfig paths resolved via Vite's native resolve.tsconfigPaths option
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
