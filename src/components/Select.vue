<template>
  <div class="select-container" @click.prevent="toggleSelectList">
    <div class="selector">
      <div v-for="item in selectedList" :key="item.id" class="selected-item">
        <span>{{ item.value }}</span>
        <svg @click="removeSelect(item.id, item.selected)" t="1695718016457" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="940" width="20" height="20"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="941"></path></svg>
      </div>
      <input type="text" ref="inputRef" @focus="handleFocus" @blur="handleBlur">
    </div>
    <ul v-if="isShow" class="select-list">
      <li v-for="item in listData" :key="item.id" @click="changeSelect(item.id, item.selected)">{{ item.value }}</li>
    </ul>
  </div>
</template>
<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
  listData: {
    type: Array,
    default: []
  },
})
// const { listData } = props; // props解构，数据会失去响应性。因此官方建议直接通过prop.来使用数据，或通过toRef()和toRefs()将数据转为响应式
const emit = defineEmits(['changeSelect']);
const inputRef = ref(null);
const isShow = ref(false); // 控制是否显示下拉选项列表

// 计算属性
// 计算选中的标签数据
const selectedList = computed(() => {
  const selectedList = props.listData.filter(item => item.selected)
  return selectedList
})

// 添加选中标签
function changeSelect(id, selected) {
  if (selected) return;
  emit('changeSelect', id, selected);
}
// 移除选中标签
function removeSelect(id, selected) {
  emit('changeSelect', id, selected);
}
// 展示/隐藏标签列表
function toggleSelectList() {
  isShow.value = !isShow.value;
  inputRef.value.focus();
}
function handleFocus() {
  
}
// // 处理input框失焦
function handleBlur() {

}
</script>

<style scoped>
.select-container {
  display: inline-block;
  position: relative;
}
.selector {
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 200px;
  padding: 1px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.selected-item {
  background-color: #c3e7ff;
  border-radius: 3px;
  font-size: 14px;
  height: 22px;
  box-sizing: border-box;
  padding: 3px;
  display: flex;
  align-items: center;
  margin: 1px 2px;
}
.selected-item svg {
  width: 14px;
  height: 14px;
  margin-left: 5px;
  cursor: pointer;
}
.selected-item svg path {
  fill: #b5b5b5;
  transition: all 0.3s;
}
.selected-item svg:hover path {
  fill: #000;
}

input {
  outline: none;
  border: none;
  width: 4px;
  height: 24px;
  line-height: 24px;
  padding: 0;
  /* 控制focus时闪烁线的长度，font-size越大，线越长 */
  font-size: 16px;
  margin-left: 2px;
}
.select-list {
  width: 200px;
  box-sizing: border-box;
  padding: 3px 0;
  border-radius: 3px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  margin-top: 3px;
  transition: all .3s;
  z-index: 99;
}
.select-list li {
  font-size: 14px;
  height: 30px;
  line-height: 24px;
  padding: 3px 5px;
  box-sizing: border-box;
  transition: all .3s;
  cursor: pointer;
}
.select-list li:hover {
  background-color: #F7F7F7;
}
</style>