<template>
  <svg
  v-show="show"
    class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script setup>
import {onBeforeUnmount, ref, watch} from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
})

const show = ref(false);
const startTime = ref(0);
const timer = ref(null);
const minDuration = 300;

watch(() => props.loading, (newVal) => {
  if (newVal) {
    startTime.value = Date.now();
    show.value = true;
  } else {
    // 何时停止loading（值设置为false）
    const elapsed = Date.now() - startTime.value;
    if (elapsed < minDuration) {
      // 未到最小时间
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        show.value = false;
      }, minDuration - elapsed)
    } else {
      // 已到达最小时间
      show.value = false;
    }
  }
})

onBeforeUnmount(() => {
  clearTimeout(timer.value);
  timer.value = null;
})
</script>
