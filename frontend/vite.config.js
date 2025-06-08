import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: "/", 
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://fullstack-project-4qj2.onrender.com", 
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
