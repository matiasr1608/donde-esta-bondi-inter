import inject from '@rollup/plugin-inject';
import { VitePWA } from 'vite-plugin-pwa'


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
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        about: path.resolve(__dirname, 'src/about.html'),
        routes: path.resolve(__dirname, 'src/routes.html')
      }
    },
  },
  publicDir: '../public',
  server: {
    port: 80,
    hot: true
  },
  plugins: [
    // Add it first
    inject({
      $: 'jquery',
    }),
    //add the pwa and manifest
    VitePWA({
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      //includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      includeAssets: [
        '/*.png'
      ],
      devOptions: {
        enabled: true
        /* other options */
      },
      manifest: {
        name: "¿Dónde está Mi Bondi?",
        short_name: "MiBondi",
        start_url: "index.html",
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#0462DC",
        orientation: "portrait-primary",
        icons: [ {
          src: "logo_512.png",
          type: "image/png", 
          sizes: "512x512", 
          purpose: "any maskable"
        },
        {
          src: "logo_225_blue.png",
          type: "image/png", 
          sizes: "225x225"
        }
        ]

      }
    })
  ],
  // The rest of your configuration...
};