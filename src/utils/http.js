// axios 基礎封裝
import axios from "axios";

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000
});

// axios 請求攔截器
httpInstance.interceptors.request.use(config => {
  return config;
}, e => Promise.reject(e));

// axios 響應式攔截器
httpInstance.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e);
});

export default httpInstance;