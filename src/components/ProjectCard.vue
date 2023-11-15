<template>
  <div class="project-card-container">
    <!-- 图片 -->
    <div class="left">
      <img :src="`http://localhost:3000/static/${projectObj.cover}`">
      <div class="project-title">{{ projectObj.project_name }}</div>
    </div>
    <!-- 描述 -->
    <div class="right">
      <div class="introduction">简介：{{ projectObj.introduction }}</div>
      <div class="url">链接：<a :href="projectObj.project_url" target="_blank">{{ projectObj.project_url }}</a></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  projectObj: Object,
})

</script>

<style scoped>
.project-card-container {
  width: 47%;
  height: 230px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  transition: all .5s;
}

.project-card-container:hover {
  box-shadow: 1px 2px 30px rgba(150, 150, 150, .2);
}

.left {
  width: 280px;
  height: 100%;
}

img {
  width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
}

.project-title {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: center;
  font-size: 20px;
}


.right {
  height: 100%;
  margin-left: 20px;
  font-size: 14px;
} 
.introduction {
  height: 180px;
  line-height: 26px;
  letter-spacing: 1px;
  overflow: hidden;
  word-break: break-all;
}

a {
  font-size: 13px;
  line-height: 40px;
  text-decoration: none;
  color: #55BBFF;
}

</style>