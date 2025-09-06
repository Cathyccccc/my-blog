<template>
  <div class="relative text-sm pt-6">
    <div
      v-show="currentIndex > 0"
      class="absolute left-0 min-w-2/5 max-w-4/5 px-3 py-2 bg-[#f4f0fd] dark:bg-[#3b1682] rounded-mdn text-[#111112] dark:text-white cursor-pointer hover:bg-[#5E27CA]/80  transition"
      @click="$router.push({ path: `/articleDetail/${articles[currentIndex - 1].id}` })"
    >
    <p class="flex justify-start items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg><span>上一篇</span></p>
      <p class="font-semibold leading-6 oneline-text-overflow">{{ articles[currentIndex - 1]?.title }}</p>
    </div>
    <div
      v-show="currentIndex < articles.length - 1"
      class="absolute right-0 min-w-2/5 max-w-4/5 px-3 py-2 bg-[#f4f0fd] dark:bg-[#3b1682] rounded-md text-[#111112] dark:text-white cursor-pointer hover:bg-[#5E27CA]/80  transition"
      @click="$router.push({ path: `/articleDetail/${articles[currentIndex + 1].id}` })"
    >
    <p class="flex justify-end items-center oneline-text-overflow">
      <span>下一篇</span
      ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 12h14m-4 4l4-4m-4-4l4 4"/></svg>
    </p>
      <p class="pl-6 text-end font-semibold leading-6">{{ articles[currentIndex + 1]?.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

const props = defineProps({
  current: {
    type: String,
  },
});

const currentIndex = ref(null);
const articles = ref([]);

onBeforeMount(() => {
  articles.value = JSON.parse(localStorage.getItem("articles"));
  if (props.current) {
    currentIndex.value = articles.value.findIndex((item) => item.id === props.current);
  }
});
</script>

<style scoped></style>
