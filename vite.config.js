import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest', // Esto es clave para usar tu propio SW
      srcDir: 'src',
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      manifest: {
        name: 'PokePWA',
        short_name: 'PokePWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Debes poner esta imagen en la carpeta public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})