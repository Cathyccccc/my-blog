<template>
  <div class="bg-[--theme-color] px-4 py-3 rounded-xl">
    <slot name="header"></slot>
    <ul>
      <li v-for="(item, index) in data" :key="index">{{ item }}</li>
    </ul>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped></style>
