<template>
  <button
    class="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style scoped>
.button {
  width: 200px;
  height: 52px;
  padding: 12px;
  font-size: 14px;
  color: #fff;
  text-transform: capitalize;
  background-color: #27283a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
