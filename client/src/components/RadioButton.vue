<template>
  <label :for="value">
    <input
        type="radio"
        name="radio-input"
        :value="value"
        :id="value"
        v-model="model"
        @change="handleChange"
    />
    {{ label }}
  </label>
</template>

<script>
import Emitter from '../mixins/emitter'

export default {
  name: 'BaseRadioButton',

  mixins: [Emitter],

  props: {
    value: [String, Number],

    label: [String, Number],
  },

  data() {
    return {
      radioGroup: null,
      isGroup: false
    }
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model);
        this.isGroup && this.dispatch('BaseRadioButtonGroup', 'handleChange', this.model);
      });
    }
  },

  mounted() {
    const parent = this.$parent
    if (parent.$options.name === 'BaseRadioButtonGroup') {
      this.isGroup = true
      this.radioGroup = parent
    }
  },

  computed: {
    model: {
      get() {
        return this.isGroup ? this.radioGroup.value : this.value;
      },

      set(val) {
        if (this.isGroup) {
          this.dispatch('BaseRadioButtonGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    },
  },
}
</script>
