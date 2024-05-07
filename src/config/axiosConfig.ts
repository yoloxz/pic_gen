import axios from "axios";

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'https://fal.run/fal-ai', // 设置全局的基础 URL
  // 其他的配置项...
});

// 导出 Axios 实例
export default instance;
