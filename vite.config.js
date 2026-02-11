import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/get-employees': {
        target: 'https://yc.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/add-violation': {
        target: 'https://yc.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/add-green-card': {
        target: 'https://yc.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/delete-violation': {
        target: 'https://yc.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/delete-green-card': {
        target: 'https://yc.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/attendance': {
        target: 'https://attendance.anyemp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          store: ['zustand'],
        },
      },
    },
  },
});
