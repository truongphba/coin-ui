const envParser = require('./src/config/envparser')

module.exports = function () {
  return {
    boot: [
      'axios'
    ],

    preFetch: false,

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'fontawesome-v5',
      'material-icons'
    ],

    framework: {
      iconSet: 'material-icons',
      lang: 'vi',
      all: 'auto',
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'Meta'
      ],
      config: {
        notify: {
          position: 'top-right',
          timeout: 3000,
          textColor: 'white'
        }
      }
    },

    supportIE: false,

    build: {
      vueRouterMode: 'history',
      env: envParser(),
      scopeHoisting: true,
      gzip: true,
      preloadChunks: true,
      extractCSS: true,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      port: 8080,
      open: false
    },

    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},
      manifest: {
        name: 'Go Sport CMS',
        short_name: 'Go Sport CMS',
        description: 'Go Sport CMS',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'images/logo-50-50.png',
            sizes: '128x128',
            type: 'images/png'
          },
          {
            src: 'images/logo-50-50.png',
            sizes: '192x192',
            type: 'images/png'
          },
          {
            src: 'images/logo-50-50.png',
            sizes: '256x256',
            type: 'images/png'
          },
          {
            src: 'images/logo-50-50.png',
            sizes: '384x384',
            type: 'images/png'
          },
          {
            src: 'images/logo-50-50.png',
            sizes: '512x512',
            type: 'images/png'
          }
        ]
      }
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      extendWebpack (cfg) {
      },

      packager: {},

      builder: {}
    }
  }
}
