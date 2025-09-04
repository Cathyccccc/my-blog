<template>
  <div class="comment-box-container">
    <Textarea :value="commentTxt" maxlength="200" rows="7" placeholder="write down your points ..." @change="$emit('update:commentTxt', $event)" />
    <span class="comment-length">{{ commentTxt.length }}/200</span>
    <Button type="primary" size="small" shape="round" class="button" @click="$emit('publish')">发布</Button>
  </div>
</template>

<script setup>
import Textarea from './Textarea.vue';
import Button from './uc/Button.vue';

const props = defineProps({
  commentTxt: String,
})
defineEmits(['update:commentTxt', 'publish']);
</script>

<style scoped>
.comment-box-container {
  position: relative;
  height: 190px;
}
.comment-length {
  position: absolute;
  right: 15px;
  bottom: 35px;
  color: #ccc;
  font-size: 14px;
}
.button {
  position: absolute;
  right: 10px;
  bottom: 0;
}
</style>