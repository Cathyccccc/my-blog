<template>
  <div class="project-card-container">
    <!-- 背景图 -->
    <img :src="projectObj.cover">
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
  /* width: 300px; */
  height: 220px;
  /* flex-grow: 1; */
  flex: initial;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  /* margin: 20px; */
  transition: all .5s;
}
.project-card-container:hover {
  transform: scale(1.01);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-title{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 30px;
  text-align: center;
  /* left: 50%; */
  /* transform: translateX(-50%); */
}
.project-title a {
  font-size: 30px;
  color: #fff;
  text-decoration: none;
}
</style>