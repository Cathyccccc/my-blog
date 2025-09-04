<template>
  <MainLayout>
    <template #top-side>
      <TopSider :user-data="userInfoRef" />
    </template>
    <template #main-content>
      <ContentLayout>
        <template #left-side>
          <LeftSider :favors-data="favorListRef" :tags-data="tagListRef" />
        </template>
        <template #content>
          <router-view v-slot="{ Component }">
            <transition name="fade-right" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </template>
      </ContentLayout>
    </template>
    <template #right-side>
      <RightSider :user-data="userInfoRef" />
    </template>
  </MainLayout>

  <!-- 主内容区 -->
  <!-- <div
      :class="[
        showLeftSide ? 'lg:mx-1/5' : 'lg:mr-1/5',
        'grow-1',
        'bg-switch',
        'text-base-color-switch',
        'relative',
        'flex',
        'flex-col',
        'transition-margin',
        'duration-300',
      ]"
    > -->
  <!-- <div
        class="pt-19 lg:pt-3 lg:static min-h-screen w-full pb-3 px-2 md:pl-3 md:pr-4 box-border bg-switch"
      > -->
  <!-- 宽屏标题区 -->
  <!-- <h3
          v-if="$route.path.startsWith('/manage') || $route.path.startsWith('/add')"
          class="hidden lg:block bg-switch c-[--text-color] text-md font-semibold h-10 pb-3 leading-7"
        >
          <span
            v-if="$route.path.startsWith('/add')"
            class="i-tabler:square-rounded-arrow-left-filled text-xl align-middle h-7 mr-1 hover:opacity-70 transition"
            @click="$router.back()"
          ></span>
          {{ $route.meta.title }}
        </h3> -->

  <!-- </div> -->
  <!-- 遮罩层 -->
  <!-- <Transition name="fade">
        <div
          v-show="toggle"
          class="lg:hidden fixed left-0 top-0 right-0 bottom-0 w-full h-screen bg-black/40 dark:bg-gray-600/20 transition"
          @click="toggle = !toggle"
        ></div>
      </Transition>
    </div>
  </div> -->
</template>

<script setup>
import { onBeforeMount, onMounted,ref } from "vue";

import api from "@/api";
import LeftSider from "@/components/bc/LeftSider.vue";
import RightSider from "@/components/bc/RightSider.vue";
import TopSider from "@/components/bc/TopSider.vue";
import ContentLayout from "@/layouts/ContentLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const favorListRef = ref(null); // 推荐文章列表
const tagListRef = ref(null);
const userInfoRef = ref(null);

onBeforeMount(() => {
  // 获取用户信息
  const userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfoRef.value = JSON.parse(userInfo);
  }
})

onMounted(async () => {

  // 获取标签列表数据
  if (!localStorage.tagList) {
    const res = await api.tag.getTagList();
    if (res?.length > 0) {
      tagListRef.value = res;
      localStorage.setItem("tagList", JSON.stringify(tagListRef.value));
    }
  }
  tagListRef.value = JSON.parse(localStorage.getItem("tagList"));

  // 获取推荐文章数据
  if (!localStorage.favorList) {
    const result = await api.article.getArticleList({ filterKey: "favor" });
    favorListRef.value = result.list;
    localStorage.setItem("favorList", JSON.stringify(favorListRef.value));
  } else {
    favorListRef.value = JSON.parse(localStorage.getItem("favorList"));
  }
});

// const navPaths = computed(() => {
//   console.log(userInfoRef.value ? [...paths, ...managePaths] : paths)
//   return ;
// })

// watch(
//   () => route.query,
//   (newVal) => {
//     if (!newVal.tag) {
//       filterTag.value = null;
//     }
//   },
// );
</script>

<style scoped>
/* 主内容区内容切换动画 */
.fade-right-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-right-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
