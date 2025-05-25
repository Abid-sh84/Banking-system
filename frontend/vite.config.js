import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },  server: {
    proxy: {
      // Configure API proxy
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL with protocol
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const newPath = path;
          console.log('Rewriting path:', path, '->', newPath);
          return newPath; // Keep /api prefix as backend now supports it
        },
        // This allows us to see detailed proxy behavior
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
