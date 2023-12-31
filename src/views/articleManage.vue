<template>
  <Loading v-if="loadingRef" class="loading" />
  <Table v-else :columns="columns" :data="dataSourceRef" title="文章管理">
    <template #action>
      <Button @click="$router.push('/addArticle')">新增文章</Button>
    </template>
    <template #bodyCell="{ column, row }">
      <template v-if="column.key === 'coverImg'">
        <img :src="'http://localhost:3000/static/'+row.coverImg" />
      </template>
      <template v-else-if="column.key === 'tag'">
        <TagList v-if="column" :tag-list-data="row.tag" />
      </template>
      <template v-else-if="column.key === 'operate'">
        <div class="operate-list">
          <Button type="link" @click="$router.push({ path: `/editArticle/${row.id}`})">Edit</Button>
          <Button type="link" @click="handleModalOpen(row)">Delete</Button>
        </div>
      </template>
    </template>
  </Table>
  <Modal v-model:open="visibleRef" title="删除文章" @on-ok="deleteArticleItem">
    确认删除标题为【{{ articleRef.title }}】的文章吗？
  </Modal>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import Table from '../components/Table.vue';
import TagList from '../components/TagList.vue';
import Button from '../components/Button.vue';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';
import { getArticleList, deleteArticle } from '../api/article';
import { getTagList } from '../api/tag';

const columns = [
  {
    dataIndex: 'index',
    title: '序号',
  },

  {
    dataIndex: 'title',
    title: '文章标题'
  },
  {
    key: 'coverImg',
    dataIndex: 'coverImg',
    title: '文章封面',
  },
  {
    key: 'tag',
    dataIndex: 'tag',
    title: '文章分类'
  },
  {
    dataIndex: 'date',
    title: '创建日期',
  },
  {
    dataIndex: 'scanNumber',
    title: '浏览数',
  },
  {
    dataIndex: 'commentNumber',
    title: '评论数',
  },
  {
    key: 'operate',
    dataIndex: 'operate',
    title: '操作'
  }
]
const dataSourceRef = ref([]);
const loadingRef = ref(false);
const tagListRef = ref([]);
onMounted(async() => {
  loadingRef.value = true;
  await fetchData();
  tagListRef.value = await getTagList();
  loadingRef.value = false;
})
async function fetchData(filterKey = '') {
  const result = await getArticleList({ page: 1, pageSize: 10, filterKey });
  dataSourceRef.value = result.list;
}
const visibleRef = ref(false);
const articleRef = ref();
function handleModalOpen(article) {
  visibleRef.value = true;
  articleRef.value = article;
}
// 删除文章
async function deleteArticleItem() {
  visibleRef.value = false;
  loadingRef.value = true;
  await deleteArticle(articleRef.value.id);
  await fetchData();
  loadingRef.value = false;
}

const emitter = inject('emitter')
emitter.on('searchArticleManage', (value) => {
  console.log('search article manage', value)
  fetchData(value);
})
</script>

<style scoped>
img {
  width: 100px;
}
.loading {
  position: relative;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}
</style>