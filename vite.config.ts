import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    optimizeDeps: {
      entries: ['index.html', 'src/main.tsx'],
    },
    server: {
      // HMR is disabled in AI Studio so Vite never opens WS port 24678 or watches files.
      hmr: false,
      ws: false as const,
      watch: null,
      allowedHosts: true as const,
    },
  };
});
