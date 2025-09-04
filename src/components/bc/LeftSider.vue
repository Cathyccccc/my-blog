<template>
  <div
    class="h-full bg-switch text-base-color-switch px-3 pt-10 border-r-1 border-[#f2f2f2] dark:border-white/10 box-border"
  >
    <BlogIcon />
    <Card divider title="推荐文章" class="my-3">
      <ul>
        <li
          :class="[
            'text-xs rounded mb-1 px-1 leading-6 cursor-pointer hover:bg-violet-200 dark:hover:bg-indigo-200/30 dark:text-white/80 transition-decoration',
            'transition-all duration-300 underline-offset-3 decoration-gray-300 oneline-text-overflow',
            favorSelectRef === item.id
              ? 'translate-x-1.5 bg-violet-200 dark:bg-indigo-200/30'
              : 'bg-white dark:bg-violet-600/50',
          ]"
          v-for="(item, index) in favorsData"
          :key="item.id"
          @click="handleClickArticleTitle(item.id)"
        >
          {{ index + 1 }}. {{ item.title }}
        </li>
      </ul>
    </Card>
    <Tag
      class="mr-1 mb-1"
      v-for="(item, index) in tagsData"
      :key="item.id"
      checkable
      :checked="filterTag == item.id"
      @click="handleClickTag(item.id)"
      >{{ item.tag_name }}</Tag
    >
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRoute,useRouter } from "vue-router";

import BlogIcon from "@/components/bc/BlogIcon.vue";
import Card from "@/components/uc/Card.vue";
import Tag from "@/components/uc/Tag.vue";

defineProps({
  favorsData: Array,
  tagsData: Array,
});

const router = useRouter();
const route = useRoute();
const favorSelectRef = ref(null); // 点击的文章
const filterTag = ref(null); // 点击的标签
const isCheck = ref(false); // 是否有选中标签

onMounted(() => {
  filterTag.value = route.query?.tag
  favorSelectRef.value = route.params?.id
})

watchEffect(() => {
  if (!route.query.tag) {
    filterTag.value = null;
  }
  if (!route.params.id) {
    favorSelectRef.value = null;
  }
})

// 跳转到指定文章
function handleClickArticleTitle(articleId) {
  filterTag.value = null;
  favorSelectRef.value = articleId;
  router.push({ path: `/articleDetail/${articleId}` });
}

// 跳转到指定标签的文章列表（文章列表筛选）
function handleClickTag(tagId) {
  favorSelectRef.value = null;
  // 判断当前是否为选中状态，当前非选中则修改为选中
  // 若当前为选中状态：判断tagId和filterTag的值是否一致，一致则取消选中
  // 不一致：修改filterTag的值
  if (isCheck.value && tagId === filterTag.value) {
    isCheck.value = false;
    filterTag.value = null;
    router.push({ path: "/article" });
  } else {
    isCheck.value = true;
    filterTag.value = tagId;
    router.push({ path: "/article", query: { tag: filterTag.value } });
  }
}
</script>

<style scoped></style>
