<template>
  <div id="app">
    <div class="app-wrapper">
      <div v-if="message">{{ message }}</div>

      <RadioButtonGroup v-model="decision">
        <RadioButton
            v-for="option in presets"
            :value="option | convertingCurrencyFilter(currentCurrency)"
            :label="option | convertingCurrencyFilter(currentCurrency) | currency(currentCurrency)"
            :key="option"
        />
      </RadioButtonGroup>

      <div class="form-wrapper">
        <div>
          <IntInput v-model="decision" type="number"/>
        </div>

        <div class="select-wrapper">
          <Select
              v-model="currencyCode"
              item-text="name"
              item-value="code"
              :items="currencies"
          />
        </div>
      </div>

      <div class="button-wrapper">
        <Button @click="onClick">DONATE</Button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButtonGroup from './components/RadioButtonGroup.vue';
import RadioButton from './components/RadioButton.vue';
import Button from './components/Button';
import IntInput from './components/IntInput';
import Select from './components/Select';

export default {
  name: 'App',

  components: {
    Select,
    Button,
    IntInput,
    RadioButtonGroup,
    RadioButton,
  },

  data() {
    return {
      currencyCode: 'USD',
      suggestion: 40,
      decision: 40,
      currencies: [],
      presets: [40, 100, 200, 1000, 2500, 5000],
      requestStatus: false,
      message: null
    }
  },

  methods: {
    async onClick() {
      this.message = null
      let response = await fetch(`${process.env.VUE_APP_BACK_URL}/api/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          amount: this.decision,
          currency: this.currencyCode
        })
      });

      let result = await response.json();
      console.log('result', result)

      if (result.ok) {
        this.message = 'Thank you for your donation!'
      } else {
        this.message = result.error
      }
    }
  },

  computed: {
    currentCurrency() {
      return this.currencies.find(currency => currency.code === this.currencyCode)
    }
  },

  async mounted() {
    let response = await fetch(`${process.env.VUE_APP_BACK_URL}/api/currencies`);

    if (response.ok) {
      this.currencies = await response.json();
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
  },

  watch: {
    currencyCode() {
      this.decision = this.decision * this.currentCurrency.rate
    }
  },

  filters: {
    currency: function (value, currentCurrency) {
      if (!value || !currentCurrency) return ''

      return `${currentCurrency.symbol} ${value.toLocaleString('en-IN')}`
    },

    convertingCurrencyFilter: function (value, currentCurrency) {
      if (!value || !currentCurrency) return ''

      let multiplicity = 10
      const length = (value).toString().length
      if (length > 3) {
        multiplicity = 100
      }

      return Math.round(value * currentCurrency.rate / multiplicity) * multiplicity;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-wrapper {
  width: 700px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.select-wrapper {
  margin-left: 10px;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
