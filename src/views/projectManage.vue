<template>
  <Loading v-if="loadingRef" class="loading" />
  <Table v-else title="项目管理" :columns="columns" :data="dataSourceRef">
    <template #action>
      <Button @click="handleModalOpen('add')">新增项目</Button>
    </template>
    <template #bodyCell="{ column, row }">
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
          <Button type="link" @click="handleModalOpen('edit', row)">Edit</Button>
          <Button type="link" @click="handleDelete(row)">Delete</Button>
        </div>
      </template>
    </template>
  </Table>
  <Modal v-model:open="visibleRef" :title="statusRef === 'add' ? '新增项目' : '修改项目'" @on-ok="handleOk">
    <FormItem label="项目名称" name="project_name">
      <Input v-model:value="projectRef.project_name" />
    </FormItem>
    <FormItem label="封面" name="cover">
      <!-- 待修改v-model -->
      <Upload v-model:file-list="fileListRef" @change="handleChange" />
    </FormItem>
    <FormItem label="链接地址" name="project_url">
      <Input v-model:value="projectRef.project_url" />
    </FormItem>
    <FormItem label="相关技术" name="technology">
      <Select v-model:value="projectRef.technology" :options="tagListRef" mode="multiple" />
    </FormItem>
    <FormItem label="完成时间" name="finish_date">
      <!-- 手写DatePicker -->
    </FormItem>
    <FormItem label="项目介绍" name="introduction">
      <Textarea v-model:value.trim="projectRef.introduction" rows="5" />
    </FormItem>
  </Modal>
  <Modal v-model:open="visibleDeleteRef" title="删除项目" @on-ok="deleteProjectItem">
    确认删除项目【{{ deleteProjectRef.project_name }}】吗？
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import TagList from '../components/TagList.vue';
import Button from '../components/Button.vue';
import Loading from '../components/Loading.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Modal from '../components/Modal.vue';
import Upload from '../components/Upload.vue';
import Textarea from '../components/Textarea.vue';
import { getProjectList } from '../api/project';
import { getTagList } from '../api/tag';
import { getDate } from '../utils/date';
import { getBase64 } from '../utils/encode';

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
const tagListRef = ref([]);
const loadingRef = ref(false);
onMounted(async () => {
  loadingRef.value = true;
  dataSourceRef.value = await getProjectList();
  const tagList = await getTagList();
  tagListRef.value = tagList.map(item => ({ value: item.id, label: item.tag_name }))
  loadingRef.value = false;
})
const projectRef = ref({
  project_name: '',
  cover: '',
  project_url: '',
  technology: [],
  introduction: '',
  finish_date: '',
})
const visibleDeleteRef = ref(false);
const visibleRef = ref(false);
const statusRef = ref('add');
// 打开add和edit弹窗
function handleModalOpen(status, projectObj) {
  visibleRef.value = true;
  statusRef.value = status;
  if (status === 'edit') {
    projectRef.value = projectObj;
  } else if(status === 'add') {
    projectRef.value = {
      project_name: '',
      cover: '',
      project_url: '',
      technology: [],
      introduction: '',
      finish_date: '',
    }
  }
}
// 打开delete弹窗
const deleteProjectRef = ref();
function handleDelete(projectObj) {
  visibleDeleteRef.value = true;
  deleteProjectRef.value = projectObj;
}
// Upload上传图片
// 待修改v-model
const fileListRef = ref([]);
function handleChange() {
  // 处理上传的图片
  projectRef.value.cover = getBase64(fileListRef.value);
}
// 新增项目
function addProjectItem() {
  const finish_date = getDate();
  projectRef.value.finish_date = finish_date;
  console.log('新增项目', projectRef.value)
}
// 修改项目
function editProjectItem() {
  console.log('修改项目', projectRef.value)
}
// 删除项目
function deleteProjectItem() {
  console.log('删除项目', deleteProjectRef.value)
}
function handleOk() {
  if (statusRef.value === 'add') {
    addProjectItem()
  } else if (statusRef.value === 'edit') {
    editProjectItem();
  }
}
</script>

<style scoped>
.loading {
  position: relative;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}
</style>