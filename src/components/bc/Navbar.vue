<template>
  <ul class="border-b-solid border-b-1 line-color-switch">
    <li
      v-for="item in paths"
      :key="item.path"
      class="h-14 box-border border-t-solid border-t-1 line-color-switch"
    >
      <router-link
        :to="item.path"
        active-class="text-slate-800 dark:text-white"
        exact-active-class="text-slate-800 dark:text-white"
        class="c-[--text-color] h-full px-10 flex flex-items-center hover:bg-white/50 dark:hover:bg-black/50"
      >
        <span :class="item.icon"></span>
        <span class="ml-2">{{ item.pathname }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  paths: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.navbar-wrapper {
  width: 100%;
}
</style>
