<template>
  <Loading v-if="loadingRef" class="loading" />
  <Table v-else :data="gridData" :columns="gridColumns" :filter-key="searchQuery" title="标签管理">
    <template #action>
      <Button @click="visibleAddRef = true">新增标签</Button>
    </template>
    <template #bodyCell="{ column, row }">
      <template v-if="column.key === 'operate'">
        <Button type="link" @click="handleDelete(row)">Delete</Button>
      </template>
    </template>
  </Table>
  <Modal v-model:open="visibleAddRef" title="新增标签" @on-ok="addTagItem">
    <FormItem label="标签名称" name="tag_name">
      <Input v-model.trim="tagNameRef" />
    </FormItem>
  </Modal>
  <Modal v-model:open="visibleDeleteRef" title="删除标签" @on-ok="deleteTagItem">
    确认删除标签
    <TagList :tag-list-data="[deleteTagRef.tag_name]" />
    吗？
  </Modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
import Loading from '../components/Loading.vue';
import TagList from '../components/TagList.vue';
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
const loadingRef = ref(false);
onMounted(() => {
  loadingRef.value = true;
  getTagList().then((res) => {
    gridData.value = res;
    loadingRef.value = false;
  })
})

const visibleAddRef = ref(false); // 控制新增 Modal弹窗
const visibleDeleteRef = ref(false); // 控制删除 Modal弹窗
// 打开弹窗
const deleteTagRef = ref();
function handleDelete(row) {
  console.log('handle delete')
  visibleDeleteRef.value = true;
  deleteTagRef.value = row;
}
// 新增标签
const tagNameRef = ref('');
function addTagItem() {
  console.log(tagNameRef.value)
  if (tagNameRef.value === '') return; // 表单验证
  console.log('新增标签', tagNameRef.value)
  visibleAddRef.value = false;
}
// 删除标签项
function deleteTagItem() {
  console.log('删除标签', deleteTagRef.value)
  visibleDeleteRef.value = false;
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

