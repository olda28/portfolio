import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import babel from "@rolldown/plugin-babel"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      plugins: ["babel-plugin-react-compiler"]
    }),
    tailwindcss(),
    svgr()
  ],
  resolve: {
    tsconfigPaths: true
  },
  server: {
    port: 3000
  }
})
