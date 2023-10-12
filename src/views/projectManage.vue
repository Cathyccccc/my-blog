<template>
  <Table title="项目管理" :columns="columns" :data="dataSourceRef">
    <template #bodyCell="{column, row}">
      <template v-if="column.key === 'cover'">
        <img :src="row.cover">
      </template>
      <template v-else-if="column.key === 'project_url'">
        <a :href="row.project_url" target="_blank" rel="noopener noreferrer">{{ row.project_url }}</a>
      </template>
      <template v-else-if="column.key === 'technology'">
        <TagList :tag-list-data="row.technology" />
      </template>
      <template v-else-if="column.key === 'operate'">
        <div class="operate-list">
          <a @click="editProjectItem(row)">Edit</a>
          <a @click="deleteProjectItem(row)">Delete</a>
        </div>
      </template>
    </template>
  </Table>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Table from '../components/Table.vue';
import TagList from '../components/TagList.vue';
import {getProjectList} from '../api/project';

const columns = [
  {
    dataIndex: 'index',
    title: '序号',
  },
  {
    dataIndex: 'project_name',
    title: '项目名称',
  },
  {
    key: 'cover',
    dataIndex: 'cover',
    title: '封面',
  },
  {
    key: 'project_url',
    dataIndex: 'project_url',
    title: '链接地址'
  },
  {
    key: 'technology',
    dataIndex: 'technology',
    title: '相关技术',
  },
  {
    dataIndex: 'introduction',
    title: '项目介绍',
  },
  {
    dataIndex: 'finish_date',
    title: '完成时间',
  },
  {
    key: 'operate',
    dataIndex: 'operate',
    title: '操作',
  }
]
const dataSourceRef = ref([]);
onMounted(() => {
  getProjectList().then((res) => {
    dataSourceRef.value = res;
  })
})

// 修改项目
function editProjectItem(project) {
  console.log('修改项目', project)
}
// 删除项目
function deleteProjectItem(project) {
  console.log('删除项目', project)
}
</script>

<style scoped>

</style>