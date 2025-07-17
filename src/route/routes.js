import { createRouter, createWebHistory } from "vue-router";
import api from "@/api";

const result = await api.article.getArticleList({ filterKey: "favor" });

const routes = [
  {
    path: "/article",
    component: () => import("@/views/article.vue"),
    name: "article",
    meta: { title: "文章列表" },
  },
  {
    path: "/project",
    component: () => import("@/views/project.vue"),
    name: "project",
    meta: { title: "项目列表" },
  },
  {
    path: "/journal",
    component: () => import("@/views/journal.vue"),
    name: "journal",
  },
  // { path: "/articleDetail/:id", component: _import("articleDetail") },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    name: "login",
  },
  { path: "/editArticle/:id", component: () => import("@/views/add/addArticle.vue") },
  { path: "/articleDetail/:id", component: () => import("@/views/articleDetail.vue") },
  {
    path: "/manage",
    children: [
      {
        path: "articles",
        component: () => import("@/views/manage/manageArticle.vue"),
        meta: { title: "文章管理" },
      },
      {
        path: "projects",
        component: () => import("@/views/manage/manageProject.vue"),
        meta: { title: "项目管理" },
      },
      {
        path: "comments",
        component: () => import("@/views/manage/manageComment.vue"),
        meta: { title: "评论管理" },
      },
      {
        path: "tags",
        component: () => import("@/views/manage/manageTag.vue"),
        meta: { title: "标签管理" },
      },
    ],
  },
  {
    path: "/add",
    children: [
      {
        path: "addArticle",
        component: () => import("@/views/add/addArticle.vue"),
        name: "addArticle",
        meta: { title: "新增文章" },
      },
      {
        path: "addProject",
        component: () => import("@/views/add/addProject.vue"),
        meta: { title: "新增项目" },
      },
    ],
  },
  { path: "/:pathMatch(.*)", component: () => import("@/views/404.vue") }, // 404页面
  { path: "/", redirect: `/articleDetail/${result.list[0].id}` },
];
const router = createRouter({
  history: createWebHistory(), // 启用 history 模式后，服务器必须配置支持所有路径都回退到 index.html
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.path.startsWith("/manage") || to.path.startsWith("/add")) &&
    !sessionStorage.getItem("token")
  ) {
    alert("请先登录");
    next("/login");
    return;
  }
  // 用户已经登录过了，访问登录页时直接跳转到首页
  if (to.path === "/login" && sessionStorage.getItem("token")) {
    next("/");
    return;
  }
  next();
});
export default router;
