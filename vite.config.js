import inject from '@rollup/plugin-inject';
import { VitePWA } from 'vite-plugin-pwa'
const { createHash } = require('crypto');

const path = require('path')

export default {
  base: './',
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        about: path.resolve(__dirname, 'src/about.html'),
        routes: path.resolve(__dirname, 'src/routes.html'),
        terms: path.resolve(__dirname, 'src/terms.html'),
        privacy: path.resolve(__dirname, 'src/privacy_police.html')
      },
    },
  },
  publicDir: '../public',
  server: {
    port: 5501,
    hot: true
  },
  plugins: [
    // Add it first
    inject({
      $: 'jquery',
    }),
    //add the pwa and manifest
    VitePWA({
      filename: 'serviceWorker.js',
      scope: '/',
      injectRegister: 'script',
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true
      },
      //includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      includeAssets: [
        '/*.png'
      ],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "¿Dónde está Mi Bondi?",
        short_name: "MiBondi",
        start_url: "index.html",
        display: "standalone",
        background_color: "#0462DC",
        theme_color: "#0462DC",
        orientation: "portrait-primary",
        description: "MiBondi te permite ubicar en tiempo real ómnibus suburbanos del STM.",
        icons: [{
          src: "/logos/logo_512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any"
        },
        {
          src: "/logos/maskable_logo_x96.png",
          type: "image/png",
          sizes: "96x96",
          purpose: "maskable"
        },
        {
          src: "/logos/maskable_logo_x128.png",
          type: "image/png",
          sizes: "128x128",
          purpose: "maskable"
        },
        {
          src: "/logos/maskable_logo_x192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "maskable"
        },
        {
          src: "/logos/maskable_logo_x384.png",
          type: "image/png",
          sizes: "384x384",
          purpose: "maskable"
        },
        {
          src: "/logos/maskable_logo_x512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "maskable"
        }
        ],
        shortcuts: [
          {
            "name": "Ver recorrido",
            "url": "/routes.html",
            "description": "Ver recorridos por línea."
          },
          // {
          //   "name": "Ver bondis.",
          //   "url": "/index.html"
          // }
        ],
        screenshots : [
          {
            "src": "/screenshot/Captura_1.png",
            "sizes": "864x1640",
            "type": "image/png",
            "platform": "wide",
            "label": "Vista luego de buscar ómnibus por linea."
          },
          {
            "src": "/screenshot/Captura_2.png",
            "sizes": "864x1653",
            "type": "image/png",
            "platform": "wide",
            "label": "Vista luego de hacer zoom y pulsar en una parada."
          },
          {
            "src": "/screenshot/Captura_3.png",
            "sizes": "864x1646",
            "type": "image/png",
            "platform": "wide",
            "label": "Pantalla principal."
          },
          {
            "src": "/screenshot/Captura_4.png",
            "sizes": "864x1760",
            "type": "image/png",
            "platform": "wide",
            "label": "Vista de un recorrido."
          }
        ]

      }
    })
  ],
  // The rest of your configuration...
};