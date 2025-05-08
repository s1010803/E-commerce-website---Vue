import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig({
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,vue}"],
      plugins: {
        js,
        vue: pluginVue,
      },
      extends: [
        "js/recommended", 
        pluginVue.configs["essential"], 
      ],
      languageOptions: {
        globals: globals.browser,
      },
      rules: {
        "vue/multi-word-component-names": "off", 
      },
    },
  ],
});
