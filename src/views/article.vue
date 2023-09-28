

<template>
  <div class="article-container">
    <div class="article-list">
      <ArticleCard v-for="item in articleListRef" :key="item.id" :article="item" @click="$router.push({path: `/articleDetail/${item.id}`, params: {article: item}})"/>
    </div>
    <div class="side-list"></div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ArticleCard from '/src/components/ArticleCard.vue';
import {getArticleList} from '/src/api/article';
const articleListRef = ref([]);
onBeforeMount(() => {
  getArticleList({page: 1, pageSize: 5}).then((res) => articleListRef.value = res)
})
</script>

<style scoped>
.article-container {
  display: flex;
  background-color: #fff;
  padding: 0 18px;
  box-sizing: border-box;
}

.article-list {
  width: 65%;
  margin: 10px 0;
}
</style>