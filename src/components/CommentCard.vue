<template>
  <div class="comment-card-container">
    <img class="avatar" :src="commentObj.avatar">
    <span class="nickname">{{ commentObj.nickname }}</span>
    <span class="create-time">{{ commentObj.createTime }}</span>
    <div class="right">
      <div class="comment">{{ commentObj.commentTxt }}</div>
      <!-- <Transition name="button">
        <Button size="small" shape="round" v-show="!isReplyRef" class="reply-button" @click="replyComment">回复</Button>
      </Transition>
      <Transition name="comment">
        <CommentBox v-show="isReplyRef" v-model:commentTxt="commentTxtRef" @publish="publishComment" />
      </Transition> -->
    </div>
    <!-- <div class="reply-wrapper" v-if="commentObj.replyArr">
      <CommentCard v-for="item in commentObj.replyArr" :key="item.replyId" :comment-obj="item" :replyArr="replyArr"
        :article-id="articleId" :comment-id="commentId || commentObj.commentId" @updateData="$emit('updateData')" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
}
</script>

<script setup>
import { ref } from 'vue'
import CommentCard from '../components/CommentCard.vue'
import CommentBox from './CommentBox.vue';
import Button from './uc/Button.vue';
import { getDateTime } from '../utils/date';
import { getRandomName } from '../utils/random';
import api from "@/api";

const props = defineProps({
  isReply: Boolean,
  commentObj: Object,
  articleId: String,
  commentId: {
    type: String,
    default: undefined,
  },
  replyArr: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['update:commentObj'])
const { commentObj } = props;
// console.log(props.commentId, props.replyArr)
const isReplyRef = ref(false)

function replyComment() {
  isReplyRef.value = true;
}

async function fetchData() {
  const res = await getArticleById(id);
  if (res.comments.length) {
    res.comments = res.comments.map((item) => {
      return {
        ...item,
        avatar: getRandomHashAvatar(item.commentId),
        replyArr: item.replyArr ? item.replyArr.map((i) => {
          return {
            ...i,
            avatar: getRandomHashAvatar(i.replyId),
          }
        }) : [],
      }
    })
  }
  return res;
}
const commentTxtRef = ref('')
async function publishComment() {
  const nickname = getRandomName(2);
  const replyObj = {
    commentTxt: commentTxtRef.value,
    nickname,
    createTime: getDateTime(),
    to: commentObj.commentId,
  }
  // 接口+清空数据
  // const comment = {
  //   commentId: commentObj.commentId,
  //   commentTxt: commentObj.commentTxt,
  //   nickname: commentObj.nickname,
  //   createTime: commentObj.createTime,
  //   to: commentObj.commentId
  // };

  // console.log(comment, replyObj)
  await api.comment.addComment(props.articleId, props.commentId || commentObj.commentId, replyObj, props.replyArr)
  commentTxtRef.value = '';
  isReplyRef.value = false;
  // const data = await fetchData();
  emit('updateData');
}
</script>

<style scoped>
.comment-card-container {
  background-color: #fff;
  padding: 10px 0;
}

.avatar {
  width: 32px;
  height: 32px;
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

.reply-button {
  margin-top: 5px;
}

.reply-wrapper {
  margin-left: 20px;
  margin-top: 5px;
  transform: scale(0.95);
  border: 2px solid #f5f5f5;
  border-radius: 5px;
}

.button-enter-active,
.button-leave-active {
  transition: all .3s;
}

.button-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.button-leave-to {
  opacity: 0;
}

.button-leave-from,
.button-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.comment-enter-active {
  animation: toggle .3s ease-out;
  transform-origin: 0 -5px;
}

.comment-leave-active {
  animation: toggle .3s reverse ease-out;
  transform-origin: 0 -5px;
}

@keyframes toggle {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}</style>