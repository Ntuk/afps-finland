
module.exports = {
  telemetry: false,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'AFPS Finland',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: 'AFPS Finland' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_EU' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'http://localhost:3000' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://nicotukiainen.com/legacy/images/afps-first.jpg' },
      { hid: 'og:description', name: 'og:description', content: 'Kohtauspaikka suomalaisille AFPS-pelaajille.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/d33a83f69c.js' },
      { src: 'https://widget.cloudinary.com/v2.0/global/all.js' },
      { src: 'https://unpkg.com/axios/dist/axios.min.js' },
    ]
  },
  buildModules: [
    [
      '@nuxtjs/google-analytics', {
        id: 'UA-155293168-1'
      },
      '@nuxtjs/vuetify',
  ]
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e67e22' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/variables.scss'
    ]
   },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/filters'},
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/integrations'},
    {src: '~/plugins/components'},
    {src: '~/plugins/tooltip'},
    {src: '~/plugins/toasted', ssr: false},
    {src: '~/plugins/paginate', ssr: false},
    {src: '~/plugins/vue-video-background', ssr: false}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-155293168-1' || ''
    }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'portal-vue/nuxt',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    proxy: true
  },
  proxy: {
    '/products/': {
      target: 'https://afps.fi/api/v1/',
      changeOrigin: true
    }
  },
  serverMiddleware: [
    '~/server/routes/index'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
