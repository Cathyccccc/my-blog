<template>
  <div :class="tagClass" :style="{color, borderColor: color}">
    <slot></slot>
    <!-- 这里需要处理点击关闭按钮时事件不会冒泡到select，导致下拉框toggle -->
    <span v-if="closable" class="cursor-pointer ml-1" @click="$emit('close')">
      <svg
        class="w-4 h-4 text-gray-300 hover:text-gray-600 transition-color"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "default", // 可选值：info, success, warning, error
  },
  size: {
    type: String,
    default: "medium"
  },
  closable: {
    type: Boolean,
    default: false, // 是否可关闭
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  color: { // 应与info互斥
    type: String,
  },
  circle: {
    type: Boolean,
    default: false
  }
});
defineEmits(["close"]);

const tagClass = computed(() => {
  let baseClass = "inline-flex whitespace-nowrap";
  // 定义不同类型和大小的样式
  const colors = {
    default: "text-slate-400",
    info: "text-sky-700 dark:bg-gray-100",
    success: "text-green-700",
    warning: "text-yellow-800",
    error: "text-red-800",
  };
  const sizes = {
    small: "text-xs px-3 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-base px-5 py-2",
  };
  const borderColor = {
    default: "border-slate-400",
    info: "border-sky-700",
    success: "border-green-700",
    warning: "border-yellow-800",
    error: "border-red-800",
  }
  let classStr = `${colors[props.type]} ${sizes[props.size] || sizes.medium} ${baseClass}`
  if (props.bordered) {
    classStr += ` border ${!props.color && borderColor[props.type]}`
  }
  if (props.circle) {
    classStr += ' rounded-full'
  } else {
    classStr += ' rounded-md'
  }
  return classStr;
});
</script>

<style scoped></style>
