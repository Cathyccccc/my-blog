<template>
  <input class="w-full h-10 dark:bg-inherit bg-white outline-none py-1 px-2 border-box rounded-md text-[--text-base-color] sm:shadow-sm" :value="value" @input="$emit('update:value', $event.target.value)">
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
/* input {
  outline: none;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 14px;
  padding: 4px;
  line-height: 1.6;
  box-sizing: border-box;
} */
</style>