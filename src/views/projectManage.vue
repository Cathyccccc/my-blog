<template>
  <Loading v-if="dataSourceRef" />
  <Table title="项目管理" :columns="columns" :data="dataSourceRef">
    <template #action>
      <Button @click="visibleAddRef = true">新增项目</Button>
    </template>
    <template #bodyCell="{column, row}">
      <template v-if="column.key === 'cover'">
        <img :src="row.cover" width="100">
      </template>
      <template v-else-if="column.key === 'project_url'">
        <a :href="row.project_url" target="_blank" rel="noopener noreferrer">{{ row.project_url }}</a>
      </template>
      <template v-else-if="column.key === 'technology'">
        <TagList :tag-list-data="row.technology" />
      </template>
      <template v-else-if="column.key === 'operate'">
        <div class="operate-list">
          <Button type="link" @click="editProjectItem(row)">Edit</Button>
          <Button type="link" @click="deleteProjectItem(row)">Delete</Button>
        </div>
      </template>
    </template>
  </Table>
  <Modal>
    <FormItem label="项目名称" name="project_name">
      <Input></Input>
    </FormItem>
    <FormItem label="封面" name="cover"></FormItem>
    <FormItem label="链接地址" name="project_url">
      <Input />
    </FormItem>
    <FormItem label="相关技术" name="technology">
      <Select />
    </FormItem>
  </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Table from '../components/Table.vue';
import TagList from '../components/TagList.vue';
import Button from '../components/Button.vue';
import Loading from '../components/Loading.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
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
const visibleAddRef = ref(false);
const visibleRef = ref(false);
const tagRef = ref();
// 新增项目
function addProjectItem() {}
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