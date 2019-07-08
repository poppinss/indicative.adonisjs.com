const { join } = require('path')
const BASE_URL = 'https://github.com/poppinss/indicative.adonisjs.com/blob/develop'

module.exports = function (hooks) {
  hooks.before('doc', function (doc) {
    doc.doc.gh_link = doc.doc.gh_link || doc.path.replace(join(__dirname, '..'), BASE_URL)
  })
}
