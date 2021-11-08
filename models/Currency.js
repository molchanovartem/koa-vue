const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
})
module.exports = mongoose.model('currencies', currencySchema)
