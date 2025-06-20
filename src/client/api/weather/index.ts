import { weatherApi, mapApi } from './config';

// 只导入类型，不引入运行时代码
import type {
  WeatherResponse,
  SearchResult,
  CityResponse,
  ProvinceResponse,
} from './type';

// 获取当前天气
export const fetchCurrentWeather = async (
  location: string
): Promise<WeatherResponse> => {
  return weatherApi.get('/current.json', {
    params: { q: location, aqi: 'no' },
  });
};

// 获取天气预报
export const fetchForecastWeather = async (
  location: string,
  days: number = 3
): Promise<WeatherResponse> => {
  return weatherApi.get('/forecast.json', {
    params: { q: location, days, aqi: 'no', alerts: 'no' },
  });
};

// 搜索地点
export const searchLocation = async (
  query: string
): Promise<SearchResult[]> => {
  return weatherApi.get('/search.json', { params: { q: query } });
};

//获取省份
export const fetchProvinces = async (
  keywords: string = '中国' // 固定值
  // subdistrict: string, // 返回子级（省份）
  // extensions: string
): Promise<ProvinceResponse> => {
  return mapApi.get('/config/district', {
    params: {
      keywords, // 固定值
      // subdistrict: '1', // 返回子级（省份）
      // extensions: 'base',
    },
  });
};

// 统一导出
export default {
  fetchCurrentWeather,
  fetchForecastWeather,
  searchLocation,
};
