import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom') || id.includes('react-is') || /node_modules[\\/]react[\\/]/.test(id)) return 'vendor-react'
          if (id.includes('node_modules/motion')) return 'vendor-motion'
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase'
          if (id.includes('node_modules/recharts')) return 'vendor-charts'
          if (id.includes('node_modules/qrcode.react')) return 'vendor-qr'

          return undefined
        },
      },
    },
  },
})
