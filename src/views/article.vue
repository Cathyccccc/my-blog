<template>
  <div>
      <div class="px-3 lg:p-0" v-show="articleListRef.length">
        <Card
          v-for="item in articleListRef"
          :key="item.id"
          class="group mb-3 bg-linear-switch hover:custom-border-linear dark:custom-dark-border-linear hover:border-transparent hover:shadow dark:hover:shadow-black"
          @click="browseArticle(item)"
        >
          <!-- 文章卡片--头部 -->
          <template #title>
            <div class="flex items-baseline">
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
                class="text-xl font-bold text-title-color-switch group-hover:bg-linear-to-r dark:bg-linear-to-r group-hover:from-[#5E27CB] dark:from-[#5E27CB] group-hover:to-[#E7DBFF] dark:to-[#E7DBFF] group-hover:bg-clip-text dark:bg-clip-text group-hover:text-transparent dark:text-transparent transition duration-150"
                >{{ item.title }}</span
              >
            </div>
            <div class="mr-6">
              <Tag
                bordered
                size="small"
                circle
                class="mr-2 bg-transparent group-hover:bg-linear-to-r group-hover:from-[#5E27CB] group-hover:to-[#210C4B] transition group-hover:text-white group-hover:border-transparent cursor-pointer"
                v-for="t in item.tag"
                :key="t.id"
                >{{ t.tag_name }}</Tag
              >
            </div>
          </template>
          <!-- 文章卡片--内容 -->
          <div class="flex pr-6">
            <svg
              t="1752545660799"
              class="w-8 mr-4 shrink-0"
              viewBox="0 0 1417 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1299"
            >
              <path d="M0 0h1417.846154v1024H0z" :fill="theme === 'dark' ? '#552aa8' : '#e8dcff'" p-id="1300"></path>
              <path
                d="M0 1024l512-512 196.923077 196.923077L1142.153846 275.692308l275.692308 275.692307v472.615385H0zM728.615385 236.307692a98.461538 98.461538 0 1 1 0 196.923077 98.461538 98.461538 0 0 1 0-196.923077z"
                fill="#FAFAFA"
                p-id="1301"
                data-spm-anchor-id="a313x.manage_type_myprojects.0.i1.1fdf3a8107Ujzf"
                class="selected"
              ></path>
            </svg>
            <div class="text-[--text-base-color] dark:text-slate-500 group-hover:text-slate-600 transition-color duration-150">{{ item.content.replace(/[*#]+/g, " ").slice(0, 120) + "..." }}</div>
          </div>
          <!-- 文章卡片-尾部 -->
          <template #footer>
            <div class="text-xs text-gray-400">
              <span class="mr-3">浏览量：{{ item.scanNumber > 99 ? "99+" : item.scanNumber }}</span>
              <span>评论数：{{ item.commentNumber > 99 ? "99+" : item.commentNumber }}</span>
            </div>
          </template>
        </Card>
        <!-- <Pagination v-model:current="pagination.page" :total="pagination.total" /> -->
      </div>
      <Loading v-if="loadingRef" class="loading" />
      <!-- <Empty v-show="articleListRef.length === 0" class="empty" /> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTheme } from "@/hooks";
import Loading from "../components/uc/Loading.vue";
import Card from "@/components/uc/Card.vue";
import Tag from "@/components/uc/Tag.vue";
import Pagination from "../components/Pagination.vue";
import Empty from "../components/uc/Empty.vue";
import { getArticleList, updateArticle } from "/src/api/article";

const route = useRoute();
const router = useRouter();
const [theme] = useTheme();
const emitter = inject("emitter");
// const filterKeyRef = ref("all");
const articleListRef = ref([]);
const loadingRef = ref(false);
const pagination = ref({
  page: 1,
  pageSize: 5,
  total: 0,
});

emitter.on("searchArticle", (value) => {
  pagination.value.total = value.total;
  articleListRef.value = value.list;
});

onMounted(() => {
  let filterKey = null;
  const tag = route.query.tag;
  if (tag) {
    filterKey = tag;
  }
  fetchData(filterKey);
});

watch(() => route.query, (newVal) => {
  const tag = newVal.tag;
  fetchData(tag);
});

async function fetchData(filterKey) {
  loadingRef.value = true;
  const result = await getArticleList({ ...pagination.value, filterKey });
  articleListRef.value = result.list;
  pagination.value.total = result.total;
  loadingRef.value = false;
}

function browseArticle(article) {
  article.scanNumber++;
  updateArticle({ ...article });
  router.push({ path: `/articleDetail/${article.id}` });
}

// watchEffect(async () => {
//   await fetchData();
// });

// async function handleFilter() {
//   if (filterKeyRef.value === "all") {
//     await fetchData();
//   } else {
//     await fetchData(filterKeyRef.value);
//   }
// }

</script>

<style scoped>
.article-container {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  color: #333;
  font-size: 16px;
}

.content {
  display: flex;
  padding: 0 18px;
  box-sizing: border-box;
}

.article-list {
  width: 70%;
  margin: 10px 0;
}

.loading {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}
</style>
