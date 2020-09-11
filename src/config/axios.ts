import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? ""
    : "";

const globalConfig: AxiosRequestConfig = {
  timeout: 15 * 1000
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
