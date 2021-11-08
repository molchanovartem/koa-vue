const Router = require('koa-router')

const Donate = require('../models/Donate')
const Currency = require('../models/Currency')

const router = new Router().prefix('/donate')

router.get('/', async (ctx) => {
  const { query } = ctx
  delete query.skip
  delete query.limit
  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query
  ctx.set('x-total-count', await Donate.countDocuments(q))
  ctx.body = await Donate.find(q)
})


router.post('/', async (ctx) => {
  const {amount, currency} = ctx.request.body
  const currencyModel = await Currency.findOne({code: currency})

  if (amount > 0 && currencyModel) {
    const donate = new Donate({amount, currency})
    await donate.save()

    ctx.body = {"ok": true}
    ctx.status = 201
    return
  }

  let errorMessage = ''
  if (amount <= 0) {
    errorMessage = 'Amount is less than or equal to 0'
  }

  if (!currencyModel ) {
    errorMessage = 'Currency has not been found'
  }

  ctx.body = {"ok": false, error: errorMessage}
  ctx.status = 500
})

module.exports = router.routes()
