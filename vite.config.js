import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/', // 👈 rutas relativas
  plugins: [vue()],
})