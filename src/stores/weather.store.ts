import { defineStore } from 'pinia';
import { useWeatherApi } from '@/api/weather.api';

import { useAlertsStore } from './alerts.store';

import { IWeather, IForecastItem } from '@/types/general.types';

const {
  loadPlaces,
  loadWeather,
  loadForecast,
  // loadDailyForecast,
} = useWeatherApi();

export const useWeatherStore = defineStore('weatherStore', {
  state() {
    return {
      currentWeathers: [] as IWeather[],
      favoriteWeathers: [] as IWeather[],
    }
  },

  getters: {},

  actions: {
    getPlacesInfo(city: string, limit = 5) {
      return loadPlaces(city, limit)
        .then(data => data)
        .catch(err => Promise.reject(err));
    },

    addWeatherByCoords(lat: number, lon: number) {
      return loadWeather(lat, lon)
        .then(data => {
          console.log(data);

          if (this.currentWeathers.some(weather => weather.id === data.id)) {
            console.log('Its already added');
            useAlertsStore().add({ title: 'Item wasn\'t added', message: 'It\'s in the list already!', severity: 'warn' });
          } else {
            this.currentWeathers.unshift(data);
          }

        })
        .catch(err => Promise.reject(err));
    },

    getForecastByCoords(lat: number, lon: number) {
      return loadForecast(lat, lon)
        .then(data => {
          console.log(data.list);

          const result: { time: string, temp: number }[] = [];

          data.list.forEach((item: IForecastItem) => {
            result.push({ time: item.dt_txt, temp: item.main.temp })
          });

          return result;
        })
        .catch(err => Promise.reject(err));
    },

    // getDailyForecastByCoords(lat: number, lon: number) {
    //   return loadDailyForecast(lat, lon)
    //     .then(data => { console.log(data) })
    //     .catch(err => Promise.reject(err));
    // },

    deleteWeather(id: number) {
      this.currentWeathers = this.currentWeathers.filter(weather => weather.id !== id);
    },

    toggleFavorite(id: number) {
      const currentWeather = this.currentWeathers.find(weather => weather.id === id);

      if (currentWeather) {
        currentWeather.isFavorite = !currentWeather.isFavorite;
        const favoriteIndex = this.favoriteWeathers.findIndex(weather => weather.id === id);

        if (favoriteIndex !== -1) {
          this.favoriteWeathers.splice(favoriteIndex, 1);
        } else {
          this.favoriteWeathers.unshift(currentWeather);
        }
      }
    },
  },
})
