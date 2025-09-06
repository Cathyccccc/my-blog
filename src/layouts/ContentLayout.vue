<template>
  <div class="w-full h-full">
    <!-- 左侧栏（小屏隐藏） -->
    <div
      v-if="!$route.fullPath.startsWith('/manage')"
      class="lg:w-1/5 h-full hidden lg:block fixed left-0 top-0 bottom-0"
    >
      <slot name="left-side">左侧栏（小屏隐藏）</slot>
    </div>
    <!-- 内容区 -->
    <div
      :class="['content-container w-full h-full p-3', !$route.fullPath.startsWith('/manage') && 'lg:w-3/4 lg:ml-1/4']"
    >
      <slot name="content">内容区</slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.content-container {
  min-height: calc(100vh - 5rem);
  box-sizing: border-box;
}
</style>
