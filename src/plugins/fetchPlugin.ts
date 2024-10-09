import { App, Plugin } from "vue";

type FetchApi = (url: string, options?: RequestInit) => Promise<any>;

const API_DOMAIN = import.meta.env.VITE_API_URL;

export const fetchPlugin: Plugin = {
  install(app: App) {
    // 封裝一個通用的 fetch 請求方法
    const fetchApi: FetchApi = async (url, options = {}) => {
      try {
        const defaultOptions: RequestInit = {
          headers: {
            "Content-Type": "application/json", // 默認使用 JSON 格式
          },
          ...options, // 合併傳入的 options
        };

        const response = await fetch(`${API_DOMAIN}${url}`, defaultOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // 檢查是否有回應的內容
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return data;
        } else {
          // 如果回應沒有內容，返回狀態或空對象
          return null;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    };

    // 使用 provide 將 fetchApi 提供給所有組件
    app.provide("$fetch", fetchApi);
  },
};
