import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home/index.vue";

export const routes = [
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    name: "login",
  },
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "", // 即 / → 重定向到 /article
        name: "home",
        redirect: "/article",
      },
      {
        path: "article",
        component: () => import("@/views/home/article.vue"),
        name: "article",
        meta: { title: "文章列表" },
      },
      {
        path: "project",
        component: () => import("@/views/home/project.vue"),
        name: "project",
        meta: { title: "项目列表" },
      },
      {
        path: "personal",
        component: () => import("@/views/home/personal.vue"),
        name: "personal",
        meta: { title: "个人简介" },
      },
      {
        path: "articleDetail/:id",
        component: () => import("@/views/home/articleDetail.vue"),
        name: "articleDetail",
      },
      {
        path: "manage",
        meta: { title: "管理" },
        children: [
          {
            path: "articles",
            component: () => import("@/views/manage/manageArticle.vue"),
            meta: { title: "文章管理", auth: true },
          },
          {
            path: "projects",
            component: () => import("@/views/manage/manageProject.vue"),
            meta: { title: "项目管理", auth: true },
          },
          {
            path: "comments",
            component: () => import("@/views/manage/manageComment.vue"),
            meta: { title: "评论管理", auth: true },
          },
          {
            path: "tags",
            component: () => import("@/views/manage/manageTag.vue"),
            meta: { title: "标签管理", auth: true },
          },
          {
            path: "editArticle/:id",
            component: () => import("@/views/add/addArticle.vue"),
            name: "editArticle",
            meta: { auth: true },
          },
          {
            path: "addArticle",
            component: () => import("@/views/add/addArticle.vue"),
            name: "addArticle",
            meta: { title: "新增文章", auth: true },
          },
        ],
      },
    ],
  },
  { path: "/:pathMatch(.*)", component: () => import("@/views/404.vue") }, // 404页面
];
const router = createRouter({
  history: createWebHistory(), // 启用 history 模式后，服务器必须配置支持所有路径都回退到 index.html
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path == "/") {
    next("/article");
  }
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
