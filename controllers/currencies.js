const Router = require('koa-router')

const Currency = require('../models/Currency')

const router = new Router().prefix('/currencies')

router.get('/', async (ctx) => {
  const { query } = ctx
  delete query.skip
  delete query.limit
  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query
  ctx.set('x-total-count', await Currency.countDocuments(q))
  ctx.body = await Currency.find(q)
})

module.exports = router.routes()
