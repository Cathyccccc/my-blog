<template>
  <div class="project-card-container">
    <!-- 背景图 -->
    <img :src="`http://localhost:3000/static/${projectObj.cover}`">
    <div class="project-title"><a href="#">{{ projectObj.project_name }}</a></div>
  </div>
</template>

<script setup>
const props = defineProps({
  projectObj: Object,
})

</script>

<style scoped>
.project-card-container {
  min-width: 300px;
  height: 220px;
  flex: initial;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: all .5s;
}
.project-card-container:hover {
  transform: scale(1.01);
}
img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.project-title{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: center;
}
.project-title a {
  font-size: 20px;
  color: #3c3c3c;
  text-decoration: none;
}
</style>