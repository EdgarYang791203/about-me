import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "/src"),
      },
    ],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true, // 在某些 Docker 和文件系統配置中，這可以幫助改善文件變化檢測
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // https://website-cms-api-357627052252.asia-east1.run.app
        changeOrigin: true,
      },
    },
  },
});
