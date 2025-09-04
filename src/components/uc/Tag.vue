<template>
  <div :class="[tagClass, checked && 'shadow-lg drop-shadow-lg']" :style="[color && `background: ${color}`]" @mousedown="handleClickCheckable">
    <slot></slot>
    <!-- 这里需要处理点击关闭按钮时事件不会冒泡到select，导致下拉框toggle -->
    <span v-if="closable" class="cursor-pointer ml-1" @click="$emit('close')">
      <svg
        class="w-4 h-4 text-stone-500"
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
    validator(value) {
      // The value must match one of these strings
      return ["default", "info", "success", "warning", "error"].includes(value);
    },
  },
  closable: {
    type: Boolean,
    default: false, // 是否可关闭
  },
  checkable: {
    // 标签是否可选
    type: Boolean,
    default: false,
  },
  checked: {
    // 标签可选时的选中状态
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  color: {
    // 有color时没有border
    type: String,
  },
  circle: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "change"]);

const tagClass = computed(() => {
  let baseClass =
    "inline-flex whitespace-nowrap text-xs px-2 py-0.5 h-6 box-border flex items-center transition";
  // 定义不同类型和大小的样式
  let colors = {
    default: "bg-[--theme-color] dark:bg-zinc-700/80 text-[#000000E0] dark:text-neutral-300",
    info: "bg-indigo-600 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-yellow-600 text-white",
    error: "bg-red-600 text-white",
  };
  if (props.bordered) {
    colors = {
      default: "bg-neutral-50 dark:bg-transparent text-[#000000E0] dark:text-neutral-300",
      info: "bg-white dark:bg-inherit text-sky-700",
      success: "bg-white dark:bg-inherit text-emerald-700",
      warning: "bg-white dark:bg-inherit text-yellow-800",
      error: "bg-white dark:bg-inherit text-red-800",
    };
  }
  const borderColor = {
    default: "border-neutral-300 dark:border-neutral-400",
    info: "border-sky-700",
    success: "border-emerald-700",
    warning: "border-yellow-800",
    error: "border-red-800",
  };
  let classStr = baseClass;
  if (!props.color) {
    classStr += ` ${colors[props.type]}`;
    if (props.bordered) {
      classStr += ` border ${borderColor[props.type]}`;
    }
  } else {
    classStr += ' text-white'
  }

  if (props.circle) {
    classStr += " rounded-full";
  } else {
    classStr += " rounded-xs";
  }

  if (!props.closable && props.checkable) {
    classStr += " cursor-pointer";
  }
  return classStr;
});

function handleClickCheckable() {
  if (props.checkable) {
    emit("change", !props.checked);
  }
}
</script>

<style scoped></style>
