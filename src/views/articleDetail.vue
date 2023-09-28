<template>
  <div class="article-detail-container">
    <!-- 文章标题等信息 -->
    <h2 class="article-title">{{ article.title }}</h2>
    <div class="article-bar">
      <span>发布日期：{{ article.date }}</span>
      <span>浏览量：{{ article.scanNumber }}</span>
      <span>评论数：{{ article.commentNumber }}</span>
    </div>
    <!-- 文章内容 -->
    <div class="editor-wrapper">
      <Editor v-model="editorTxt" api-key="z9yxdow4c2vjkoulvv8b6dyg7ge1jete9gzqwpi5gj98sv6v" :init="{
        // readonly: true, // 只读（不起作用）
        editable_root: false, // 设置为只读
        // placeholder: '请输入内容...', // 设置placeholder
        height: 600, // 设置editor高度，包括 menu bar, toolbars, status bar
        // width: 400, // 设置editor宽度
        resize: false, // 手动调节editor的宽度和高度。值：true/false/'both'。为true时只可以手动调节高度。
        // min_height: 400, // 设置resize的最小高度
        // max_height: 800, // 设置resize的最大高度
        // min_width: 400, // 设置resize的最小宽度
        // max_width: 600, // 设置resize的最大宽度
        // promotion: true, // 显示升级插件按钮
        // plugins: '', // 在menu bar中添加指定的插件，可以为字符串/数组，字符串用空格分隔。
        // external_plugins: {}, // 添加外部插件
        // setup: (editor) => {}, // 在editor实例被渲染前执行
        // init_instance_callback: (editor) => {}, // 在editor实例每次被初始化时执行
        // auto_focus: 'el_id', // 自动聚焦，值为editor实例的id
        // inline: true, // 设置editor为行内模式（直接在页面上显示内容，不显示边框和操作台。点击一行时显示边框和操作台）
        toolbar: false, // 隐藏工具栏
        menubar: false, // 隐藏菜单栏
        statusbar: false, // 隐藏底部状态栏
        content_css: 'http://127.0.0.1:5173/css/editor.css', // 设置内部样式。规定的6种样式只在classic mode下有效
      }" />
      <button v-if="true" @click="editArticle">修改文章</button>
    </div>
    <!-- 评论发布框 -->
    <div class="comment-box">
      <CommentBox :commentTxt="commentTxt" @changeCommentTxt="commentTxt = $event" @publishComment="publishComment" />
    </div>
    <!-- 历史评论列表 -->
    <div class="comment-list-wrapper">
      <CommentCard :is-replay="false" v-for="(item, index) in article.comments" :key="index" :commentObj="item" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticleById } from '/src/api/article';
import Editor from '@tinymce/tinymce-vue';
import CommentCard from '../components/CommentCard.vue';
import CommentBox from '../components/CommentBox.vue';

const editorTxt = ref('<p>123</p><h1>title</h1><a href="http://www.baidu.com">百度</a>');
const route = useRoute()
const { id } = route.params;
const article = ref({});
const commentTxt = ref('');
onBeforeMount(() => {
  getArticleById(id).then((res) => {
    article.value = res;
  })
})
// 发布评论
function publishComment() {
  console.log('发布评论')
}
// 修改文章（权限）
const router = useRouter();
function editArticle() {
  router.push({path: '/addArticle', params: {status: 'edit'}})
}
</script>

<style scoped>
.article-detail-container {
  background: #FFF;
  padding: 20px;
  box-sizing: border-box;
}

.article-title {
  font-size: 26px;
  letter-spacing: 1px;
  margin: 0;
}

.article-bar span {
  display: inline-block;
  font-size: 12px;
  color: #888;
  margin-right: 15px;
}

.editor-wrapper {
  margin: 20px 0;
}

/* .avatar {
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 10px;
  vertical-align: top;
} */



.comment-list-wrapper,
.comment-box {
  border-radius: 5px;
  background-color: #f8f8f8;
  padding: 5px;
  border-radius: 3px;
}

.comment-box {
  position: relative;
  margin-bottom: 5px;
  height: 200px;
}
</style>