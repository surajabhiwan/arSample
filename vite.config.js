import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@babel/runtime/helpers/extends": "@babel/runtime/helpers/esm/extends",
      "@babel/runtime/helpers/defineProperty": "@babel/runtime/helpers/esm/defineProperty",
      "@babel/runtime/helpers/slicedToArray": "@babel/runtime/helpers/esm/slicedToArray",
      "@babel/runtime/helpers/objectWithoutProperties": "@babel/runtime/helpers/esm/objectWithoutProperties",
    },
  },
});