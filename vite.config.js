import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // proxy: {
      // '/': {
        // target: 'http://localhost:3000',
        // changeOrigin: true,
        // ws: false,
      // }
    // }
    hmr: {
      port: 5170
    }
  },
  optimizeDeps: {
      include:  [
        'vue',
        'vue-router',
        'axios',
        'identicon.js'
      ]
  }
})
