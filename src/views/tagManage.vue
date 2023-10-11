<template>
  <Table :data="gridData" :columns="gridColumns" :filter-key="searchQuery" title="标签管理">
    <template #operate="{ row }">
      <a @click="deleteTagItem(row)">Delete</a>
    </template>
  </Table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Table from '../components/Table.vue';
import { getTagList } from '../api/tag';

const searchQuery = ref('')
const gridColumns = [
  {
    title: '序号',
    key: 'index',
    dataIndex: 'index',
  },
  {
    title: '标签名称',
    key: 'tag_name',
    dataIndex: 'tag_name',
  },
  {
    title: '文章数目',
    key: 'article_count',
    dataIndex: 'article_count',
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    customRender: () => { }
  }
]
const gridData = ref([])
onMounted(() => {
  getTagList().then((res) => {
    gridData.value = res;
  })
})

function deleteTagItem(row) {
  console.log(row)
}

</script>

<style scoped>
a {
  color: #5ab4f0;
}
</style>