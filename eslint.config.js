import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default defineConfig([
  {
    ignores: ["dist/*"],
  },
  {
    files: ["**/*.{js,vue}"],
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
    },
    extends: ["js/recommended"],
    rules: {
      "vue/max-len": ["error", { code: 100 }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
]);
