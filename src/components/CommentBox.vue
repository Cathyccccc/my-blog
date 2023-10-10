<template>
  <textarea :value="commentTxt" maxlength="200" rows="10" placeholder="write down your points ..." @input="$emit('changeCommentTxt', e.target.value)" />
  <span class="comment-length">{{ commentTxt.length }}/200</span>
  <button @click="publishComment">发布</button>
</template>

<script setup>
const props = defineProps({
  commentTxt: String,
})
const {commentTxt} = props;
const emit = defineEmits({
  changeCommentTxt(commentTxt) {
    return Boolean(commentTxt);
  },
  publishComment(commentTxt) {
    return Boolean(commentTxt);
  }
})
function publishComment() {
  if (!commentTxt) return;
  emit('publishComment', commentTxt);
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

button {
  transform: translateY(-20px);
}
</style>