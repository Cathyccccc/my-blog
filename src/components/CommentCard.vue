<template>
  <div class="comment-card-container">
    <img class="avatar" :src="commentObj.avatar">
    <span class="nickname">{{ commentObj.nickname }}</span>
    <span class="create-time">{{ commentObj.createTime }}</span>
    <div class="right">
      <div class="comment">{{ commentObj.commentTxt }}</div>
      <Button size="small" v-show="!isReplyRef" @click="replyComment">回复</Button>
      <CommentBox v-show="isReplyRef" v-model:commentTxt="commentTxtRef" @publish-comment="handlePublishComment" />
    </div>
    <div class="reply-wrapper" v-if="commentObj.replyArr">
      <CommentCard is-reply />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
}
</script>

<script setup>
import {ref} from 'vue'
import CommentCard from '../components/CommentCard.vue'
import CommentBox from './CommentBox.vue';
import Button from './Button.vue';
const props = defineProps({
  // isReply: Boolean,
  commentObj: Object,
})
const { commentObj } = props;
// console.log(props.isReply)
const isReplyRef = ref(false)

function replyComment() {
  isReplyRef.value = true
}
const commentTxtRef = ref('')
function handlePublishComment() {
  console.log('发布评论', commentTxtRef.value)
  const replyObj = {

  }
  // 下面这部分应该添加到后台
  if (commentObj['replyArr']) {
    commentObj['replyArr'].push({})
  } else {
    
  }
  // 接口+清空数据
}
</script>

<style scoped>
.comment-card-container {
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.avatar {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 10px;
  vertical-align: middle;
}

.nickname {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
}

.right {
  margin-left: 55px;
}

.comment {
  font-size: 14px;
  letter-spacing: 0.05em;
  position: relative;
}

.create-time {
  margin-left: 20px;
  font-size: 13px;
  color: #888;
}

.reply-wrapper {
  margin-left: 20px;
  transform: scale(0.95);
  border: 2px solid #f5f5f5;
  border-radius: 5px;
}
</style>