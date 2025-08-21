<template>
  <div>
    <Loading v-if="loadingRef" class="loading" />
    <Table v-else title="评论管理" :columns="columns" :data="dataSourceRef">
      <template #bodyCell="{ column, row }">
        <template v-if="column.key === 'avatar'">
          <img :src="row.avatar" />
        </template>
        <template v-else-if="column.key === 'operate'">
          <Button type="link" @click="handleOpenModal(row)">Delete</Button>
        </template>
      </template>
    </Table>
    <Modal v-model:open="visibleRef" title="删除评论" @on-ok="deleteCommentItem">
      <h4>确认删除当前评论吗？</h4>
      <p>评论内容：</p>
      <div :style="{ textIndent: '2em' }">{{ commentRef.commentTxt }}</div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Table from "@/components/uc/Table.vue";
import Button from "@/components/uc/Button.vue";
import Modal from "@/components/uc/Modal.vue";
import Loading from "@/components/uc/Loading.vue";
import api from "@/api";

const columns = [
  {
    dataIndex: "index",
    title: "序号",
  },
  {
    dataIndex: "title",
    title: "评论文章",
  },
  {
    dataIndex: "commentTxt",
    title: "评论内容",
  },
  {
    dataIndex: "nickname",
    title: "评论人",
  },
  {
    key: "avatar",
    dataIndex: "avatar",
    title: "头像",
  },
  {
    dataIndex: "replyNumber",
    title: "回复数",
  },
  {
    dataIndex: "createTime",
    title: "评论时间",
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "删除",
  },
];
const dataSourceRef = ref([]);
const loadingRef = ref(false);
onMounted(() => {
  loadingRef.value = true;
  api.comment.getComments().then((res) => {
    dataSourceRef.value = res.map((item) => {
      return {
        ...item,
        ...item.comment,
      };
    });
    loadingRef.value = false;
  });
});
// 打开删除弹窗
const visibleRef = ref(false);
const commentRef = ref();
function handleOpenModal(comment) {
  visibleRef.value = true;
  commentRef.value = comment;
}
// 删除评论
function deleteCommentItem() {
  // api.comment.deleteComment(commentRef.value.id, commentRef.value.commentId).then((res) => {
  //   console.log(res.message)
  // })
}
</script>

<style scoped>
img {
  width: 50px;
}

.loading {
  position: relative;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}
</style>
