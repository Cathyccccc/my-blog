<template>
  <Table title="评论管理" :columns="columns" :data="dataSourceRef" />
</template>

<script setup>
import Table from '../components/Table.vue';

const columns = [
  {
    dataIndex: 'index',
    title: '序号',
  },
  {
    dataIndex: 'commentTxt',
    title: '评论内容',
  },
  {
    dataIndex: 'nickname',
    title: '评论人',
  },
  {
    key: 'avatar',
    dataIndex: 'avatar',
    title: '头像',
  },
  {
    dataIndex: 'title',
    title: '评论文章',
  },
  {
    dataIndex: ''
  },
  {
    dataIndex: 'createTime',
    title: '评论时间',
  },
  {
    key: 'operate',
    dataIndex: 'operate',
    title: '删除',
  }
]
</script>