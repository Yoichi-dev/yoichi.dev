import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - ' + process.env.BASE_TITLE,
    title: process.env.BASE_TITLE,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.DESCRIPTION },
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.BASE_TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:title', property: 'og:title', content: process.env.BASE_TITLE },
      { hid: 'og:description', property: 'og:description', content: process.env.DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: process.env.BASE_IMG },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '~assets/css/styles.scss' }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    'plugins/contentful',
    'plugins/prism',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['@nuxtjs/moment', ['ja']],
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // MarkdownIt
  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    xhtmlOut: true,
    use: [
      ['markdown-it-table-of-contents', {
        includeLevel: [2, 3],
      }],
      'markdown-it-anchor',
      ['markdown-it-link-attributes', {
        attrs: {
          target: '_blank',
          rel: 'noopener'
        }
      }],
    ]
  },

  // 環境設定
  env: {
    npm_package_name: process.env.npm_package_name,
    npm_package_description: process.env.npm_package_description,
    SPACE_ID: process.env.SPACE_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_DIARY_TYPE_ID: process.env.CTF_DIARY_TYPE_ID,
    CTF_CREATE_POST_TYPE_ID: process.env.CTF_CREATE_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PREVIEW_ACCESS_TOKEN: process.env.CTF_PREVIEW_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL,
    BASE_TITLE: process.env.BASE_TITLE,
    BASE_IMG: process.env.BASE_IMG,
    DESCRIPTION: process.env.DESCRIPTION,
    MINECRAFT_SERVER: process.env.MINECRAFT_SERVER,
    MINECRAFT_PING: process.env.MINECRAFT_PING,
  },

  // 動的ルーティングを行う
  generate: {
    fallback: true
  },

  server: {
    host: '0.0.0.0'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
