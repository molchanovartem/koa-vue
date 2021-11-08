<template>
  <div class="radio-button-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../mixins/emitter'

export default {
  name: 'BaseRadioButtonGroup',

  mixins: [Emitter],

  props: {
    value: {
      type: [String, Number]
    }
  },

  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value);
    });
  },
}
</script>

<style>
.radio-button-group {
  margin: 20px auto;
  padding: 15px 20px;
  border: 2px solid #27283a;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
}
</style>
