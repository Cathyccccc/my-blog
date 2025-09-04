<template>
  <Loading v-if="loadingRef" />
  <div v-else>
    <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <FormItem label="文章标题" name="title">
        <Input v-model:value.trim="articleInfo.title" />
      </FormItem>
      <FormItem label="文章分类" name="tag">
        <Select
          v-model:value="articleInfo.tag"
          :options="tagListRef"
          mode="tag"
          @change="handleChange"
        />
      </FormItem>
      <FormItem label="文章封面" name="coverImg">
        <Upload v-model:file-list="fileListRef" @change="handleFilesChange" />
      </FormItem>
      <FormItem label="文章内容" name="content">
        <div :class="['editor-wrapper xl:w-[1000px] w-[800px] sm:w-[600px]', theme]">
          <v-md-editor
            v-model="articleInfo.content"
            height="400px"
            :disabled-menus="[]"
            @upload-image="handleUploadImage"
          ></v-md-editor>
        </div>
      </FormItem>
      <FormItem>
        <Button class="mr-3" @click.prevent="temporaryStorage">暂存文章</Button>
        <Button type="primary" @click.prevent="submitArticle">提交文章</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";

import VMdEditor from "@kangc/v-md-editor";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
// highlightjs（代码块高亮）
import hljs from "highlight.js";
import { onMounted,reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import api from "@/api";
import Button from "@/components/uc/Button.vue";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
import Loading from "@/components/uc/Loading.vue";
import Select from "@/components/uc/Select.vue";
import Upload from "@/components/uc/Upload.vue";
import { useTheme } from "@/hooks";
import { getDateTime } from "@/utils/date";
import { convertBase64ToFile,getBase64 } from "@/utils/encode";
// 按需引入语言包
// import json from "highlight.js/lib/languages/json";
// import javascript from "highlight.js/lib/languages/javascript";
// import css from "highlight.js/lib/languages/css";

// hljs.registerLanguage("json", json);
// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("css", css);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const route = useRoute();
const router = useRouter();
const [theme] = useTheme();
const articleInfo = reactive({
  title: "",
  content: "",
  coverImg: "",
  tag: [],
});
const loadingRef = ref(false);
const tagListRef = ref([]);
const fileListRef = ref([]);
const fileChangeStatus = ref(false);
const { id } = route.params;
let article = {}; // 用于存储编辑文章时请求到的文章对象。

// 编辑文章页面需要初始化文章信息；新增文章页面如果有缓存确认是否需要加载缓存
onMounted(() => {
  const data = JSON.parse(localStorage.getItem("tagList"));
  tagListRef.value = data.map((item) => {
    return { value: item.tag_name, label: item.tag_name };
  });
  if (route.matched[0].path === "/editArticle/:id") {
    loadingRef.value = true;
    api.article.getArticleById(id).then((res) => {
      article = res;
      articleInfo.title = res.title;
      articleInfo.content = res.content;
      articleInfo.tag = res.tag.flatMap((item) => item.tag_name);
      articleInfo.coverImg = res.coverImg;
      if (res.coverImg) {
        const pathArr = res.coverImg.split('/static');
        api.upload.getImage(pathArr[1]).then((res) => {
          const arr = articleInfo.coverImg.split("/");
          const filename = arr[arr.length - 1];
          const file = new File([res], filename, { type: res.type });
          fileListRef.value = [file];
        });
      }
      loadingRef.value = false;
    });
  } else {
    const article = JSON.parse(localStorage.getItem("article"));
    if (article) {
      articleInfo.title = article.title;
      articleInfo.content = article.content;
      articleInfo.coverImg = article.coverImg;
      articleInfo.tag = article.tag;
      if (article.coverImg) {
        fileListRef.value[0] = convertBase64ToFile(article.coverImg);
      }
    }
  }
});

// onBeforeUnmount(() => {
//   // 防止页面刷新时丢失数据，缓存文章信息
//   // 判断当前页面是否有内容，判断内容是否已缓存：有内容且未缓存需要缓存
//   // temporaryStorage();
// });

// 新增选择
async function handleChange(value) {
  if (tagListRef.value.findIndex((item) => item.value === value) === -1) {
    // 1.将新的数据（tag）存储到服务器
    await api.tag.addTag(value);
    // 2.更新本地存储tag
    const result = await api.tag.getTagList();
    tagListRef.value = result.map((item) => {
      return { value: item.tag_name, label: item.tag_name };
    });
    localStorage.setItem("tagList", JSON.stringify(result));
  }
}

// 处理文件列表
function handleFilesChange() {
  if (fileListRef.value.length > 0) {
    fileChangeStatus.value = true;
  } else {
    articleInfo.coverImg = "";
  }
}

async function handleUploadImage(event, insertImage, files) {
  const formData = new FormData();
  formData.append("image", files[0]);
  const { path } = await api.upload.uploadImage(formData);
  insertImage({
      url: path,
      // width: 'auto',
      // height: 'auto',
    });
}

// 缓存文章
function temporaryStorage() {
  if (
    !articleInfo.title &&
    !articleInfo.content &&
    !articleInfo.coverImg &&
    !articleInfo.tag.length
  ) {
    alert("没有需要暂存的内容");
    return;
  }
  if (fileListRef.value.length > 0) {
    getBase64(fileListRef.value[0], (base64) => {
      articleInfo.coverImg = base64;
      localStorage.setItem("article", JSON.stringify(articleInfo));
    });
  } else {
    articleInfo.coverImg = "";
    localStorage.setItem("article", JSON.stringify(articleInfo));
  }
  alert("文章已暂存");
}

// 发布文章
async function submitArticle() {
  if (articleInfo.title === "") return;
  if (articleInfo.content === "") return;
  if (!articleInfo.tag.length) return;
  const date = getDateTime(new Date());
  const tagList = JSON.parse(localStorage.getItem("tagList"));
  const tag = tagList.filter((item) => articleInfo.tag.indexOf(item.tag_name) > -1);
  loadingRef.value = true;
  // 第一种 formData（表单形式传递）
  if (fileChangeStatus.value) {
    const formData = new FormData();
    formData.append("coverImg", fileListRef.value[0]);
    const { path } = await api.upload.uploadImage(formData);
    articleInfo.coverImg = path;
  }
  // 第二种 Buffer
  // const reader = new FileReader();
  // reader.onload = function (e) {
  //   api.upload.uploadImage(e.target.result).then((res) => {
  //     console.log(res)
  //   })
  // }
  // reader.readAsArrayBuffer(fileListRef.value[0])
  // 第三种 Base64
  // api.upload.uploadImage(articleInfo.coverImg).then((res) => {
  //   console.log(res)
  // })
  if (route.matched[0].path === "/editArticle/:id") {
    await api.article.updateArticle({ ...article, ...articleInfo, tag, date });
    loadingRef.value = false;
  } else {
    const scanNumber = 0;
    const commentNumber = 0;
    const isPublish = 0;
    await api.article.addArticle({ ...articleInfo, tag, date, scanNumber, commentNumber, isPublish });
    loadingRef.value = false;
  }
  articleInfo.title = "";
  articleInfo.content = "";
  articleInfo.coverImg = "";
  articleInfo.tag = "";
  fileChangeStatus.value = false;
  localStorage.removeItem("article"); // 文章发布后清理缓存
  router.push("/manage/articles");
}
</script>

<style scoped>
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

.editor-wrapper .v-md-editor {
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .v-md-editor {
  background: var(--dark-bg-color);
  border: 1px solid #fff;
}
</style>
