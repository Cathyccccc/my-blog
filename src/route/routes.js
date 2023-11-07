// import * as router from 'vue-router'
import { createRouter, createWebHashHistory } from "vue-router";
import Article from '../views/article.vue';
import Project from '../views/project.vue';
import Individual from '../views/Individual.vue';
import Home from '../views/Home.vue';
import ArticleDetail from '../views/articleDetail.vue';
import Login from '../views/login.vue';
import AddArticle from '../views/addArticle.vue';
import ArticleManage from '../views/ArticleManage.vue';
import ProjectManage from '../views/ProjectManage.vue';
import CommentManage from '../views/CommentManage.vue';
import TagManage from '../views/TagManage.vue';
{
  // console.log(router)
  //   NavigationFailureType: (...)
  //   RouterLink: (...)
  //   RouterView: (...)
  //   START_LOCATION: (...)
  //   createMemoryHistory: (...)
  //   createRouter: ƒ createRouter(options)
  //   createRouterMatcher: (...)
  //   createWebHashHistory: (...)
  //   createWebHistory: (...)
  //   isNavigationFailure: (...)
  //   loadRouteLocation: (...)
  //   matchedRouteKey: (...)
  //   onBeforeRouteLeave: (...)
  //   onBeforeRouteUpdate: (...)
  //   parseQuery: (...)
  //   routeLocationKey: (...)
  //   routerKey: (...)
  //   routerViewLocationKey: (...)
  //   stringifyQuery: (...)
  //   useLink: (...)
  //   useRoute: (...)
  //   useRouter: (...)
  //   viewDepthKey: (...)
  //   Symbol(Symbol.toStringTag): "Module"
}

const routes = [
  { path: '/article', name: 'article', component: Article },
  { path: '/project', component: Project },
  { path: '/individual', component: Individual },
  { path: '/', redirect: '/article' },
  { path: '/articleDetail/:id', component: ArticleDetail },
  { path: '/login', component: Login },
  { path: '/addArticle', component: AddArticle },
  { path: '/editArticle/:id', component: AddArticle },
  { path: '/articleManage', component: ArticleManage },
  { path: '/projectManage', component: ProjectManage },
  { path: '/commentManage', component: CommentManage },
  { path: '/tagManage', component: TagManage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;