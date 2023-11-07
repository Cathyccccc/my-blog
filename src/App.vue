<template>
  <!-- 导航区 -->
  <nav class="nav-bar-container">
    <!-- 图标 -->
    <div class="favicon">
      <img src="/favicon_bgwhite.png" alt="" width="50" height="50">
      <span>BLOG</span>
    </div>
    <!-- 导航 -->
    <div class="nav-bar">
      <router-link to="/article">Articles</router-link>
      <router-link to="/project">Projects</router-link>
      <router-link to="/individual">Individual</router-link>
    </div>
    <svg id="headerBump" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 20">
      <path d="M180 0 C240 0 240 18 280 18 C320 18 320 0 380 0 Z" transform="matrix(1,0,0,1,-76.1984879008934,0)"
        data-svg-origin="276.20052234638445 0" style="transform-origin: 0px 0px 0px;"></path>
    </svg>
    <!-- 搜索框 -->
    <div class="search">
      <input type="search" v-model.trim="searchValRef">
      <div class="search-btn" @click="handleSearch">
        <svg t="1695604758202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="913" width="20" height="20">
          <path
            d="M1005.312 914.752l-198.528-198.464A448 448 0 1 0 0 448a448 448 0 0 0 716.288 358.784l198.4 198.4a64 64 0 1 0 90.624-90.432zM448 767.936A320 320 0 1 1 448 128a320 320 0 0 1 0 640z"
            fill="#ffffff" p-id="914"></path>
        </svg>
      </div>
    </div>
    <!-- 用户 -->
    <Button v-if="!userInfoRef" class="login-btn" @click="handleLogon">登录</Button>
    <div v-else class="personal">
      <div class="avatar">
        <img src="/favicon.svg">
      </div>
      <div class="username">
        <router-link to="/individual">{{ userInfoRef.loginId }}</router-link>
      </div>
      <Button class="operation" @click="controlOperationList">
        <svg :class="{ 'rotate': isShowOperationListRef }" t="1697359298131" class="icon" viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1240" width="20" height="20">
          <path
            d="M755.2 544L390.4 874.666667c-17.066667 14.933333-44.8 14.933333-59.733333-2.133334-6.4-8.533333-10.666667-19.2-10.666667-29.866666v-661.333334c0-23.466667 19.2-42.666667 42.666667-42.666666 10.666667 0 21.333333 4.266667 27.733333 10.666666l362.666667 330.666667c17.066667 14.933333 19.2 42.666667 2.133333 59.733333 2.133333 2.133333 0 2.133333 0 4.266667z"
            fill="#fff" p-id="1241"></path>
        </svg>
      </Button>
      <div class="mask"></div>
      <Transition>
        <ul v-show="isShowOperationListRef" class="operation-list" @click="controlOperationList">
          <li><router-link to="/articleManage">文章管理</router-link></li>
          <li><router-link to="/projectManage">项目管理</router-link></li>
          <li><router-link to="/commentManage">评论管理</router-link></li>
          <li><router-link to="/tagManage">标签管理</router-link></li>
        </ul>
      </Transition>
    </div>
  </nav>
  <!-- 主内容区 -->
  <div class="main-content" :class="{ 'has-padding': showPadding }">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getArticleList } from './api/article';
import { getProjectList } from './api/project';
import Button from './components/Button.vue';
import mitt from './utils/mitt';
// import {stretchWater, shrinkWater} from './utils/index';

const emitter = mitt();
provide('emitter', emitter)

const userInfoRef = ref(null);


onMounted(() => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  userInfoRef.value = userInfo;
  const headerBump = document.getElementById('headerBump');
  const navBar = document.querySelector('.nav-bar-container');
  const path = headerBump.childNodes[0];
  const speed_a = 0.0220011;
  const speed_d = -0.00611333;
  const speed_tx = -6.0111333;
  let a = 1, d = 1, tx = -76.1984879008934, timer = null;
  navBar.addEventListener('mousemove', (e) => {
    headerBump.style.left = e.clientX;
  })
  navBar.addEventListener('mouseenter', () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (a < 2) {
        a += speed_a;
      }
      if (d > 0.7) {
        d += speed_d;
      }
      if (tx > -352.3911023420891) {
        tx += speed_tx;
      }
      if (a >= 2 && d <= 0.7 && tx <= -352.3911023420891) {
        clearInterval(timer);
        timer = null;
        a = 2; d = 0.7; tx = -352.3911023420891;
      }
      path.style.transform = `matrix(${a}, 0, 0, ${d}, ${tx}, 0)`
    }, 50);
  })
  navBar.addEventListener('mouseleave', () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (a > 1) {
        a -= speed_a * 2.9800033;
      }
      if (d < 1) {
        d -= speed_d * 2.00033;
      }
      if (tx < -76.1984879008934) {
        tx -= speed_tx * 3.00033;
      }
      if (a <= 1 && d >= 1 && tx >= -76.1984879008934) {
        clearInterval(timer);
        timer = null;
        a = 1; d = 1; tx = -76.1984879008934;
      }
      path.style.transform = `matrix(${a}, 0, 0, ${d}, ${tx}, 0)`
    }, 50)
  })
})

const route = useRoute();

// 点击登录按钮
const router = useRouter();
const handleLogon = () => {
  if (!userInfoRef.value) {
    router.push({ path: '/login' });
  }
}
// 根据不同情况显示不同 main-content样式，当为管理界面时，去掉padding
const showPadding = ref(false);
const noPaddingList = ['/articleManage', '/projectManage', '/commentManage', '/tagManage']
// 监听路由变化
watch(() => router.currentRoute.value.path, (newVal, oldVal) => {
  if (oldVal === '/login' && newVal === '/article') {
    userInfoRef.value = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  // console.log(noPaddingList.includes(router.currentRoute.value.path))
  if (noPaddingList.includes(router.currentRoute.value.path)) {
    showPadding.value = false;
  } else {
    showPadding.value = true;
  }
})
// 搜索
const searchValRef = ref('');
const handleSearch = () => {
  const path = route.fullPath;
  switch (path) {
    case '/article':
      getArticleList({ page: 1, pageSize: 5, filterKey: searchValRef.value }).then((res) => {
        emitter.emit('searchArticle', res);
        searchValRef.value = '';
      })
      break;
    case '/project':
      getProjectList({ filterKey: searchValRef.value }).then((res) => {
        console.log('搜索后的项目列表', res)
        emitter.emit('searchProject', res);
        searchValRef.value = '';
      })
      break;
    case '/articleManage':
      emitter.emit('searchArticleManage', searchValRef.value);
      break;
    case '/projectManage':
      emitter.emit('searchProjectManage', searchValRef.value)
      break;
  }
}
// 展示/隐藏操作按钮列表
const isShowOperationListRef = ref(false)
function controlOperationList() {
  isShowOperationListRef.value = !isShowOperationListRef.value;
}


</script>

<style scoped>
.nav-bar-container {
  position: fixed;
  width: 100%;
  height: 60px;
  /* background: #3DCBFF; */
  background-color: #55BBFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 100;
}

.favicon {
  height: 60px;
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.favicon span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 34px;
  color: #FFF;
  margin-left: 8px;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-bar {
  width: 70%;
  height: 60px;
  margin-left: 50px;
  display: flex;
  justify-content: space-evenly;
}

#headerBump {
  height: 20px;
  fill: #55BBFF;
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
  color: #FFF;
  margin-right: 80px;
  transition: color .5s;
}

.nav-bar a:hover {
  color: #ffdd00;
}

.search {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search input {
  border: none;
  outline: none;
  height: 35px;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 14px;
}

.search-btn {
  margin: 0 10px;
  cursor: pointer;
}

.search-btn path {
  transition: all .5s;
}

.search-btn:hover path {
  fill: #ffdd00;
}

.login-btn {
  width: 80px;
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
  background-color: #55BBFF;
  border: none;
  margin: 3px 0;
}

.operation svg {
  transition: all .3s;
}

.rotate {
  transform: rotateZ(90deg);
}

.username {
  font-size: 18px;
}

.username a {
  text-decoration: inherit;
  color: #FFF;
  font-weight: 600;
}

.operation-list {
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  right: 0px;
  background: #55BBFF;
  margin: 0;
  padding-bottom: 10px;
  z-index: 101;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

li {
  list-style: none;
  height: 40px;
  line-height: 20px;
  box-sizing: border-box;
  padding: 10px 20px;
}

.operation-list li a {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}

.main-content {
  height: calc(100vh - 60px);
  margin-top: 60px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.has-padding {
  padding: 0 10%;
}

.v-enter-active {
  animation: toggle .15s;
  transform-origin: 0 -5px;
}

.v-leave-active {
  animation: toggle .15s reverse;
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
}
</style>