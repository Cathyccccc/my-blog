<template>
  <div class="article-container">
    <TagNav v-model:filter-key="filterKeyRef" :data="tagListRef" @filter="handleFilter" />
    <div class="content">
      <Loading v-if="loadingRef" class="loading" />
      <div class="article-list">
        <ArticleCard v-for="item in articleListRef" :key="item.id" :article="item"
          @click="$router.push({ path: `/articleDetail/${item.id}` })" />
      </div>
      <div class="side-list"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ArticleCard from '/src/components/ArticleCard.vue';
import Loading from '../components/Loading.vue';
import TagNav from '../components/TagNav.vue';
import { getArticleList } from '/src/api/article';
import { getTagList } from '../api/tag';

const filterKeyRef = ref('all');
const articleListRef = ref([]);
const tagListRef = ref([]);
const loadingRef = ref(false);
onBeforeMount(async () => {
  loadingRef.value = true;
  articleListRef.value = await getArticleList({ page: 1, pageSize: 5 });
  const result = (await getTagList()).map(item => ({title: item.tag_name, value: item.id}));
  tagListRef.value = [{title: '全部', value: 'all'}].concat(result);
  loadingRef.value = false;
})
function handleFilter() {
  console.log('请求过滤后的文章列表数据。。。', filterKeyRef.value)
}
</script>

<style scoped>
.article-container {
  background-color: #fff;
}
.content {
  display: flex;
  padding: 0 18px;
  box-sizing: border-box;
}
.article-list {
  width: 70%;
  margin: 10px 0;
}
.loading {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>