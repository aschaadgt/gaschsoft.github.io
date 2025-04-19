import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Esto es CLAVE si usas dominio personalizado tipo gaschsoft.com
  plugins: [react()],
})
