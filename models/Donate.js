const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donateSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },

})
module.exports = mongoose.model('donate', donateSchema)
