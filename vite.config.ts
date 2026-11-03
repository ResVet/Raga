import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /Raga/. Override with BASE=/ for other hosts.
export default defineConfig({
  base: process.env.BASE ?? '/Raga/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three', 'three-mesh-bvh'] },
      },
    },
  },
});
