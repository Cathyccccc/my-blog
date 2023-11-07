<template>
  <div class="article-card">
    <div class="article-img">
      <img :src="'http://localhost:3000/static/' + article.coverImg" alt="">
    </div>
    <div class="article-content">
      <div class="content-top">
        <h3 class="title">{{ article.title }}</h3>
        <div class="description">{{ article.content.replace(/<[^<>]+>/g, '').slice(0, 90) + '...' }}</div>
      </div>
      <div class="content-bottom">
        <TagList :tag-list-data="article.tag" />
        <div class="numbers">
          <span>浏览数：{{ article.scanNumber > 99 ? '99+' : article.scanNumber }}</span>
          <span>评论数：{{ article.commentNumber > 99 ? '99+' : article.commentNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TagList from './TagList.vue';
const props = defineProps({
  article: Object,
});

</script>

<style scoped>
.article-card {
  width: 100%;
  /* height: 150px; */
  background-color: #fff;
  /* box-shadow: 1px 1px 20px rgba(100, 100, 100, .1); */
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 18px 20px;
  box-sizing: border-box;
  transition: all .5s;
  cursor: pointer;
  display: flex;
}

.article-card:hover {
  /* transform: scale(1.005); */
  box-shadow: 1px 2px 30px rgba(150, 150, 150, .2);
}

.content-bottom {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
}


.article-img {
  width: 240px;
  height: 140px;
  background: #ddd;
  border-radius: 10px;
}

.article-img img {
  border-radius: 10px;
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  height: 65px;
  font-size: 14px;
  overflow: hidden;
  line-height: 22px;
  letter-spacing: 0.05em;
}

.numbers {
  color: #888;
  overflow: hidden;
}

.numbers span {
  display: inline-block;
  font-size: 13px;
}

.numbers span:first-child {
  margin-right: 15px;
}
</style>