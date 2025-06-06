// api/index.ts
import weatherApi from './weather/config';
// import type { WeatherApi } from './weather/type'; // 导入类型

// 导出API实例和类型
export { weatherApi };
// export type { WeatherApi };

// 导出所有类型以便外部使用
export type {
  WeatherResponse,
  SearchResult,
  Location,
  Current,
  ForecastWeatherResponse,
  // 其他需要导出的类型...
} from './weather/type';

export default {
  weather: weatherApi,
};
