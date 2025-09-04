<template>
  <div class="text-base-color-switch px-3 text-sm leading-6 pt-10 text-center">
    <p class="text-6xl font-bold text-[--text-color]">404</p>
    <p class="italic mt-4">页面未找到！</p>
    <p>请检查地址是否正确</p>
    <p>或<a href="#" class="underline underline-offset-3 ml-1 font-bold hover:text-[--bs-indigo]" @click.prevent="$router.push('./article')">返回首页</a></p>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
