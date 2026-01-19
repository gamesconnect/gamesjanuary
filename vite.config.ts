import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy payment API requests to bypass CORS
      '/api/pay': {
        target: 'http://54.86.149.215',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pay/, '/pay'),
      },
    },
  },
})
