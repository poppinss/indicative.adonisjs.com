export default {
  modules: [
    '@nuxtjs/axios',
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
            default: 'http://10.181.5.152:5000'
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
  css: ['~css/main.css', '~css/prism.css', '~css/dimer-sans/style.css']
}
