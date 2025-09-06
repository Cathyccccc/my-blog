<template>
  <div
    class="w-svw h-full flex justify-between items-center px-3 md:px-5 box-border bg-[#f4f0fd] dark:bg-[#3b1682] transition shadow-md"
  >
    <!-- <h3 class="w-30 leading-8 c-[--text-color] text-md font-semibold">
      {{ $route.meta.title }}
    </h3> -->
    <div class="flex justify-between items-center w-full h-full">
      <MenuToggleIcon :value="toggle" @toggle="(value) => (toggle = value)" />
      <BlogIcon />
      <ThemeToggleIcon class="scale-90" />
    </div>
  </div>
  <Transition name="toggle">
    <Navbar
      v-show="toggle"
      :paths="userData ? paths.concat(managePaths) : paths"
      class="lg:hidden top-20 -z-1 bg-violet-50 dark:bg-[#3b1682] shadow-sm shrink-0"
      @click-nav="toggle = false"
    />
  </Transition>
</template>

<script setup>
import { ref } from "vue";

import BlogIcon from "@/components/bc/BlogIcon.vue";
import MenuToggleIcon from "@/components/bc/MenuToggleIcon.vue";
import Navbar from "@/components/bc/Navbar.vue";
import ThemeToggleIcon from "@/components/bc/ThemeToggleIcon.vue";
import { managePaths, paths } from "@/utils/constant";

defineProps({
  userData: {
    type: Object,
    default: () => {},
  },
});

const toggle = ref(false);
</script>

<style scoped>
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s ease-in-out;
}

.toggle-leave-to,
.toggle-enter-from {
  transform: translateY(-100%);
}
</style>
