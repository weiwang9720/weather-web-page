import React from 'react';
import styles from '../styles/weather.module.css';
import type { WeatherResponse, ForecastWeatherResponse } from '../api/index';

interface WeatherCardProps {
  current: WeatherResponse;
  forecast: ForecastWeatherResponse;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ current, forecast }) => {
  return (
    <div className={styles['weather-card']}>
      {/* 当前天气展示 */}
      <div className={styles['current-weather']}>
        <h2>
          {current.location.name}, {current.location.country}
        </h2>
        <div className={styles['current-temp']}>
          <img
            src={current.current.condition.icon}
            alt={current.current.condition.text}
          />
          <span>{current.current.temp_c}°C</span>
        </div>
        <p>{current.current.condition.text}</p>
      </div>

      {/* 天气预报展示 */}
      {forecast.forecast && (
        <div className={styles['forecast']}>
          <h3>3-Day Forecast</h3>
          <div className={styles['forecast-days']}>
            {forecast.forecast.forecastday.map((day) => (
              <div key={day.date} className={styles['forecast-day']}>
                <p>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <div>
                  <span>H: {day.day.maxtemp_c}°C</span>
                  <span>L: {day.day.mintemp_c}°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
