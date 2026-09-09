import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/PORTFOLIO/', // 👈 यह लाइन यहाँ होना सबसे ज़रूरी है ताकि गिटहब पाथ समझ सके
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR ? false : true,
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
