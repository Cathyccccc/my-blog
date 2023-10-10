<template>
  <Table :columns="columns" :data="dataSourceRef" title="文章管理">
    <template #operate>
      <a href="#">删除</a>
    </template>
  </Table>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import Table from '../components/Table.vue';
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
    dataIndex: 'coverImg',
    title: '文章封面',
  },
  {
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
    dataIndex: 'operate',
    title: '操作'
  }
]
const dataSourceRef = ref([]);
onMounted(() => {
  getArticleList({page: 1, pageSize: 10}).then((res) => {
    dataSourceRef.value = res;
  })
})
</script>