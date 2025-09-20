import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [   tailwindcss(),react()],
  server: {
    // This is the important part
    proxy: {
      // Any request starting with '/api' (e.g., /api/seller/login)
      // will be automatically redirected to your back-end at port 4000
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

