import axios from 'axios';

const apiKey = 'd60569d6dd5a37c7ba2702692d5c44af';

const weatherApi = axios.create({
  baseURL: 'http://api.openweathermap.org',
});

// weatherApi.interceptors.request.use(config => {
//   return config;
// });

export function useWeatherApi() {
  function getCoordinatesOfPlace() {
    return weatherApi.get('/geo/1.0/direct', { params: { q: 'Lviv', limit: 1, appid: apiKey } })
      .then(res => res.data);
  }

  return {
    getCoordinatesOfPlace,
  }
}
