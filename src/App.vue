<template>
  <div
    :class="['h-full min-h-screen', theme]"
    :style="{
      background: theme === 'dark' ? '#0b0020' : '#fff',
      transition: 'background .3s cubic-bezier(0.4, 0, 0.2, 1)',
    }"
  >
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, provide } from "vue";

import { useEvent } from "@/hooks";
import { useTheme } from "@/hooks";

const { emit } = useEvent();
const [theme] = useTheme(); // 控制主题切换，默认 light

onMounted(() => {
  document.addEventListener("scroll", () => {
    emit("scroll", event);
  });
});
</script>

<style scoped></style>
