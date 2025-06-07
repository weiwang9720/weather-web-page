// api/weather/config.ts
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

if (!API_KEY) {
  console.error('Missing API Key');
  // 生产环境直接报错
  // if (process.env.NODE_ENV === 'production') {
  //   throw new Error('API Key is required');
  // }
}

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000,
  params: {
    key: API_KEY,
  },
});

// 响应拦截器
// weatherApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.message);
//     return Promise.reject(error);
//   }
// );

// 响应拦截器：处理错误
weatherApi.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('API请求错误:', error);
    if (error.response) {
      // 处理API返回的错误
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(`请求参数错误: ${data.error.message}`);
        case 401:
          throw new Error('API密钥无效或已过期');
        case 403:
          throw new Error('无权访问此资源');
        case 404:
          throw new Error('未找到匹配的位置');
        case 429:
          throw new Error('请求频率超限，请降低请求速率');
        default:
          throw new Error(`API错误(${status}): ${data.error.message}`);
      }
    } else if (error.request) {
      // 请求已发送，但没有响应
      throw new Error('网络连接失败，请检查网络设置');
    } else {
      // 设置请求时发生错误
      throw new Error(`请求配置错误: ${error.message}`);
    }
  }
);

export default weatherApi;
