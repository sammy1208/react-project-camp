import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use default base, and override via CLI or env file
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/react-project-camp/' : '/',
    plugins: [react()],
  };
});