import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: 'd60569d6dd5a37c7ba2702692d5c44af',
    // lang: localStorage.getItem('currentLang') !== null ? localStorage.getItem('currentLang') : 'en',
  },
});

// weatherApi.interceptors.request.use(config => {
//   config.headers['Localization'] = localStorage.getItem('currentLang') !== null ? localStorage.getItem('currentLang') : 'en';

//   return config;
// });

export function useWeatherApi() {
  function loadPlaces(q: string, limit: number) {
    return weatherApi.get('/geo/1.0/direct', { params: { q, limit } })
      .then(res => res.data);
  }

  function loadWeather(lat: number, lon: number) {
    return weatherApi.get('/data/2.5/weather', { params: { lat, lon, units: 'metric' } })
      .then(res => res.data);
  }

  function loadForecast(lat: number, lon: number, cnt: 1 | 5 = 1) {
    return weatherApi.get('/data/2.5/forecast', { params: { lat, lon, units: 'metric', cnt: cnt * 8 } })
      .then(res => res.data);
  }

  // 30 GBP/month)
  // function loadDailyForecast(lat: number, lon: number) {
  //   return weatherApi.get('/data/2.5/forecast/hourly', { params: { lat, lon, units: 'metric', cnt: 24 } })
  //     .then(res => res.data);
  // }

  return {
    loadPlaces,
    loadWeather,
    loadForecast,
    // loadDailyForecast,
  }
}
