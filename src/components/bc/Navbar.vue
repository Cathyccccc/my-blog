<template>
  <ul class="fixed lg:static w-full border-b-solid border-b-1 line-color-switch">
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
        class="h-14 box-border border-t-solid border-t-1 line-color-switch hover:bg-white/50 dark:hover:bg-black/50"
      >
        <router-link
          :to="item.path"
          active-class="text-slate-800 dark:text-white"
          exact-active-class="text-slate-800 dark:text-white"
          class="c-[--text-color] h-full px-10 flex flex-items-center"
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
defineProps({
  paths: {
    type: Array,
    default: () => [],
  },
});

</script>

<style scoped>

</style>
