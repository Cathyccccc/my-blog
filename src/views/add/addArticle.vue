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
          <v-md-editor v-model="articleInfo.content" height="400px"></v-md-editor>
        </div>
      </FormItem>
      <FormItem>
        <Button class="mr-3" @click="temporaryStorage">暂存文章</Button>
        <Button type="primary" @click="publishArticle">发布文章</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTheme } from "@/hooks";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
import Select from "@/components/uc/Select.vue";
import Button from "@/components/uc/Button.vue";
import Upload from "@/components/uc/Upload.vue";
import Loading from "@/components/uc/Loading.vue";
import { getTagList, addTag } from "@/api/tag";
import { getArticleById, addArticle, updateArticle } from "@/api/article";
import { getDateTime } from "@/utils/date";
import { getBase64, convertBase64ToFile } from "@/utils/encode";
import { uploadImage, getImage } from "@/api/upload";

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
    getArticleById(id).then((res) => {
      console.log(res)
      article = res
      articleInfo.title = res.title;
      articleInfo.content = res.content;
      articleInfo.tag = res.tag.flatMap(item => item.tag_name);
      getImage(articleInfo.coverImg).then((res) => {
        const arr = articleInfo.coverImg.split("/");
        const filename = arr[arr.length - 1];
        const file = new File([res], filename, { type: res.type });
        fileListRef.value = [file];
      });
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

onBeforeUnmount(() => {
  // 防止页面刷新时丢失数据，缓存文章信息
  // 判断当前页面是否有内容，判断内容是否已缓存：有内容且未缓存需要缓存
  if (
    articleInfo.title || articleInfo.content || articleInfo.coverImg || articleInfo.tag.length
  ) {
    temporaryStorage();
  }
});

// 新增选择
async function handleChange(value) {
  if (tagListRef.value.findIndex((item) => item.value === value) === -1) {
    console.log("新增标签", value);
    // 1.将新的数据（tag）存储到服务器
    await addTag(value);
    // 2.更新本地存储tag
    const result = await getTagList();
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

// 缓存文章
function temporaryStorage() {
  if (fileListRef.value.length > 0) {
    getBase64(fileListRef.value[0], (base64) => {
      articleInfo.coverImg = base64;
      localStorage.setItem("article", JSON.stringify(articleInfo));
    });
  } else {
    articleInfo.coverImg = "";
    localStorage.setItem("article", JSON.stringify(articleInfo));
  }
}

// 发布文章
async function publishArticle() {
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
    const { path } = await uploadImage(formData);
    articleInfo.coverImg = path;
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
  // uploadImage(articleInfo.coverImg).then((res) => {
  //   console.log(res)
  // })
  if (route.matched[0].path === "/editArticle/:id") {
    await updateArticle({...article, ...articleInfo, tag, date});
    loadingRef.value = false;
  } else {
    const scanNumber = 0;
    const commentNumber = 0;
    await addArticle({ ...articleInfo, tag, date, scanNumber, commentNumber });
    loadingRef.value = false;
  }
  articleInfo.title = "";
  articleInfo.content = "";
  articleInfo.coverImg = "";
  articleInfo.tag = "";
  fileChangeStatus.value = false;
  localStorage.removeItem("article"); // 文章发布后清理缓存
  router.push('/manage/articles');
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
  background: transparent;
  border: 1px solid transparent;
  transition: border-color .3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .v-md-editor {
  /* background: transparent; */
  border: 1px solid #fff;
}
</style>
