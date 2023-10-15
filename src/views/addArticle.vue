<template>
  <div class="add-article-container">
    <div class="form-item">
      <label for="title">文章标题</label>
      <input v-model.trim="articleObjRef.title" type="text" id="title">
    </div>
    <div class="form-item">
      <label for="coverImg">文章封面</label>
      <input type="file" id="coverImg" style="display: none;" ref="chooseFileRef" accept="*" @change="showSelectFile">
      <span v-if="!articleObjRef.coverImg" class="add-icon" @click="chooseCover">
        <svg t="1695717093407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="910" width="20" height="20">
          <path
            d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
            fill="#666666" p-id="911"></path>
        </svg>
      </span>
      <div class="img-wrapper" v-else>
        <img :src="articleObjRef.coverImg" alt="" class="cover">
        <svg t="1695872915310" class="delete-icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="971" width="20" height="20" @click="articleObjRef.coverImg = ''">
          <path
            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z"
            fill="#e5e5e5" p-id="972"></path>
          <path
            d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
            p-id="973" fill="#e5e5e5"></path>
        </svg>
      </div>
    </div>
    <div class="form-item">
      <label for="title">文章分类</label>
      <!-- 这里有个问题：失焦的两种情况不能同时？？？ -->
      <Select :list-data="tagListRef" @change-select="onChangeSelect" />
      <!-- <select id="tag-select" multiple>
        <option v-for="item in articleObjRef.tags" :key="item.id" :value="item.tag_name">{{ item.tag_name }}</option>
      </select> -->
    </div>
    <div class="form-item">
      <label for="content">文章内容</label>
      <Editor v-model="articleObjRef.content" id="content" api-key="z9yxdow4c2vjkoulvv8b6dyg7ge1jete9gzqwpi5gj98sv6v" :init="{
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
const route = useRoute()

// 获取标签列表数据
const tagListRef = ref([])
onBeforeMount(() => {
  getTagList().then((res) => {
    tagListRef.value = res.map((item) => {
      return { id: item.id, value: item.tag_name, selected: false }
    });
  })
})

// 选取文章封面
const chooseFileRef = ref(null);
function chooseCover() {
  chooseFileRef.value.click(); // 触发文件选择弹窗
}
// 在页面上显示选取的图片（base64格式）
function showSelectFile(e) {
  console.log(e.target.files)
  const file = e.target.files[0];
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      articleObjRef.value.coverImg = this.result;
    },
    false,
  );
  reader.readAsDataURL(file);
}

// 添加选中标签
function onChangeSelect(id, selected) {
  const index = tagListRef.value.findIndex(item => item.id === id)
  tagListRef.value[index].selected = !selected;
  articleObjRef.value.tags = tagListRef.value.filter(item => item.selected)
}

// 发布文章
const articleObjRef = ref({
  title: '',
  content: '',
  coverImg: '',
  tags: [],
});
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

.add-icon {
  display: inline-block;
  height: 100px;
  width: 100px;
  border: 1px dashed #ddd;
  border-radius: 3px;
  position: relative;
  vertical-align: text-top;
}
.img-wrapper {
  display: inline-block;
  position: relative;
}
.cover {
  height: 100px;
  width: 100px;
  border: 1px dashed #ddd;
  border-radius: 3px;
  object-fit: cover;
  vertical-align: text-top;
}

.add-icon svg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.delete-icon {
  position: relative;
  right: 22px;
  top: 5px;
  cursor: pointer;
}

.delete-icon:hover path {
  fill: #90979e;
}

/* #content {
  z-index: 1;
} */</style>