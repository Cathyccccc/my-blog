<template>
  <div>
    <Loading v-if="loadingRef" class="loading" />
    <Table v-else title="项目管理" :columns="columns" :data="dataSourceRef">
      <template #action>
        <Button @click="handleModalOpen('add')">新增项目</Button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.key === 'cover'">
          <img :src="'/static/' + row.cover" width="100" />
        </template>
        <template v-else-if="column.key === 'project_url'">
          <a :href="row.project_url" target="_blank" rel="noopener noreferrer">{{
            row.project_url
          }}</a>
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
    <Modal
      v-model:open="visibleRef"
      :title="statusRef === 'add' ? '新增项目' : '修改项目'"
      @on-ok="handleOk"
    >
      <Form :wrapper-col="{ span: 21 }" :label-col="{ span: 3 }">
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
          <DatePicker v-model:value="projectRef.finish_date" />
        </FormItem>
        <FormItem label="项目介绍" name="introduction">
          <Textarea v-model:value.trim="projectRef.introduction" rows="5" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model:open="visibleDeleteRef" title="删除项目" @on-ok="deleteProjectItem">
      确认删除项目【{{ deleteProjectRef.project_name }}】吗？
    </Modal>
  </div>
</template>

<script setup>
import { inject,onMounted, ref } from "vue";

import api from "@/api";
import DatePicker from "@/components/DatePicker.vue";
import TagList from "@/components/TagList.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/uc/Button.vue";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
import Loading from "@/components/uc/Loading.vue";
import Modal from "@/components/uc/Modal.vue";
import Select from "@/components/uc/Select.vue";
import Table from "@/components/uc/Table.vue";
import Upload from "@/components/uc/Upload.vue";
import { getDate } from "@/utils/date";

const columns = [
  {
    dataIndex: "index",
    title: "序号",
  },
  {
    dataIndex: "project_name",
    title: "项目名称",
  },
  {
    key: "cover",
    dataIndex: "cover",
    title: "封面",
  },
  {
    key: "project_url",
    dataIndex: "project_url",
    title: "链接地址",
  },
  {
    key: "technology",
    dataIndex: "technology",
    title: "相关技术",
  },
  {
    dataIndex: "introduction",
    title: "项目介绍",
  },
  {
    dataIndex: "finish_date",
    title: "完成时间",
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
  },
];
const dataSourceRef = ref([]);
const tagListRef = ref([]);
const loadingRef = ref(false);
onMounted(async () => {
  loadingRef.value = true;
  // dataSourceRef.value = await api.project.getProjectList();
  // const tagList = await api.tag.getTagList();
  // tagListRef.value = tagList.map((item) => ({ value: item.id, label: item.tag_name }));
  loadingRef.value = false;
});
async function fetchData(filterKey = "") {
  loadingRef.value = true;
  dataSourceRef.value = await api.project.getProjectList({ filterKey });
  loadingRef.value = false;
}
const projectRef = ref({
  project_name: "",
  cover: "",
  project_url: "",
  technology: [],
  introduction: "",
  finish_date: "",
});
const visibleDeleteRef = ref(false);
const visibleRef = ref(false);
const statusRef = ref("add");
// 打开add和edit弹窗
function handleModalOpen(status, row) {
  clearForm();
  visibleRef.value = true;
  statusRef.value = status;
  if (status === "edit") {
    projectRef.value = {
      ...row,
      technology: row.technology.map((item) => item.id), // 这样写没问题，但是给projectRef赋值后再修改technology，再次打开edit弹窗数据就没了
    };
    api.upload.getImage(projectRef.value.cover).then((res) => {
      const arr = row.cover.split("/");
      const filename = arr[arr.length - 1];
      const file = new File([res], filename, { type: res.type });
      fileListRef.value = [file];
    });
  }
}
// 打开delete弹窗
const deleteProjectRef = ref();
function handleDelete(row) {
  visibleDeleteRef.value = true;
  deleteProjectRef.value = row;
}
// Upload上传图片
// 待修改v-model（改成v-model:projectRef.cover)
const fileListRef = ref([]);
function handleChange() {
  // 处理上传的图片
}

// 新增项目
async function addProjectItem() {
  if (!projectRef.value.project_name) return;
  if (!projectRef.value.project_url) return;
  if (!projectRef.value.finish_date) return;
  if (!fileListRef.value.length) return;
  if (!projectRef.value.technology.length) return;
  const technology = formatTechnology();
  // 图片上传到服务器
  const formData = new FormData();
  formData.append("coverImg", fileListRef.value[0]);
  const { path } = await api.upload.uploadImage(formData);
  projectRef.value.cover = path;
  // 调用新增项目api
  await api.project.addProject({ ...projectRef.value, technology });
  visibleRef.value = false;
  await fetchData();
  clearForm();
}
// 修改项目
async function editProjectItem() {
  // console.log('修改项目', projectRef.value)
  const technology = formatTechnology();
  await api.project.updateProject({ ...projectRef.value, technology });
  visibleRef.value = false;
  await fetchData();
  clearForm();
}
// 删除项目
function deleteProjectItem() {
  api.project.deleteProject(deleteProjectRef.value.id).then(() => {
    visibleDeleteRef.value = false;
    fetchData();
  });
}
function handleOk() {
  if (statusRef.value === "add") {
    addProjectItem();
  } else if (statusRef.value === "edit") {
    editProjectItem();
  }
}
function formatTechnology() {
  const data = tagListRef.value
    .filter((item) => projectRef.value.technology.find((i) => i === item.value))
    .map((i) => {
      return {
        id: i.value,
        tag_name: i.label,
      };
    });
  return data;
}
function clearForm() {
  projectRef.value = {
    project_name: "",
    cover: "",
    project_url: "",
    technology: [],
    introduction: "",
    finish_date: "",
  };
  fileListRef.value = [];
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
