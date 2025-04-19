import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/landing-gaschsoft/', // 👈 MUY IMPORTANTE colocar el nombre del repositorio aquí
})
