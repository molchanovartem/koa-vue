const Router = require('koa-router')

const currencies = require('./currencies')
const donate = require('./donate')

const router = new Router().prefix('/api')

router.use(currencies, donate)

module.exports = router
