

const env = require('./env')
export default {
  mode: 'universal',

  env: {
    baseUrl: env[process.env.MODE].ENV_API
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script:[
      {src:'/js/flexible.js',type:'text/javascript',charset:'utf-8'},
      {src:'http://api.trinitygz.com/public/js/rewrite.js',type:'text/javascript',charset:'utf-8'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'swiper/css/swiper.css',
    '~assets/css/normalize.css',
    '~assets/css/font.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/swiper.js", ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  // 设置代理
  // proxy: {
  //   '/web': {
  //     target: 'http://www.boatng.cn:7002/',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '/'
  //     }
  //   }
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    postcss:[
      require('postcss-px2rem')({
        remUnit:128
      })
    ]
  }
}
