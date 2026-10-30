import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/NovaTv/', // GitHub Pages এর জন্য জরুরি
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'NovaTV — Live Streaming',
        short_name: 'NovaTV',
        description: 'Premium live TV streaming',
        theme_color: '#09090b',
        background_color: '#09090b',
        display: 'standalone',
        orientation: 'any',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'channel-logos',
              expiration: { maxEntries: 300, maxAgeSeconds: 604800 },
            },
          },
        ],
      },
    }),
  ],
});
