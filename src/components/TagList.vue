<template>
  <div class="tag-list">
    <span class="tag-item" v-for="(t, index) in tagListData" :key="index" :style="{ backgroundColor: gradient[index] }">{{ t.tag_name }}</span>
  </div>
</template>

<script setup>
import { gradient } from '/public/js/constant';

const props = defineProps({
  tagListData: Array,
})
</script>

<style scoped>
.tag-list {
  overflow: hidden;
  display: inline-block;
}
.tag-item {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-right: 6px;
  padding: 0 5px;
  border-radius: 3px;
  color: #000;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>