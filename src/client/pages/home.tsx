import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecastWeather } from '../api/weather';
import WeatherCard from '../components/weatherCard';
import type { WeatherResponse } from '../api/index'; // 导入类型

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

const Home: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );
  const [location, setLocation] = useState<string>('Beijing');

  useEffect(() => {
    Promise.all([
      fetchCurrentWeather(location),
      fetchForecastWeather(location, 3),
    ])
      .then(([current, forecastData]) => {
        setCurrentWeather(current);
        setForecast(forecastData);
      })
      .catch(console.error);
  }, [location]);

  if (!currentWeather || !forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <WeatherCard current={currentWeather} forecast={forecast} />
    </div>
  );
};

export default Home;
