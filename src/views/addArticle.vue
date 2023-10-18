<template>
  <div class="add-article-container">
    <div class="form-item">
      <label for="title">文章标题</label>
      <input v-model.trim="articleObjRef.title" type="text" id="title">
    </div>
    <div class="form-item">
      <label for="coverImg">文章封面</label>
      <Upload v-model:file-list="fileListRef" @change="handleFilesChange" />
    </div>
    <div class="form-item">
      <label for="title">文章分类</label>
      <Select v-model:value="articleObjRef.tags" :options="tagListRef" mode="multiple" />
    </div>
    <div class="form-item">
      <label for="content">文章内容</label>
      <Editor v-model="articleObjRef.content" id="content" api-key="z9yxdow4c2vjkoulvv8b6dyg7ge1jete9gzqwpi5gj98sv6v"
        :init="{
          placeholder: '请输入内容...', // 设置placeholder
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
          toolbar: true, // 显示工具栏
          menubar: true, // 显示菜单栏
          statusbar: true, // 显示底部状态栏
          content_css: 'http://127.0.0.1:5173/css/editor.css', // 设置内部样式。规定的6种样式只在classic mode下有效
        }" />
    </div>
    <div class="form-item">
      <Button type="primary" @click="publishArticle">发布文章</Button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import Editor from '@tinymce/tinymce-vue';
import { getTagList } from '../api/tag';
import Select from '../components/Select.vue';
import Button from '../components/Button.vue';
import Upload from '../components/Upload.vue';
import { getBase64 } from '../utils/encode';

const route = useRoute();
console.log(route)

const articleObjRef = ref({
  title: '',
  content: '',
  coverImg: '',
  tags: [],
});
// 获取标签列表数据
const tagListRef = ref([])
onBeforeMount(() => {
  getTagList().then((res) => {
    tagListRef.value = res.map((item) => {
      return { value: item.id, label: item.tag_name, selected: false }
    });
  })
})
// 处理文件列表
const fileListRef = ref([]);
function handleFilesChange() {
  console.log('处理所有file', fileListRef.value)
  if (fileListRef.value.length > 0) {
    articleObjRef.value.coverImg = getBase64(fileListRef.value)
  } else {
    articleObjRef.value.coverImg = '';
  }
}
// 发布文章
function publishArticle() {
  if (articleObjRef.value.title === '') return;
  if (articleObjRef.value.content === '') return;
  if (!articleObjRef.value.tags.length) return;
  console.log('发布文章', articleObjRef.value)
  // 发布文章接口调用
  // 清空表单
}
</script>

<style scoped>
.add-article-container {
  background: #FFF;
  padding: 20px;
  box-sizing: border-box;
}

.form-item {
  min-height: 32px;
  margin-bottom: 10px;
}

.add-article-container label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  line-height: 32px;
}

input[type="text"] {
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  height: 32px;
  width: 300px;
  padding: 2px 6px;
  box-sizing: border-box;
  color: #616161;
}

</style>