<template>
  <div class="project-container">
    <ProjectCard v-for="item in projectListRef" :key="item.id" :projectObj="item" />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import {getProjectList} from '../api/project';

const projectListRef = ref([]);
onMounted(() => {
  getProjectList().then((res) => {
    // console.log(res)
    projectListRef.value = res;
  })
})
</script>

<style scoped>
.project-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>