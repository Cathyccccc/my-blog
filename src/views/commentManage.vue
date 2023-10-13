<template>
  <Table title="评论管理" :columns="columns" :data="dataSourceRef">
    <template #bodyCell="{column, row}">
      <template v-if="column.key === 'avatar'">
        <img :src="row.avatar">
      </template>
      <template v-else-if="column.key === 'operate'">
        <Button type="link" @click="deleteCommentItem(row)">Delete</Button>
      </template>
    </template>
  </Table>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import { getArticleList } from '../api/article';

const columns = [
  {
    dataIndex: 'index',
    title: '序号',
  },
  {
    dataIndex: 'title',
    title: '评论文章',
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
    dataIndex: 'replayNumber',
    title: '回复数',
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
const dataSourceRef = ref([]);
onMounted(() => {
  getArticleList().then((res) => {
    dataSourceRef.value = res.flatMap(article => {
      return article.comments.map(item => {
        return {
          ...item,
          title: article.title,
          articleId: article.id,
          replayNumber: item.replayArr ? item.replayArr.length : 0,
        }
      })
    })
  })
})
// 删除评论
function deleteCommentItem(comment) {
  console.log('删除评论', comment)
}
</script>

<style scoped>
img {
  width: 50px;
}
</style>