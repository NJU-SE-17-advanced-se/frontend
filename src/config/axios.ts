import axios, { AxiosRequestConfig } from "axios";
import { errorMsg } from "@/utils/message";

const allowStatusCodes = [404];

const globalConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://wensun.top/api"
      : "http://localhost:8393/api",
  timeout: 15 * 1000, // 总请求时间不超过 15s
  validateStatus(status) {
    return (status >= 200 && status < 300) || allowStatusCodes.includes(status);
  }
  // 如果启用凭据，后端必须在AllowOrigin里指定源，而不能是*
  // withCredentials: true
};

const globalAxios = axios.create(globalConfig);

// 请求过滤器
globalAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应过滤器
globalAxios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error.response.status === 502) {
      errorMsg("服务暂时不可用，请刷新重试");
    }
    if (error.response.status === 504) {
      errorMsg("服务请求超时，请刷新重试");
    }
    console.log(error);
    return Promise.resolve(error);
  }
);

export default globalAxios;
