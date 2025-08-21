import { createApp } from "vue";
import "./style.css";
import "virtual:uno.css";
import App from "./App.vue";
import router from "./route/routes";
// import Message from "@/components/Message.vue";

// console.log(window.matchMedia("(prefers-color-scheme: dark)"));

// 默认显示颜色跟随系统
// 点击toggle按钮时切换颜色
// document.documentElement.classList.toggle(
//   "dark",
//   localStorage.theme === "dark" ||
//     (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
// );

const app = createApp(App);
// app.config.globalProperties.$message = Message;
app.use(router).mount("#app");
