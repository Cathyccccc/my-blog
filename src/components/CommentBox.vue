<template>
  <div>
    <textarea :value="commentTxt" maxlength="200" rows="10" placeholder="write down your points ..."
      @change="$emit('update:commentTxt', $event.target.value)" />
    <span class="comment-length">{{ commentTxt.length }}/200</span>
    <Button type="primary" size="small" @click="publishComment">发布</Button>
  </div>
</template>

<script setup>
import Button from './Button.vue';
const props = defineProps({
  commentTxt: String,
})
const emit = defineEmits(['update:commentTxt', 'publishComment'])
function publishComment() {
  if (!props.commentTxt) return; // 这里commentTxt不能解构使用，否则失去响应性，就是初始状态（空字符串）
  emit('publishComment')
}
</script>

<style scoped>
textarea {
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  border: 1px solid #eee;
}

textarea::placeholder {
  color: #55BBFF;
  font-weight: 600;
}

textarea:-moz-placeholder {
  color: #55BBFF;
  font-weight: 600;
}

textarea:-ms-input-placeholder {
  color: #55BBFF;
  font-weight: 600;
}

.comment-length {
  position: absolute;
  right: 15px;
  bottom: 45px;
  color: #ccc;
  font-size: 14px;
}
</style>