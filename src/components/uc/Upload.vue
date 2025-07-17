<template>
  <div class="upload-container" v-if="fileList.length === 0|| multiple">
    <input type="file" id="coverImg" ref="chooseFileRef" style="display: none;" accept="image/*" @change="handleChange">
    <span class="add-icon" @click="chooseCover">
      <svg t="1695717093407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="910" width="20" height="20">
        <path
          d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
          fill="#666666" p-id="911"></path>
      </svg>
    </span>
  </div>
  <div class="img-list" >
    <div class="img-list-item" v-for="(file, index) in fileList" :key="index">
      <div class="img-wrapper" v-img="file">
      </div>
      <svg t="1695872915310" class="delete-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="971" width="20" height="20" @click="deleteImg(index)">
        <path
          d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z"
          fill="#e5e5e5" p-id="972"></path>
        <path
          d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
          p-id="973" fill="#e5e5e5"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['fileList', 'multiple'])
const emits = defineEmits(['change', 'update:fileList']);
// 注册v-img自定义指令
const vImg = {
  beforeMount(el, binding, vnode, prevVnode) {
    // console.log(el, binding, vnode, prevVnode)
    // console.log(binding.value)
    showSelectFile(binding.value, el)
  },
  // beforeUpdate(el, binding) {
  //   if (props.multiple) {
  //     const imgs = el.querySelectorAll('img');
  //     el.removeChild(imgs);
  //     console.log(binding.value)
  //     // showSelectFile(binding.value, el)
  //   }
  // }
}
// 选取文章封面
const chooseFileRef = ref(null);
function chooseCover() {
  chooseFileRef.value.click(); // 触发文件选择弹窗
}
function handleChange(e) {
  emits('update:fileList', [...e.target.files])
  emits('change', e)
}
// 在页面上显示选取的图片（base64格式）
function showSelectFile(file, el) {
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      const image = new Image();
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      el.appendChild(image);
    },
    false,
  );
  reader.readAsDataURL(file);
}

function deleteImg(index) {
  const list = props.fileList.filter((item, idx) => idx !== index)
  emits('update:fileList', list)
  emits('change')
}
</script>

<style scoped>
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

.img-list {
  height: 100px;
  display: inline-block;
  column-gap: 5px;
  vertical-align: text-top;
}
.img-list-item {
  width: 100px;
  height: 100px;
  display: inline-block;
  position: relative;
}

.img-wrapper {
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px solid #ddd;
}

.img-wrapper img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}

.delete-icon {
  position: absolute;
  right: 0px;
  top: 4px;
  cursor: pointer;
}

.delete-icon:hover path {
  fill: #90979e;
}
</style>