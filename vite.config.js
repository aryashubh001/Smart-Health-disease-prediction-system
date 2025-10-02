// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Set the base path to your repository name
  base: '/Smart-Health-disease-prediction-system/', 
});
