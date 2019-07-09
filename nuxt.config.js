module.exports = {
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-62429600-2'
      }
    ],
    [
      '@nuxtjs/router',
      {
        keepDefaultRouter: true,
      }
    ],
    [
      'nuxt-env',
      {
        keys: [
          {
            key: 'DIMER_BASE_URL',
            default: 'http://192.168.1.7:5000'
          },
          {
            key: 'NODE_ENV',
            default: 'development'
          }
        ]
      }
    ]
  ],
  loading: {
    color: '#078161'
  },
  plugins: ['~plugins/dimer.js', '~js/prism.js'],
  css: ['~css/main.css', '~css/prism.css', '~css/dimer-sans/style.css'],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'png' },
      { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ]
  }
}
