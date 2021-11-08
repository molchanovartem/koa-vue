const bodyParser = require('./body-parser')
const errors = require('./errors')
const catchMongooseErrors = require('./catch-mongoose-errors')

module.exports = [
  bodyParser,
  errors,
  catchMongooseErrors,
]
