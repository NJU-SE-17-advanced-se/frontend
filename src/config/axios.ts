import axios, { AxiosRequestConfig } from "axios";

const allowStatusCodes = [404, 504];

const globalConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://wensun.top/api"
      : "http://localhost:8393/api",
  timeout: 10 * 1000, // 总请求时间不超过 10s
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
    return Promise.resolve(error);
  }
);

export default globalAxios;
