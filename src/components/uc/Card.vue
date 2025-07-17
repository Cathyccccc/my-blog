<template>
  <div :class="cardClass">
    <!-- 头 -->
    <slot name="header">
      <div :class="['flex', 'justify-between', 'items-center', 'px-4',  'py-3', divider && 'border-b border-gray-50 dark:border-[--dark-line-color]']">
        <!-- 标题 -->
        <slot name="title">
          <p v-if="title" class="text-title-color-switch text-base font-semibold tracking-wider">
            {{ title }}
          </p>
        </slot>
        <!-- 右上角按钮 -->
        <slot name="extra">
          <a v-if="extra" href="#" class="text-sm text-gray-300 hover:text-violet-400">{{ extra }}</a>
        </slot>
      </div>
    </slot>
    <!-- 主内容 -->
    <div class="px-4 py-3 text-sm">
      <slot></slot>
    </div>
    <!-- 尾 -->
    <div v-if="$slots.footer" :class="['px-4', 'py-3', divider && 'border-t border-gray-50 dark:border-[--dark-line-color]']">
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
  let baseClass = 'bg-[--theme-color] dark:bg-[--dark-nav-bg-color] transition rounded-xl overflow-hidden';
  if (props.bordered) {
    baseClass += ' border line-color-switch border-solid'
  }
  if (props.shadow) {
    baseClass += ' shadow-md'
  }
  return baseClass
})
</script>
