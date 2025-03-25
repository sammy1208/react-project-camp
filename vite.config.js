import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: import.meta.env.MODE === 'production' ? '/react-project-camp/' : '/',
  plugins: [react()],
})
