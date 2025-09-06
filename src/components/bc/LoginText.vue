<template>
  <div class="animate-text text-center px-4 pt-10 antialiased">
    <span
      v-for="(item, index) in str"
      :key="item"
      class="relative z-2 text bg-gray-50 rounded shadow-md shadow-stone-400/50"
      :style="{ '--i': index }"
      >{{ item }}</span
    >
    <div class="hidden sm:block relative -translate-y-11 text-zinc-200">
      <span v-for="(item, index) in str"
      :key="item">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
const str = "每天都收获一点~";
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+SC&display=swap");
span {
  font-family: "WDXL Lubrifont SC", sans-serif;
  font-size: 28px;
  font-weight: 400;
}
.animate-text {
  // display: inline-block;
  white-space: nowrap;
  letter-spacing: 1px;
}
.animate-text .text {
  // 必须。transform对inline元素是没有效果的
  display: inline-block;
  /* 每个字符比前一个再上移 4px */
  // transform: translateY(calc(4px * var(--i)));
  /* 添加动画效果 */
  // transition: transform 0.3s ease;
  animation: customWave 3s ease infinite;
  animation-delay: calc(0.2s * var(--i));
}
@keyframes customWave {
  0% {
    transform: translateY(0) skewY(1deg);
  }
  50% {
    transform: translateY(-16px) skewY(-6deg);
  }
  100% {
    transform: translateY(0) skewY(1deg);
  }
}
</style>
