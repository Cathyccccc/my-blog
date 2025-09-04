<template>
  <div>
    <Loading v-if="loadingRef" class="loading" />
    <template v-else>
      <Table :data="gridData" :columns="gridColumns" :filter-key="searchQuery" title="标签管理">
        <template #header>
          <Button @click="visibleAddRef = true">新增标签</Button>
        </template>

        <template #bodyCell="{ column, row }">
          <template v-if="column.key === 'operate'">
            <Button type="link" @click="handleDelete(row)">Delete</Button>
          </template>
        </template>
      </Table>
    </template>
    <Modal v-model:open="visibleAddRef" title="新增标签" @on-ok="addTagItem">
      <Form :wrapper-col="{ span: 21 }" :label-col="{ span: 3 }">
        <FormItem label="标签名称" name="tag_name">
          <Input v-model:value.trim="tagNameRef" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model:open="visibleDeleteRef" title="删除标签" @on-ok="deleteTagItem">
      确认删除标签
      <Tag bordered>{{ deleteTagRef.tag_name }}</Tag>
      吗？
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import api from "@/api";
import Button from "@/components/uc/Button.vue";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
import Loading from "@/components/uc/Loading.vue";
import Modal from "@/components/uc/Modal.vue";
import Table from "@/components/uc/Table.vue";
import Tag from "@/components/uc/Tag.vue";

const searchQuery = ref("");
const gridData = ref([]);
const loadingRef = ref(false);
const tagNameRef = ref("");
const visibleAddRef = ref(false); // 控制新增 Modal弹窗
const visibleDeleteRef = ref(false); // 控制删除 Modal弹窗
const deleteTagRef = ref();

const gridColumns = [
  {
    title: "序号",
    key: "index",
    dataIndex: "index",
  },
  {
    title: "标签名称",
    key: "tag_name",
    dataIndex: "tag_name",
  },
  {
    title: "文章数目",
    key: "article_count",
    dataIndex: "article_count",
  },
  {
    title: "操作",
    key: "operate",
    dataIndex: "operate",
    customRender: () => {},
  },
];

onMounted(() => {
  gridData.value = JSON.parse(localStorage.getItem("tagList"));
});

async function fetchData() {
  loadingRef.value = true;
  gridData.value = await api.tag.getTagList();
  localStorage.setItem("tagList", JSON.stringify(gridData.value));
  loadingRef.value = false;
}

// 打开弹窗
function handleDelete(row) {
  visibleDeleteRef.value = true;
  deleteTagRef.value = row;
}

// 新增标签
async function addTagItem() {
  if (tagNameRef.value === "") return; // 表单验证
  visibleAddRef.value = false;
  await api.tag.addTag(tagNameRef.value);
  await fetchData();
  tagNameRef.value = "";
}

// 删除标签
async function deleteTagItem() {
  visibleDeleteRef.value = false;
  const result = await api.tag.deleteTag(deleteTagRef.value.id);
  if (result.success) {
    await fetchData();
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
