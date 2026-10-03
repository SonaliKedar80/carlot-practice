import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Requests to /api are forwarded to the Node server
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
