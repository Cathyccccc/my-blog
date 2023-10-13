<template>
  <Table :data="gridData" :columns="gridColumns" :filter-key="searchQuery" title="标签管理">
    <template #action>
      <Button>新增标签</Button>
    </template>
    <template #bodyCell="{ column, row }">
      <template v-if="column.key === 'operate'">
        <Button type="link" @click="deleteTagItem(row)" disabled>Delete</Button>
      </template>
    </template>
  </Table>
  <Modal v-model:open="visibleRef" title="新增标签">
    <FormItem label="标签名称" name="tag_name">
      <Input />
    </FormItem>
  </Modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
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

const visibleRef = ref(false); // 控制 Modal弹窗
// 删除标签项
function deleteTagItem(row) {
  visibleRef.value = true;
  console.log(row)
}

</script>

<style scoped>
</style>