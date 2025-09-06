<template>
  <div>
    <Table :columns="articleColumns" :data="dataSourceRef" title="文章管理">
      <template #header>
        <Button @click="$router.push('/manage/addArticle')">新增文章</Button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.key === 'coverImg'">
          <img v-if="row.coverImg" class="object-contain h-12" :src="row.coverImg" />
          <div v-else class="inline-block p-2 bg-gray-50 dark:bg-line">
            <svg
              t="1752479314026"
              class="w-8 h-8"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2589"
            >
              <path
                d="M85.312 85.312h853.376v853.376H85.312V85.312z m85.376 768h579.648L384 
              487.04l-213.312 213.376v152.96z m682.624-17.664V170.688H170.688v408.96L384 
              366.336l469.312 469.312z m-179.328-526.336a42.688 42.688 0 1 0 0 85.376 42.688 
              42.688 0 0 0 0-85.376z m-128 42.688a128 128 0 1 1 256 0 128 128 0 0 1-256 0z"
                p-id="2590"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </template>
        <template v-else-if="column.key === 'tag'">
          <Tag
            bordered
            class="mr-1"
            v-for="item in row.tag"
            :key="item.id"
            >{{ item.tag_name }}</Tag
          >
        </template>
        <template v-else-if="column.key === 'isPublish'">
          <Switch :checked="Boolean(row.isPublish)" @change="(value) => handleSwitchChange(row, value)" />
        </template>
        <template v-else-if="column.key === 'operate'">
          <div class="operate-list">
            <Button type="link" @click="$router.push({ path: `/manage/editArticle/${row.id}` })"
              >Edit</Button
            >
            <Button type="link" @click="handleModalOpen(row)">Delete</Button>
          </div>
        </template>
      </template>
    </Table>
    <Modal v-model:open="visibleRef" title="删除文章" @on-ok="deleteArticleItem">
      确认删除标题为【{{ articleRef.title }}】的文章吗？
    </Modal>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

import api from "@/api";
import Button from "@/components/uc/Button.vue";
import Modal from "@/components/uc/Modal.vue";
import Switch from "@/components/uc/Switch.vue";
import Table from "@/components/uc/Table.vue";
import Tag from "@/components/uc/Tag.vue";
import { articleColumns } from "@/utils/constant";

const dataSourceRef = ref([]);
const tagListRef = ref([]);
const visibleRef = ref(false);
const articleRef = ref();

onMounted(async () => {
  await fetchData();
  tagListRef.value = await api.tag.getTagList();
});

async function fetchData() {
  const result = await api.article.getArticleList({ page: 1, pageSize: 10, isPublish: 0 });
  dataSourceRef.value = result.list;
}

function handleModalOpen(article) {
  visibleRef.value = true;
  articleRef.value = article;
}
// 删除文章
async function deleteArticleItem() {
  visibleRef.value = false;
  await api.article.deleteArticle(articleRef.value.id);
  await fetchData();
}

// 发布/撤回发布文章
async function handleSwitchChange(article, value) {
  article.isPublish = Number(value)
  await api.article.updateArticle(article)
}

</script>
