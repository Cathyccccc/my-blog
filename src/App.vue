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
import { onMounted } from "vue";

import { useTheme } from "@/hooks";
import {event} from "@/utils/event";

const [theme] = useTheme(); // 控制主题切换，默认 light

onMounted(() => {
  document.addEventListener("scroll", () => {
    event.emit("scroll", event);
  });
});
</script>

<style scoped></style>
