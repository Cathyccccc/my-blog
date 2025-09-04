import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// import UnocssIcons from "@unocss/preset-icons";
// import UnoCSS from "unocss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      // when `presets` is specified, the default preset will be disabled
      // so you could only use the pure CSS icons in addition to your
      // existing app without polluting other CSS
      // 图标设置在uno.conifg.js中设置不起作用
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8088,
    // https: {
    //   cert: fs.readFileSync(
    //     path.resolve(
    //       __dirname,
    //       "D:/Esther/Project/Server/my-blog-server/public/cert/seeyoutomorrow.cyou.pem"
    //     )
    //   ),
    //   key: fs.readFileSync(
    //     path.resolve(
    //       __dirname,
    //       "D:/Esther/Project/Server/my-blog-server/public/cert/seeyoutomorrow.cyou.key"
    //     )
    //   ),
    // },
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        ws: false,
      },
      "/static": {
        target: "http://localhost:3001",
        changeOrigin: true,
        ws: false,
      },
    },
    // build: {
    //   sourcemap: true,
    // },
    hmr: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 使用 @ 进行路径引入
    },
  },
});
