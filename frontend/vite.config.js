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
  },
  server: {
    proxy: {
      // Configure API proxy - prefix with /api 
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL with protocol
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // Remove duplicate /api prefix if present
          const newPath = path.replace(/^\/api\/api\//, '/api/');
          console.log('Rewriting path:', path, '->', newPath);
          return newPath;
        },
        // This allows us to see detailed proxy behavior
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            console.log('Request headers:', req.headers);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            if (proxyRes.statusCode >= 400) {
              console.log('Error response headers:', proxyRes.headers);
            }          });
        },
      },
    },
  },
});
