<template>
  <select :value="value" @change="onChange($event.target.value)">
    <option
        v-for="(item, index) in items"
        :value="item | valueFilter(itemValue)"
        :key="index"
    >
      {{ item | textFilter(itemText) }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['value', 'items', 'item-text', 'item-value'],

  methods: {
    onChange(value) {
      if (value === '') {
        value = null;
      }

      this.$emit('input', value);
    }
  },

  filters: {
    textFilter: function (value, itemText) {
      if (itemText) {
        return value[itemText]
      }
      return value;
    },

    valueFilter: function (value, itemValue) {
      if (itemValue) {
        return value[itemValue]
      }
      return value;
    },
  }
}
</script>

<style scoped>
select {
  height: 58px;
  border: 2px solid #27283a;
  border-radius: 8px;
}
</style>
