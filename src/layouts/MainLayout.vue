<template>
  <!-- 响应式布局 -->
  <div class="w-full h-full flow-root">
    <!-- 顶部导航（小屏显示） -->
    <div class="h-20 lg:hidden bg-green-200 fixed z-100 left-0 top-0 right-0">
      <slot name="top-side">顶部导航（小屏显示）</slot>
    </div>
    <!-- (左侧 or 下侧）内容区 -->
    <div class="lg:w-4/5 w-full lg:h-full mt-20 lg:mt-0">
      <slot name="main-content"></slot>
    </div>
    <!-- 右侧栏（导航） -->
    <div class="w-1/5 h-full bg-green-200 hidden lg:block fixed top-0 right-0 bottom-0">
      <slot name="right-side">右侧栏（导航）</slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.app-main {
  /* margin-top: 80px; */
  height: calc(100vh - 80px);
}
</style>
