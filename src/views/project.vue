<template>
  <div class="project-container">
    <Loading v-if="loadingRef" class="loading" />
    <ProjectCard v-else v-for="item in projectListRef" :key="item.id" :projectObj="item" />
  </div>
</template>

<script setup>
import {onMounted, ref, inject} from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import Loading from '../components/Loading.vue';
import {getProjectList} from '../api/project';

const projectListRef = ref([]);
const loadingRef = ref(false);
onMounted(() => {
  loadingRef.value = true;
  getProjectList().then((res) => {
    projectListRef.value = res;
    loadingRef.value = false;
  })
})

const emitter = inject('emitter');
emitter.on('searchProject', (value) => {
  projectListRef.value = value;
})
</script>

<style scoped>
.project-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 5%;
  margin-top: 20px;
}
.loading {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>