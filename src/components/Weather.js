import { useState, useEffect } from 'react';
import { LocationID, Key } from '../constants';
import './Weather.css';

let time = null;

function Weather() {
  const [dailyWeather, setDailyWeather] = useState({
    tempMax: 0,
    tempMin: 0,
  });
  const [nowWeather, setNowWeather] = useState({
    icon: '100',
    text: '晴',
    windDir: '东南风',
    windScale: '0',
    temp: '0'
  });
  function fetchDaily() {
    window.fetch(`https://devapi.qweather.com/v7/weather/3d?location=${LocationID}&key=${Key}`)
      .then((res) => res.json())
      .then((data = {}) => {
        const { daily = [] } = data;
        if (Array.isArray(daily) && daily.length > 0) {
          setDailyWeather({
            tempMax: daily[0].tempMax,
            tempMin: daily[0].tempMin,
          });
        }
      });
  }
  function fetchNow() {
    window.fetch(`https://devapi.qweather.com/v7/weather/now?location=${LocationID}&key=${Key}`)
      .then((res) => res.json())
      .then((data = {}) => {
        const { now = {} } = data;
        setNowWeather({
          icon: now.icon,
          text: now.text,
          windDir: now.windDir,
          windScale: now.windScale,
          temp: now.temp
        });
      });
  }
  function triggerNextWeather() {
    time = setTimeout(() => {
      fetchDaily();
      fetchNow();
    }, 1800 * 1000);
  }
  async function fetchWeather() {
    try {
      await fetchDaily();
      await fetchNow();
      triggerNextWeather();
    } catch (error) {
      triggerNextWeather();
    }
  }
  useEffect(() => {
    fetchWeather();
    return () => {
      if (time) clearTimeout(time);
    };
  }, []);
  const { icon, text, windDir, windScale, temp } = nowWeather;
  const { tempMax, tempMin } = dailyWeather;
  return (
    <div className="left-bottom">
      <div className="bot-box city">
        <span>杭州</span>
        <span>天气</span>
      </div>
      <div className="bot-box icon">
        <i className={`qi-${icon}`}></i>
      </div>
      <div className="bot-box temp">
        <span>{text}</span>
        <span>{`${tempMin}~${tempMax}℃`}</span>
      </div>
      <div className="bot-box temp-now">
        <span>温度</span>
        <span>{`${temp}℃`}</span>
      </div>
      <div className="bot-box wind">
        <span>{windDir}</span>
        <span>{`${windScale}级`}</span>
      </div>
    </div>
  );
}
export default Weather;
