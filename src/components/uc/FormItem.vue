<template>
  <div :class="formItemClass">
    <label
      :for="$attrs.name"
      :class="['shrink-0 mr-4', labelAlign === 'right' ? 'text-right' : 'text-left']"
      :style="{ width: `${(labelCol.span / (labelCol.span + wrapperCol.span)) * 100}%` }"
      >{{ $attrs.label }}</label
    >
    <div class="w-full"><slot></slot></div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
const wrapperCol = inject("wrapperCol");
const labelCol = inject("labelCol");
const layout = inject("layout", "horizontal"); // 默认布局为水平布局
const labelAlign = inject("labelAlign", "right"); // 默认标签对齐方式为右对齐

const formItemClass = computed(() => {
  const baseClass = "flex mb-4";
  const layoutClass = {
    horizontal: "items-center",
    vertical: "flex-col",
  };
  return `${baseClass} ${layoutClass[layout]}`;
});
</script>

<style scoped>
label {
  /* line-height: 32px; */
  font-size: 14px;
  text-align: right;
}
</style>
