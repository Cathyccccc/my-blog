<template>
  <Table :columns="columns" :data="dataSourceRef" title="文章管理">
    <template #bodyCell="{ column, row }">
      <template v-if="column.key === 'coverImg'">
        <img :src="row.coverImg" />
      </template>
      <template v-else-if="column.key === 'tags'">
        <TagList v-if="column" :tag-list-data="row.tags" />
      </template>
      <template v-else-if="column.key === 'operate'">
        <div class="operate-list">
          <a @click="editArticleItem(row)">Edit</a>
          <a @click="deleteArticleItem(row)">Delete</a>
        </div>
      </template>
    </template>
  </Table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Table from '../components/Table.vue';
import TagList from '../components/TagList.vue';
import { getArticleList } from '../api/article';

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
    key: 'tags',
    dataIndex: 'tags',
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
onMounted(() => {
  getArticleList({ page: 1, pageSize: 10 }).then((res) => {
    dataSourceRef.value = res;
  })
})
// 修改文章
function editArticleItem(article) {
  console.log('修改文章', article)
}
// 删除文章
function deleteArticleItem(article) {
  console.log(article)
}
</script>

<style scoped>
img {
  width: 100px;
}
</style>