import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8082", // バックエンドのURL
        changeOrigin: true,
        secure: false, // HTTPS でない場合は false
        rewrite: (path) => path.replace(/^\/api/, "/api"), // URL の書き換え
      },
    },
  },
})
