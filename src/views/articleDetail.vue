<template>
  <Loading v-if="loadingRef" />
  <div v-else class="mr-2">
    <!-- 文章标题等信息 -->
    <div
      class="px-6 pt-4 pb-2 bg-linear-to-b from-gray-100 dark:from-gray-900 transition from-30% to-white dark:to-[--dark-bg-color]"
    >
      <h3 class="text-title-color-switch text-3xl pb-2">{{ articleRef?.title }}</h3>
      <div class="text-xs text-gray-400">
        <span class="mr-3">发布日期：{{ articleRef?.date }}</span>
        <span class="mr-3">浏览量：{{ articleRef?.scanNumber }}</span>
        <!-- <span class="mr-3">评论数：{{ article.commentNumber }}</span> -->
      </div>
    </div>
    <!-- 文章内容 -->
    <div class="editor-wrapper" :class="{ 'dark-mode': theme === 'dark' }">
      <!-- <v-md-editor :model-value="articleRef?.content" mode="preview"></v-md-editor> -->
      <div class="markdown-body p-4 box-border" v-html="renderedMarkdown"></div>
    </div>
    <!-- <h4>评论</h4> -->
    <!-- 评论发布框 -->
    <!-- <div class="comment-box">
      <CommentBox v-model:commentTxt="commentTxt" @changeCommentTxt="commentTxt = $event" @publish="publishComment" />
    </div> -->
    <!-- 历史评论列表 -->
    <!-- <div class="comment-list-wrapper" v-if="article.comments && article.comments.length">
      <CommentCard v-for="item in article.comments" :key="item.commentId" :commentObj="item" :article-id="article.id"
        :reply-arr="article.comments.replyArr" @updataData="fetchData" />
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "@/hooks";
import api from "@/api";
import Loading from "@/components/uc/Loading.vue";
import MarkdownIt from "markdown-it";
import "github-markdown-css";
// import CommentCard from "../components/CommentCard.vue";
// import CommentBox from "../components/CommentBox.vue";
// import { getDateTime } from "../utils/date";
// import { getRandomName, getRandomHashAvatar } from "../utils/random";

const mdIt = new MarkdownIt();
const route = useRoute();
const [theme] = useTheme();
const loadingRef = ref(false);
const articleRef = ref(null); // 如果这里使用null，template中需要使用?.来读取对象属性值
const renderedMarkdown = ref(null);
// const commentTxt = ref("");

onMounted(() => {
  fetchData();
});

watch(
  () => route.params.id,
  () => {
    fetchData();
  }
);

async function fetchData() {
  loadingRef.value = true;
  const res = await api.article.getArticleById(route.params.id);
  //   if (res.comments.length) {
  //     res.comments = res.comments.map((item) => {
  //       return {
  //         ...item,
  //         avatar: getRandomHashAvatar(item.commentId),
  //         replyArr: item.replyArr
  //           ? item.replyArr.map((i) => {
  //               return {
  //                 ...i,
  //                 avatar: getRandomHashAvatar(i.replyId),
  //               };
  //             })
  //           : [],
  //       };
  //     });
  //   }
  articleRef.value = res;
  renderedMarkdown.value = mdIt.render(res.content);
  loadingRef.value = false;
}

// 发布评论
// async function publishComment() {
//   const nickname = getRandomName(2);
//   const comment = {
//     commentTxt: commentTxt.value,
//     nickname,
//     createTime: getDateTime(),
//   };
//   await addComment(article.value.id, undefined, comment);
//   commentTxt.value = "";
//   await fetchData();
//   article.value.coment++;
//   await updateArticle(article);
// }
</script>

<style scoped>
/* :global(.v-md-editor) {
  background: #000;
} */
.editor-wrapper .markdown-body {
  background: #fff;
  transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode .markdown-body {
  background-color: var(--dark-bg-color);
  color: var(--dark-text-base-color);
}

@media (max-width: 768px) and (min-width: 640px) {
  .markdown-body {
    width: 640px;
  }
}

@media (max-width: 980px) and (min-width: 768px) {
  .markdown-body {
    width: 760px;
  }
}

@media (max-width: 1024px) and (min-width: 980px) {
  .markdown-body {
    width: 980px;
  }
}

@media (max-width: 1240px) and (min-width: 1024px) {
  .markdown-body {
    width: 600px;
  }
}

@media (max-width: 1300px) and (min-width: 1240px) {
  .markdown-body {
    width: 700px;
  }
}
@media (min-width: 1300px) {
  .markdown-body {
    width: 800px;
  }
}
</style>
