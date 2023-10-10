<template>
  <div class="comment-card-container">
    <img class="avatar" :src="commentObj.avatar">
    <span class="nickname">{{ commentObj.nickname }}</span>
    <span class="create-time">{{ commentObj.createTime }}</span>
    <div class="right">
      <div class="comment">{{ commentObj.commentTxt }}</div>
      <CommentBox comment-txt="" />
      <button v-show="!isReplay">回复</button>
    </div>
    <div class="reply-wrapper" v-if="commentObj.replayArr">
      <CommentCard is-replay />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
}
</script>

<script setup>
import CommentCard from '../components/CommentCard.vue'
import CommentBox from './CommentBox.vue';

const props = defineProps({
  isReplay: Boolean, // 这里数据不能直接使用Boolean。因为最开始数据为undefined。Boolean(undefined)结果为false
  commentObj: Object,
})
const { commentObj } = props;

function replyComment() {

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