const mongoose = require('mongoose')

const config = require('./config')

module.exports = async () => {
  mongoose
    .connect(config.mongoUri, { useNewUrlParser: true })
    .then((() => console.log('MongoDB has been connected')))
    .catch((e) => console.log(e))
}
