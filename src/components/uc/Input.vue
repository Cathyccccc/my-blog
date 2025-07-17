<template>
  <input class="w-full" :value="value" @input="$emit('update:value', $event.target.value)">
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  }
})
defineEmits(['update:value']);
</script>

<style scoped>
input {
  outline: none;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 14px;
  padding: 4px;
  line-height: 1.6;
  box-sizing: border-box;
}
</style>