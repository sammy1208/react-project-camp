import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  {rules: {
    // ✅ 強制每行結尾加分號
    "semi": ["error", "always"],

    // ✅ React 相關設定，可視情況調整
    "react/react-in-jsx-scope": "off", // 如果用 React 17+ 可以關
  }},
  pluginReact.configs.flat.recommended,
  
]);