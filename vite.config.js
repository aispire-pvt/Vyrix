import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/upes': {
        target: 'https://vyrix-five.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upes/, '')
      }
    }
  }
})
