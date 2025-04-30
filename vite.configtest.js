import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  base: './', // Esto asegura que funcione igual en prod y en dev
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.html'], // ← Esto evita el error de importación HTML si algo lo toca
});
