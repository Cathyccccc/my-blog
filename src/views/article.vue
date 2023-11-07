<template>
  <div class="article-container">
    <TagNav v-model:filter-key="filterKeyRef" :data="tagListRef" @filter="handleFilter" />
    <div class="content">
      <Loading v-if="loadingRef" class="loading" />
      <div v-else class="article-list" v-show="articleListRef.length">
        <ArticleCard v-for="item in articleListRef" :key="item.id" :article="item" :tagList="tagListRef"
          @click="browseArticle(item)" />
        <Pagination v-model:current="pagination.page" :total="pagination.total" />
      </div>
      <Empty v-show="articleListRef.length === 0" class="empty" />
      <div class="side-list"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect, inject } from 'vue';
import {useRouter} from 'vue-router';
import ArticleCard from '/src/components/ArticleCard.vue';
import Loading from '../components/Loading.vue';
import TagNav from '../components/TagNav.vue';
import Pagination from '../components/Pagination.vue';
import Empty from '../components/Empty.vue';
import { getArticleList, updateArticle } from '/src/api/article';
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
onBeforeMount(async () => {
  const result = (await getTagList()).map(item => ({ title: item.tag_name, value: item.id }));
  tagListRef.value = [{ title: '全部', value: 'all' }].concat(result);
})
async function fetchData(filterKey) {
  loadingRef.value = true;
  const result = await getArticleList({...pagination.value, filterKey});
  articleListRef.value = result.list;
  pagination.value.total = result.total;
  loadingRef.value = false;
}
watchEffect(async () => {
  await fetchData();
})

async function handleFilter() {
  if (filterKeyRef.value === 'all') {
    await fetchData();
  } else {
    await fetchData(filterKeyRef.value);
  }
}

const router = useRouter();
function browseArticle(article) {
  article.scanNumber++;
  updateArticle({...article});
  router.push({ path: `/articleDetail/${article.id}` });
}

const emitter = inject('emitter')
emitter.on('searchArticle', (value) => {
  pagination.value.total = value.total;
  articleListRef.value = value.list;
})

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