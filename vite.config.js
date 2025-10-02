import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ⚠️ CRITICAL: Must match your repository name exactly
  base: '/Smart-Health-disease-prediction-system/', 
});
