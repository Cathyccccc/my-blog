<template>
  <div class="article-container">
    <TagNav v-model:filter-key="filterKeyRef" :data="tagListRef" @filter="handleFilter" />
    <div class="content">
      <Loading v-if="loadingRef" class="loading" />
      <div class="article-list">
        <ArticleCard v-for="item in articleListRef" :key="item.id" :article="item"
          @click="$router.push({ path: `/articleDetail/${item.id}` })" />
          <Pagination v-model:current="pagination.page" :total="pagination.total"/>
      </div>
      <div class="side-list"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watch, watchEffect } from 'vue'
import {useRouter} from 'vue-router';
import ArticleCard from '/src/components/ArticleCard.vue';
import Loading from '../components/Loading.vue';
import TagNav from '../components/TagNav.vue';
import Pagination from '../components/Pagination.vue';
import { getArticleList } from '/src/api/article';
import { getTagList } from '../api/tag';

const filterKeyRef = ref('all');
const articleListRef = ref([]);
const tagListRef = ref([]);
const loadingRef = ref(false);
const pagination = ref({
  page: 1,
  pageSize: 5,
  total: 0
})
onBeforeMount(async() => {
  const result = (await getTagList()).map(item => ({title: item.tag_name, value: item.id}));
  tagListRef.value = [{title: '全部', value: 'all'}].concat(result);
})
watchEffect(async() => {
  loadingRef.value = true;
  const result = await getArticleList(pagination.value);
  articleListRef.value = result.list;
  pagination.value.total = result.total;
  loadingRef.value = false;
})

const router = useRouter();
console.log(router)
// watch(() => )
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
  top: 100px;
  transform: translateX(-50%);
}
</style>