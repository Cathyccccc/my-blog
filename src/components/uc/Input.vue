<template>
  <input
    class="w-full h-8 text-base-color-switch dark:bg-inherit bg-[#ffffff] outline-none py-1 px-2 border-box border-1 border-[#eee] rounded-md text-c-default sm:text-[--text-base-color] hover:border-[#6366f1] transition"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});
defineEmits(["update:value"]);
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
