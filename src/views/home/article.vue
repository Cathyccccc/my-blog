<template>
  <div>
    <Card
      v-for="item in articleListRef"
      :key="item.id"
      class="group mb-3 bg-linear-switch shadow-sm hover:custom-border-linear dark:custom-dark-border-linear hover:border-transparent hover:shadow dark:hover:shadow-black"
      @click="browseArticle(item)"
    >
      <!-- 文章卡片--头部 -->
      <template #title>
        <div class="w-full md:flex md:justify-between md:items-center">
          <div class="flex items-baseline w-full sm:w-4/5">
            <svg
              t="1752569670588"
              class="w-8 h-8 mr-4"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1522"
            >
              <path
                d="M235.710908 565.365418c3.442402-99.843986 20.061918-175.8521 49.92097-228.089835 29.827329-52.206012 76.305897-91.50097 139.435703-117.916597L349.324502 98.858542c-104.442724 47.073108-180.749644 116.493178-228.948389 208.29193C83.631234 376.007723 65.290517 487.336274 65.290517 641.107473l0 284.032962 332.234777 0L397.525294 565.365418 235.710908 565.365418zM769.351787 565.365418c3.442402-99.843986 20.061918-175.8521 49.92097-228.089835 29.827329-52.206012 76.305897-91.50097 139.435703-117.916597L882.965381 98.858542c-104.442724 47.073108-180.749644 116.493178-228.948389 208.29193-36.744879 68.857251-55.085596 180.185802-55.085596 333.957001l0 284.032962 332.234777 0L931.166173 565.365418 769.351787 565.365418z"
                p-id="1523"
                :fill="theme === 'dark' ? '#552aa8' : '#e8dcff'"
              ></path>
            </svg>
            <span
              class="text-lg font-bold oneline-text-overflow text-base-color-switch group-hover:bg-linear-to-r dark:bg-linear-to-r group-hover:from-[#5E27CB] dark:from-[#5E27CB] group-hover:to-[#E7DBFF] dark:to-[#E7DBFF] group-hover:bg-clip-text dark:bg-clip-text group-hover:text-transparent dark:text-transparent transition duration-150"
              >{{ item.title }}</span
            >
          </div>
          <div class="hidden sm:block shrink-0">
            <Tag
              bordered
              circle
              class="mr-2 bg-transparent group-hover:bg-linear-to-r group-hover:from-[#5E27CB] group-hover:to-[#210C4B] transition group-hover:text-white group-hover:border-transparent cursor-pointer"
              v-for="t in item.tag"
              :key="t.id"
              >{{ t.tag_name }}</Tag
            >
          </div>
        </div>
      </template>
      <!-- 文章卡片--内容 -->
      <div class="flex pr-6">
        <div v-if="item.coverImg" class="mr-4 shrink-0">
          <img v-if="item.coverImg" :src="item.coverImg" class="h-10 object-contain" alt="" />
          <svg
            v-else
            t="1752545660799"
            class="w-8"
            viewBox="0 0 1417 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1299"
          >
            <path
              d="M0 0h1417.846154v1024H0z"
              :fill="theme === 'dark' ? '#552aa8' : '#e8dcff'"
              p-id="1300"
            ></path>
            <path
              d="M0 1024l512-512 196.923077 196.923077L1142.153846 275.692308l275.692308 275.692307v472.615385H0zM728.615385 236.307692a98.461538 98.461538 0 1 1 0 196.923077 98.461538 98.461538 0 0 1 0-196.923077z"
              fill="#FAFAFA"
              p-id="1301"
              data-spm-anchor-id="a313x.manage_type_myprojects.0.i1.1fdf3a8107Ujzf"
              class="selected"
            ></path>
          </svg>
        </div>
        <div
          class="max-h-8 overflow-hidden break-all md:h-auto text-xs text-base-color-switch group-hover:text-slate-600 transition-color duration-150"
        >
          {{ item.content.replace(/[*#]+/g, " ").slice(0, 120) + '...' }}
        </div>
      </div>
      <!-- 文章卡片-尾部 -->
      <template #footer>
        <div class="text-xs text-gray-400">
          <span class="mr-3">发布时间：{{ item.date }}</span>
          <!-- <span>浏览量：{{ item.scanNumber > 99 ? "99+" : item.scanNumber }}</span> -->
          <!-- <span>评论数：{{ item.commentNumber > 99 ? "99+" : item.commentNumber }}</span> -->
        </div>
      </template>
    </Card>
    <div class="h-6 flex justify-center">
      <Loading :loading="loadingRef" />
      <p class="text-sm text-zinc-400" v-if="!hasMore && !loadingRef">没有更多了</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// import Pagination from "../components/Pagination.vue";
// import Empty from "../components/uc/Empty.vue";
import api from "@/api";
import Card from "@/components/uc/Card.vue";
import Loading from "@/components/uc/Loading.vue";
import Tag from "@/components/uc/Tag.vue";
import { useTheme } from "@/hooks";
import { debounce } from "@/utils/debounce";
import { event } from "@/utils/event";

const route = useRoute();
const router = useRouter();
const [theme] = useTheme();
const articleListRef = ref([]);
const loadingRef = ref(false);
const pagination = ref({
  page: 1,
  pageSize: 6,
  total: 0,
});
const SCROLL_THRESHOLD = 50; // 触发加载的滚动阈值 (px)
const hasMore = ref(false); // 是否还可以加载更多数据

async function fetchData(filterKey) {
  const result = await api.article.getArticleList({ ...pagination.value, filterKey });
  articleListRef.value = articleListRef.value.concat(result.list.filter((item) => item.isPublish));
  pagination.value.total = result.total;
  localStorage.setItem('articles', JSON.stringify(articleListRef.value));
  loadingRef.value = false;
}

const debounceRequest = debounce(fetchData, 500);

onMounted(() => {
  let filterKey = null;
  const tag = route.query.tag;
  if (tag) {
    filterKey = tag;
  }
  loadingRef.value = true;
  fetchData(filterKey);
  event.on("scroll", () => {
    if (route.fullPath == "/article") {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // 1.计算还有多少区域（垂直距离）可以滚动
      const distanceFromBottom = scrollHeight - (scrollTop + viewportHeight);
      // 2. 判断是否触发加载条件
      if (distanceFromBottom < SCROLL_THRESHOLD) {
        // 3. 调用同一个防抖函数实例
        if (loadingRef.value) {
          return;
        }
        loadingRef.value = true;
        hasMore.value = true;
        if (articleListRef.value.length >= pagination.value.total) {
          hasMore.value = false;
          loadingRef.value = false;
          return;
        }
        pagination.value.page++;
        debounceRequest();
        // console.log("触发防抖请求...");
      } else {
        // console.log(`未触发请求。`);
      }
    }
  });
});

watch(
  () => route.query,
  (newVal) => {
    const tag = newVal.tag;
    articleListRef.value = [];
    fetchData(tag);
  },
);

function browseArticle(article) {
  // console.log(article)
  // article.scanNumber++;
  // api.article.updateArticle({ ...article });
  router.push({ path: `/articleDetail/${article.id}` });
}
</script>

<style scoped></style>
