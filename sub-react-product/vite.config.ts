import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qiankun('sub-react-product', {
      useDevMode: true
    })
  ],
  server: {
    port: 3001,
    cors: true,
    origin: 'http://localhost:3001'
  }
})
