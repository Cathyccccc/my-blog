<template>
  <div class="article-card">
    <div class="card-top">
      <div class="article-img">
        <img :src="article.coverImg" alt="" >
      </div>
      <div class="article-content">
        <h3 class="title">{{article.title}}</h3>
        <div class="description">{{article.content}}</div>
      </div>
    </div>
    <div class="card-bottom">
      <div class="tag-list">
        <span class="tag-item" v-for="(t, index) in article.tags" :key="t" :style="{backgroundColor: gradient[index]}">{{ t }}</span>
      </div>
      <div class="numbers">
        <span>浏览数：{{ article.scanNumber }}</span>
        <span>评论数：{{ article.commentNumber }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { gradient } from '/public/js/constant';

const props = defineProps({
  article: Object,
})
</script>

<style scoped>
.article-card {
  width: 100%;
  /* height: 150px; */
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(100, 100, 100, .1);
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 18px 20px;
  box-sizing: border-box;
  transition: all .5s;
  cursor: pointer;
}

.article-card:hover {
  /* transform: scale(1.005); */
  box-shadow: 1px 2px 30px rgba(50, 50, 50, .2);
}

.card-top,
.card-bottom {
  display: flex;
  justify-content: space-between;
}

.card-bottom {
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
}
.tag-list {
  overflow: hidden;
}

.article-img {
  width: 200px;
  height: 115px;
  background: #ddd;
  border-radius: 10px;
}
.article-img img {
  border-radius: 10px;
}

.article-content {
  width: calc(100% - 200px - 10px);
  height: 1px;
  flex: 1 1 auto;
  margin-left: 15px;
  color: #3c3c3c;
}

.article-content .title {
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}
.article-content .description {
  height: 75px;
  font-size: 14px;
  overflow: hidden;
  line-height: 25px;
  letter-spacing: 0.05em;
}

.numbers {
  display: flex;
  color: #888;
}

.numbers span {
  display: inline-block;
  font-size: 13px;
}

.numbers span:first-child {
  margin-right: 15px;
}


.tag-item {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-right: 6px;
  padding: 0 5px;
  border-radius: 3px;
  color: #000;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>