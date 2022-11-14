import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue2';

export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname
    }
  },
  plugins: [Vue()]
});
