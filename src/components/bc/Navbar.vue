<template>
  <ul class="border-b-solid border-b-1 line-color-switch relative">
    <template v-for="item in paths" :key="item.path">
      <!-- <div
        v-if="item.children"
        class="h-14 bg-violet-200 c-[--text-color] px-10 flex flex-items-center hover:bg-white/50 dark:hover:bg-black/50 border-t-solid border-t-1 line-color-switch"
        @click="handleClick(item.path)"
        >
        <span>{{ item.meta?.title }}</span>
        <span class="i-tabler:chevron-down"></span>
        <span class="i-tabler:chevron-up"></span>
      </div> -->
      <li
        class="h-14 box-border border-t-solid border-t-1 line-color-switch"
      >
        <router-link
          :to="item.path"
          active-class="text-slate-800 dark:text-white"
          exact-active-class="text-slate-800 dark:text-white"
          class="c-[--text-color] h-full px-10 flex flex-items-center hover:bg-white/50 dark:hover:bg-black/50"
        >
          <!-- <span :class="item.icon"></span> -->
          <span class="ml-2">{{ item.pathname }}</span>
        </router-link>
      </li>
      <!-- <template v-else-if="item.children">
        <Transition name="toggle">
          <Navbar :paths="item.children" />
        </Transition>
      </template> -->
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  paths: {
    type: Array,
    default: () => [],
  },
});

const activeGroup = ref(null);

function handleClick(path) {
  console.log(path)
  if (path === activeGroup.value) {
    // 收起
  }
  activeGroup.value = path
}
</script>

<style scoped>
.toggle-move,
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s ease-in-out;
}

.toggle-leave-to,
.toggle-enter-from {
  height: 0;
  transform: translateY(-100%);
  /* transform-origin: center; */
}

.toggle-leave-from,
.toggle-enter-to {
  height: 100%;
  transform: translateY(0);
}

/* .toggle-leave-active {
  position: absolute;
} */
</style>
