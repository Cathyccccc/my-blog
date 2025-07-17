import { createApp, h } from "vue";
import "./style.css";
import "virtual:uno.css";
import App from "./App.vue";
import router from "./route/routes";
// import Message from "./components/Message.vue";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
// highlightjs（代码块高亮）
import hljs from "highlight.js";
// 按需引入语言包
// import json from "highlight.js/lib/languages/json";
// import javascript from "highlight.js/lib/languages/javascript";
// import css from "highlight.js/lib/languages/css";

// hljs.registerLanguage("json", json);
// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("css", css);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

// console.log(window.matchMedia("(prefers-color-scheme: dark)"));

// 默认显示颜色跟随系统
// 点击toggle按钮时切换颜色
// document.documentElement.classList.toggle(
//   "dark",
//   localStorage.theme === "dark" ||
//     (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
// );

const app = createApp(App);

app.use(router).use(VMdEditor).mount("#app");
