<template>
  <label>
    {{label}}
    <input
        type="number"
        :name="name"
        :value="value"
        min="0"
        @input="onInput($event.target.value.replace(/[^\d]/g,''))"
     />
  </label>
</template>

<script>
export default {
  name: 'IntInput',

  props: {
    label: {
      type: String,
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },

  computed: {
    name() {
      return this.label ? this.label.toLowerCase() : 'name';
    },
  },

  watch: {
    value(newValue) {
      this.onInput(parseInt(newValue))
    }
  },

  methods: {
    onInput(value) {
      if (value.toString().match(/^\d+$/)) {
        this.$emit('input', value)
      }
    }
  },
}
</script>
<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    input {
      height: 52px;
      font-size: 25px;
      border: 2px solid #27283a;
      border-radius: 8px;
    }
</style>
