import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  server: {
    proxy: {
      '/api': {
          target: 'https://nxtwave-offline-drive-1.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})