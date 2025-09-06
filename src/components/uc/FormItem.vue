<template>
  <div :class="formItemClass">
      <label
      :for="$attrs.name"
      :class="['shrink-0 mr-4 text-sm', labelAlign === 'right' ? 'text-right' : 'text-left']"
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
const layout = inject("layout");
const labelAlign = inject("labelAlign");

const formItemClass = computed(() => {
  const baseClass = "flex mb-4 text-base-color-switch";
  const layoutClass = {
    horizontal: "items-center",
    vertical: "flex-col",
  };
  return `${baseClass} ${layoutClass[layout]}`;
});
</script>

