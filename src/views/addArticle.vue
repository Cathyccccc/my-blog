<template>
  <div class="add-article-container">
    <Loading v-if="loadingRef" class="loading" />
    <Form v-else :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
      <FormItem label="文章标题" name="title">
        <Input v-model:value.trim="articleObjRef.title" />
      </FormItem>
      <FormItem label="文章封面" name="coverImg">
        <Upload v-model:file-list="fileListRef" @change="handleFilesChange" />
      </FormItem>
      <FormItem label="文章分类" name="tag">
        <Select v-model:value="articleObjRef.tag" :options="tagListRef" />
      </FormItem>
      <FormItem label="文章内容" name="content">
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
      </FormItem>
      <FormItem>
        <Button type="primary" @click="publishArticle">发布文章</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from '../components/Form.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
import Editor from '@tinymce/tinymce-vue';
import Select from '../components/Select.vue';
import Button from '../components/Button.vue';
import Upload from '../components/Upload.vue';
import Loading from '../components/Loading.vue';
import { getTagList } from '../api/tag';
import { getArticleById, addArticle, updateArticle } from '../api/article';
import { getDateTime } from '../utils/date';
import { uploadImage, getImage } from '../api/upload';

const route = useRoute();
const { id } = route.params;
const articleObjRef = ref({
  title: '',
  content: '',
  coverImg: '',
  tag: '',
});
const loadingRef = ref(false);
onMounted(() => {
  if (route.matched[0].path === '/editArticle/:id') {
    loadingRef.value = true;
    getArticleById(id).then((res) => {
      res.tag = res.tag[0].id;
      articleObjRef.value = res;
      getImage(articleObjRef.value.coverImg).then((res) => {
        const arr = articleObjRef.value.coverImg.split('/');
        const filename = arr[arr.length - 1];
        const file = new File([res], filename, {type: res.type});
        fileListRef.value = [file];
      })
      loadingRef.value = false;
    })
  }
})

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
const fileChangeStatus = ref(false);
function handleFilesChange() {
  if (fileListRef.value.length > 0) {
    fileChangeStatus.value = true;
  } else {
    articleObjRef.value.coverImg = '';
  }
}
// 发布文章
const router = useRouter();
async function publishArticle() {
  if (articleObjRef.value.title === '') return;
  if (articleObjRef.value.content === '') return;
  if (!articleObjRef.value.tag.length) return;
  const date = getDateTime(new Date());
  const tag = tagListRef.value.filter(item => item.value === articleObjRef.value.tag)
    .map(item => {
      return {
        id: articleObjRef.value.tag,
        tag_name: item.label,
      }
    });
  loadingRef.value = true;
  // 第一种 formData（表单形式传递）
  if (fileChangeStatus) {
    const formData = new FormData();
    formData.append('coverImg', fileListRef.value[0])
    const { path } = await uploadImage(formData);
    articleObjRef.value.coverImg = path;
  }
  // 第二种 Buffer
  // const reader = new FileReader();
  // reader.onload = function (e) {
  //   uploadImage(e.target.result).then((res) => {
  //     console.log(res)
  //   })
  // }
  // reader.readAsArrayBuffer(fileListRef.value[0])
  // 第三种 Base64
  // uploadImage(articleObjRef.value.coverImg).then((res) => {
  //   console.log(res)
  // })
  if (route.matched[0].path === '/editArticle/:id') {
    await updateArticle({...articleObjRef.value, tag, date});
    loadingRef.value = false;
  } else {
    const scanNumber = 0;
    const commentNumber = 0;
    await addArticle({ ...articleObjRef.value, tag, date, scanNumber, commentNumber });
    loadingRef.value = false;
  }
  articleObjRef.value = {
    title: '',
    content: '',
    coverImg: '',
    tag: '',
  }
  fileChangeStatus.value = false;
  router.back()
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
.loading {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}
</style>