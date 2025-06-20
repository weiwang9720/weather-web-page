import React, { useState, useEffect } from 'react';
import {
  fetchCurrentWeather,
  fetchForecastWeather,
  fetchProvinces,
} from '../api/weather';
import WeatherCard from '../components/weatherCard';
import type { WeatherResponse } from '../api/index'; // 导入类型
import homeStyles from '../styles/home.module.css';
import searchStyles from '../styles/search.module.css';
import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ForecastWeatherResponse extends WeatherResponse {
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}
const { Search } = Input;
const Home: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );
  const [location, setLocation] = useState<string>('Beijing');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [position, setPosition] = useState<'start' | 'end'>('end');
  const [chineseProvinces, setChineseProvinces] = useState<Array<string>>([]);

  useEffect(() => {
    const loadAllData = async () => {
      // 1. 先加载省份
      const provinceRes = await fetchProvinces();
      console.log('provinceRes', provinceRes);
      // setChineseProvinces(provinceRes.districts[0]?.districts || []);

      // 2. 再加载天气（使用默认省份）
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(location),
        fetchForecastWeather(location, 3),
      ]);
      setCurrentWeather(current);
      setForecast(forecast);
    };

    loadAllData().catch(console.error);
  }, [location]); // 仍然保持对 location 的依赖

  if (!currentWeather || !forecast) {
    return <div>Loading...</div>;
  }

  // [
  //   '北京市',
  //   '天津市',
  //   '河北省',
  //   '山西省',
  //   '内蒙古自治区',
  //   '辽宁省',
  //   '吉林省',
  //   '黑龙江省',
  //   '上海市',
  //   '江苏省',
  //   '浙江省',
  //   '安徽省',
  //   '福建省',
  //   '江西省',
  //   '山东省',
  //   '河南省',
  //   '湖北省',
  //   '湖南省',
  //   '广东省',
  //   '广西壮族自治区',
  //   '海南省',
  //   '重庆市',
  //   '四川省',
  //   '贵州省',
  //   '云南省',
  //   '西藏自治区',
  //   '陕西省',
  //   '甘肃省',
  //   '青海省',
  //   '宁夏回族自治区',
  //   '新疆维吾尔自治区',
  //   '台湾省',
  //   '香港特别行政区',
  //   '澳门特别行政区',
  // ];

  const provinceOptions = chineseProvinces.map((province) => ({
    value: province,
    label: province,
  }));

  return (
    <div className={homeStyles.home}>
      <div className={searchStyles['search-tools']}>
        <Select
          allowClear
          showSearch
          size="large"
          placeholder="选择省份"
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={provinceOptions}
          onChange={(value) => setSelectedProvince(value)}
        />
        <Select
          allowClear
          size="large"
          placeholder="选择市"
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={provinceOptions}
        />
        <Select
          allowClear
          size="large"
          placeholder="选择区"
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={provinceOptions}
        />
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          iconPosition={position}
          onClick={() => setLocation(selectedProvince)}
        >
          Search
        </Button>
      </div>

      <WeatherCard current={currentWeather} forecast={forecast} />
    </div>
  );
};

export default Home;
