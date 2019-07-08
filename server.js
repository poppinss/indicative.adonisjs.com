const { join } = require('path')
const { Nuxt } = require('nuxt')
const httpServer = require('@dimerapp/http-server')

const config = require('./nuxt.config.js')
config.dev = false
const nuxt = new Nuxt(config)

const { router, createServer } = httpServer({
  cors: {},
  NODE_ENV: 'production'
})

router.use((req, res, next) => {
  req.basePath = join(__dirname)
  req.distPath = 'dist'

  if (req.url.endsWith('.json')) {
    next()
    return
  }

  nuxt.render(req, res)
})

createServer().listen(3000)
