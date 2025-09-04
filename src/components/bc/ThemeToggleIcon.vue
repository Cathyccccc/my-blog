<template>
  <!-- 主题切换图标按钮 -->
  <div
    class="inline-block w-12 h-12 p-3 leading-3 rounded-full bg-linear-to-r from-[#5E27CB] via-[#210C4B] to-[#5E27CB] custom-bg-size bg-left hover:bg-right transition-background duration-300"
    @click="changeTheme"
  >
    <Transition name="theme-toggle">
      <span
        id="light"
        v-if="theme === 'light'"
        class="i-tabler:sun absolute text-4 c-white h-6 w-6"
      ></span>
      <span
        id="dark"
        v-else-if="theme === 'dark'"
        class="i-tabler:moon absolute text-4 c-white h-6 w-6"
      ></span>
    </Transition>
  </div>
</template>

<script setup>
import { useTheme } from "@/hooks";

const [theme, setTheme] = useTheme(); // 控制主题切换，默认 light

// 修改主题
function changeTheme(e) {
  switch (e.target.id) {
    case "light":
      setTheme("dark");
      break;
    case "dark":
      setTheme("light");
      break;
  }
}

</script>

<style scoped>
/* 主题按钮切换动画 */
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.1s ease-in;
}

.theme-toggle-leave-to {
  opacity: 0;
  transform: scale(1);
}

.theme-toggle-enter-from {
  opacity: 1;
  transform: scale(0);
}
</style>
