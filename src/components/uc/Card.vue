<template>
  <div :class="cardClass">
    <!-- 头 -->
    <slot name="header">
      <div :class="['flex', 'justify-between', 'items-center', 'px-4',  'py-2', divider && 'border-b border-gray-50 dark:border-line']">
        <!-- 标题 -->
        <slot name="title">
          <p v-if="title" class="text-base-color-switch text-base font-semibold tracking-wider">
            {{ title }}
          </p>
        </slot>
        <!-- 右上角按钮 -->
        <slot name="extra">
          <a v-if="extra" href="#" class="text-sm text-gray-400 hover:text-violet-400">{{ extra }}</a>
        </slot>
      </div>
    </slot>
    <!-- 主内容 -->
    <div class="px-4 py-2 text-sm">
      <slot></slot>
    </div>
    <!-- 尾 -->
    <div v-if="$slots.footer" :class="['px-4', 'py-2', divider && 'border-t border-gray-50 dark:border-line']">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  bordered: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  divider: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  title: String,
  extra: String,
});

const cardClass = computed(() => {
  let baseClass = 'bg-theme sm:bg-[--theme-color] dark:bg-[#3b1682] sm:dark:bg-[--dark-nav-bg-color] transition rounded-xl overflow-hidden';
  if (props.bordered) {
    baseClass += ' border line-color-switch border-solid'
  }
  if (props.shadow) {
    baseClass += ' shadow-md'
  }
  return baseClass
})
</script>
