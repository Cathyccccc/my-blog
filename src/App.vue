<template>
  <div
    :class="['flex justify-stretch w-screen', theme]"
    :style="{
      background: theme === 'dark' ? '#0b0020' : '#fff',
      transition: 'background .3s cubic-bezier(0.4, 0, 0.2, 1)',
    }"
  >
    <!-- 左侧栏 -->
    <Transition name="fade-left" mode="out-in">
      <div
        v-if="showLeftSide"
        class="fixed left-0 hidden lg:block bg-switch text-base-color-switch w-1/5 h-full px-3 pt-10 box-border border-r-1 border-[#f2f2f2] dark:border-white/10 box-border overflow-y-auto"
      >
        <BlogIcon />
        <Card divider title="推荐文章" extra="更多" class="my-3">
          <ul>
            <li
              :class="[
                'leading-7 cursor-pointer active:color-gray-400 hover:underline transition-decoration',
                'transition-all duration-300 underline-offset-3 decoration-gray-300 oneline-text-overflow',
                favorSelectRef === item.id && 'translate-x-1.5 underline text-gray-500',
              ]"
              v-for="(item, index) in favorListRef"
              :key="item.id"
              @click="handleClickArticleTitle(item.id)"
            >
              {{ index + 1 }}. {{ item.title }}
            </li>
          </ul>
        </Card>
        <Card divider title="标签">
          <Tag
            :class="[
              'active:bg-slate-50',
              'hover:color-violet-400',
              'transition',
              'cursor-pointer',
              'mr-1',
              'mb-1',
              item.id == filterTag
                ? 'bg-[--line-color] dark:bg-[--bs-ingido]'
                : 'bg-white dark:bg-[--dark-line-color] dark:highlight-white/5 dark:hover:bg-black/20',
            ]"
            v-for="item in tagListRef"
            :key="item.id"
            @click="handleClickTag(item.id)"
            >{{ item.tag_name }}</Tag
          >
        </Card>
      </div>
    </Transition>
    <!-- 主内容区 -->
    <div
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
    >
      <!-- 窄屏菜单栏（标题区） -->
      <div
        class="fixed w-screen z-100 lg:hidden flex justify-between items-center left-0 top-0 right-0 h-16 px-3 md:px-5 box-border bg-[--theme-color] dark:bg-[--dark-nav-bg-color] transition shadow-md"
      >
        <BlogIcon />
        <h3 class="w-30 leading-8 c-[--text-color] text-md font-semibold">
          {{ $route.meta.title }}
        </h3>
        <div class="flex justify-between items-center w-22 md:w-30 h-full shrink-0">
          <div
            class="inline-block w-10 h-10 p-2 md:w-12 md:h-12 md:p-3 leading-3 rounded-full bg-linear-to-r from-[#5E27CB] via-[#210C4B] to-[#5E27CB] custom-bg-size bg-left hover:bg-right transition-background duration-300"
            @click="changeTheme"
          >
            <Transition name="theme-toggle">
              <span
                id="light"
                v-if="theme === 'light'"
                class="i-tabler:sun absolute text-4 c-white h-6 w-6"
              ></span>
              <span
                id="dark"
                v-else-if="theme === 'dark'"
                class="i-tabler:moon absolute text-4 c-white h-6 w-6"
              ></span>
            </Transition>
          </div>
          <MenuToggleIcon :value="toggle" @toggle="(value) => (toggle = value)" />
        </div>
      </div>
      <Transition name="toggle">
        <Navbar
          v-show="toggle"
          :paths="userInfoRef ? [...paths, ...managePaths] : paths"
          class="lg:hidden top-16 z-10 bg-violet-50 dark:bg-[--dark-nav-bg-color] shadow-sm shrink-0"
        />
      </Transition>
      <div
        class="pt-19 lg:pt-3 lg:static min-h-screen w-full pb-3 px-2 md:pl-3 md:pr-4 box-border bg-switch"
      >
        <!-- 宽屏标题区 -->
        <h3
          v-if="$route.path.startsWith('/manage') || $route.path.startsWith('/add')"
          class="hidden lg:block bg-switch c-[--text-color] text-md font-semibold h-10 pb-3 leading-7"
        >
          <span
            v-if="$route.path.startsWith('/add')"
            class="i-tabler:square-rounded-arrow-left-filled text-xl align-middle h-7 mr-1 hover:opacity-70 transition"
            @click="$router.back()"
          ></span>
          {{ $route.meta.title }}
        </h3>
        <!-- 导航各页面内容 -->
        <router-view v-slot="{ Component }">
          <transition name="fade-right" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <!-- 遮罩层 -->
      <Transition name="fade">
        <div
          v-show="toggle"
          class="lg:hidden fixed left-0 top-0 right-0 bottom-0 w-full h-screen bg-black/40 dark:bg-gray-600/20 transition"
          @click="toggle = !toggle"
        ></div>
      </Transition>
    </div>
    <!-- 右侧栏 -->
    <div class="fixed right-0 hidden lg:block w-1/5 h-screen nav-bg-switch text-base-color-switch">
      <div
        :class="[
          'pt-10',
          userInfoRef ? 'pb-4' : 'pb-16',
          'px-6',
          'flex',
          'justify-between',
          'flex-items-center',
        ]"
      >
        <div>
          <a href="https://github.com/Cathyccccc" target="_blank">
            <span
              class="i-tabler:brand-github-filled mr-2 text-black dark:text-white transition cursor-pointer"
            ></span>
          </a>
          <span
            class="relative i-tabler:brand-wechat mr-2 text-black dark:text-white transition cursor-pointer"
            @click="showQRCode = true"
          ></span>
        </div>
        <!-- 主题切换图标按钮 -->
        <div
          class="inline-block w-12 h-12 p-3 leading-3 rounded-full bg-linear-to-r from-[#5E27CB] via-[#210C4B] to-[#5E27CB] custom-bg-size bg-left hover:bg-right transition-background duration-300"
          @click="changeTheme"
        >
          <Transition name="theme-toggle">
            <span
              id="light"
              v-if="theme === 'light'"
              class="i-tabler:sun absolute text-4 c-white h-6 w-6"
            ></span>
            <span
              id="dark"
              v-else-if="theme === 'dark'"
              class="i-tabler:moon absolute text-4 c-white h-6 w-6"
            ></span>
          </Transition>
        </div>
      </div>
      <div v-if="userInfoRef">
        <p class="px-6 py-3 h-12">你好！{{ userInfoRef?.loginId }}</p>
      </div>
      <!-- 导航 -->
      <Navbar :paths="userInfoRef ? [...paths, ...managePaths] : paths" />
      <!-- 登录 -->
      <div>
        <Button
          v-if="!userInfoRef"
          class="login-btn mx-6 mt-6"
          @click="$router.push({ path: '/login' })"
        >
          <span>登录</span>
        </Button>
      </div>
    </div>
  </div>
  <Modal v-model:open="showQRCode" closable :style="{ width: '240px' }" :footer="null">
    <img src="../public/wechat.jpg" width="200" alt="" />
  </Modal>
</template>

<script setup>
import { onMounted, ref, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTheme } from "@/hooks";
import Navbar from "@/components/bc/Navbar.vue";
import Button from "@/components/uc/Button.vue";
import Card from "@/components/uc/Card.vue";
import Tag from "@/components/uc/Tag.vue";
import MenuToggleIcon from "@/components/bc/MenuToggleIcon.vue";
import BlogIcon from "@/components/bc/BlogIcon.vue";
import Modal from "@/components/uc/Modal.vue";
import mitt from "@/utils/mitt";
import api from "@/api";
import { paths, managePaths } from "@/utils/constant";
// import {routes} from "@/route/routes.js";

const route = useRoute();
const router = useRouter();
const [theme, setTheme] = useTheme(); // 控制主题切换，默认 light
const emitter = mitt();
const userInfoRef = ref(null);
const favorListRef = ref(null);
const tagListRef = ref(null);
const toggle = ref(false);
const showLeftSide = ref(true); // 根据当前页面路径判断是否需要展示 left-side，初始加载页面时默认显示
const filterTag = ref(null); // 点击的标签（用于过滤文章）
const favorSelectRef = ref(null);
const showQRCode = ref(false);
// const searchValRef = ref(""); // 搜索框的值
provide("emitter", emitter);

onMounted(() => {
  const userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfoRef.value = JSON.parse(userInfo);
  } 
  fetchData();
});
// 监听路由变化
watch(
  () => route.path,
  (newVal, oldVal) => {
    // 从登录页跳转到文章页时，获取用户信息
    if (oldVal === "/login" && newVal.startsWith("/articleDetail")) {
      userInfoRef.value = JSON.parse(sessionStorage.getItem("userInfo"));
    }
    // 根据路由路径判断是否需要展示左侧菜单
    if (
      newVal.startsWith("/manage") ||
      newVal.startsWith("/add") ||
      newVal.startsWith("/editArticle")
    ) {
      showLeftSide.value = false;
    } else {
      showLeftSide.value = true;
    }
    if (newVal.startsWith("/articleDetail")) {
      favorSelectRef.value = newVal.split("/")[2];
    } else {
      favorSelectRef.value = null;
    }
  }
);

watch(
  () => route.query,
  (newVal) => {
    if (!newVal.tag) {
      filterTag.value = null;
    }
  }
);

async function fetchData() {
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
  } else {
    favorListRef.value = JSON.parse(localStorage.getItem("favorList"));
  }
}

// 修改主题
function changeTheme(e) {
  switch (e.target.id) {
    case "light":
      setTheme("dark");
      break;
    case "dark":
      setTheme("light");
      break;
  }
}

// 跳转到指定文章
function handleClickArticleTitle(articleId) {
  favorSelectRef.value = articleId;
  router.push({ path: `/articleDetail/${articleId}` });
}

// 跳转到指定标签的文章列表（文章列表筛选）
function handleClickTag(tagId) {
  filterTag.value = tagId;
  router.push({ path: "/article", query: { tag: tagId } });
}
</script>

<style scoped>
.wechat:hover::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  background: #000;
}
/* 主题按钮切换动画 */
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.1s ease-in;
}

.theme-toggle-leave-to {
  opacity: 0;
  transform: scale(1);
}

.theme-toggle-enter-from {
  opacity: 1;
  transform: scale(0);
}
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

.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-left-enter-from {
  opacity: 0;
  width: 200px;
}
.fade-left-leave-to {
  opacity: 0;
  width: 200px;
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-top-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-top-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s ease-in-out;
}

.toggle-leave-to,
.toggle-enter-from {
  transform: translateY(-100%);
}

.favicon {
  width: 160px;
  height: 60px;
  padding: 5px 0;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.favicon span {
  display: inline-block;
  width: 110px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 34px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-bar {
  height: 60px;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
}

#headerBump {
  height: 20px;
  fill: #55bbff;
  position: absolute;
  left: 0;
  top: 59px;
  z-index: 100;
  transform: translateX(-50%);
}

.nav-bar a {
  line-height: 60px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: inherit;
  color: #fff;
  margin: 0 10px;
  transition: color 0.5s;
}

.nav-bar a:hover {
  color: #ffdd00;
}

.search {
  width: 300px;
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.search input {
  flex: 1;
  border: none;
  outline: none;
  height: 35px;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 14px;
}

.search-btn {
  width: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.search-btn path {
  transition: all 0.5s;
}

.search-btn:hover path {
  fill: #ffdd00;
}

.login-btn {
  width: 80px;
  min-width: 54px;
}

/* .login-btn {
  width: 50px;
  height: 35px;
  background: #fff;
  color: #55BBFF;
  font-size: 16px;
  font-weight: bold;
  flex: 0 0 50px;
} */

.personal {
  /* height: 60px; */
  line-height: 60px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.operation {
  background-color: #55bbff;
  border: none;
  margin: 3px 0;
}

.operation svg {
  transition: all 0.3s;
}

.rotate {
  transform: rotateZ(90deg);
}

.username {
  font-size: 18px;
}

.username a {
  text-decoration: inherit;
  color: #fff;
  font-weight: 600;
}

/* .theme-toggle-leave-to {
  opacity: 0;
  transform: translateY(-30px);
} */

@keyframes toggle {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
