<template>
  <div>
    内容正在更新中，敬请期待。
    <br />
    <!-- 文件上传 -->
    <!-- <div class="upload-container">
      <input
        type="file"
        id="coverImg"
        ref="chooseFileRef"
        style="display: none"
        accept="*"
        @change="handleChange"
      />
      <span class="add-icon" @click="chooseCover">
        <svg
          t="1695717093407"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="910"
          width="20"
          height="20"
        >
          <path
            d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
            fill="#666666"
            p-id="911"
          ></path>
        </svg>
      </span>
    </div>
    <div>{{ file?.name }}</div>
    <br />
    <Button @click="handleClick">上传</Button>
    <Button @click="handleMerge">合并</Button>
    <Button @click="handleLink">跳转</Button> -->
    <!-- <Loading v-if="loadingRef" class="loading" /> -->
    <!-- <ProjectCard v-for="item in projectListRef" :key="item.id" :projectObj="item" /> -->
  </div>
</template>

<script setup>
import { inject,onMounted, ref } from "vue";

// import ProjectCard from '../components/ProjectCard.vue';
// import Loading from '../components/uc/Loading.vue';
import {mergeFile,uploadFile} from "@/api/upload";
import Button from "@/components/uc/Button.vue";

// const projectListRef = ref([]);
// const loadingRef = ref(false);
// onMounted(() => {
//   loadingRef.value = true;
//   api.project.getProjectList().then((res) => {
//     projectListRef.value = res;
//     loadingRef.value = false;
//   })
// })

const chooseFileRef = ref(null);
const chunks = ref([]);
const file = ref(null);
const UPLOAD_SIZE = 1024 * 1024;

function chooseCover() {
  chooseFileRef.value.click(); // 触发文件选择弹窗
}

function createFileChunk(file, size = UPLOAD_SIZE) {
  let fileChunkList = [];
  let curTotal = 0;
  let index = 0;
  while (curTotal < file.size) {
    fileChunkList.push({
      chunk: file.slice(curTotal, curTotal + size),
      hash: `${file.name}-${index}`,
    });
    index++;
    curTotal += size;
  }
  return fileChunkList;
}

function handleChange(e) {
  const files = e.target.files;
  if (!files) return;
  chunks.value = createFileChunk(files[0]); // 对 File 进行分片，每个片为一个 Blob 对象
  file.value = files[0];
}

async function handleClick() {
  if (chunks.value.length === 0) return;
  const requestList = chunks.value.map(({chunk, hash}) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('filename', file.value.name);
    return formData;
  }).map((formData) => {
    return uploadFile(formData);
  });
  const results = await Promise.all(requestList); // 响应结果数组
  console.log(results)
  // 假设这里Promise.all请求都成功，后面需要做错误处理。如果有分片上传失败，添加重传机制
  
}

async function handleMerge() {

  if (chunks.value.length > 1) {
    const response = await mergeFile({filename: file.value.name, size: UPLOAD_SIZE});
    console.log(response);
  }
}

function handleLink() {
  // window.location.href = 'https://192.168.1.230:8088/project'
  window.open("https://192.168.1.230:8088/project", "_blank")
}
</script>

<style scoped>
.project-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px 3%;
  margin-top: 20px;
}
.loading {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.upload-container {
  display: inline-block;
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

.add-icon svg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
