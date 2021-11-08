require('dotenv').config()

const app = require('./app')
const config = require('./lib/config')
const Currency = require('./models/Currency')

const currencies = [
  new Currency({name: "US Dollar", code: "USD", symbol: "$", rate: 1}),
  new Currency({name: "Euro", code: "EUR", symbol: "€", rate: 0.897597}),
  new Currency({name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755}),
  new Currency({name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}),
  new Currency({name: "666", code: "666", symbol: "666", rate: 666.461993}),
]
try {
  const newCurrencies = async () => {
     currencies.forEach(async currency => await currency.save())
  }
   newCurrencies()
}catch (e) {
  console.log('e', e)
}


app(() => console.log(`Server has been started ${config.port}`))
