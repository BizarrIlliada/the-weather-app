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

  getters: {
    getFavoriteStatus() {
      return (id: number) => {
        return this.favoriteWeathers.some(weather => weather.id === id);
      }
    },

  },

  actions: {
    getPlacesInfo(city: string, limit = 5) {
      return loadPlaces(city, limit)
        .then(data => data)
        .catch(err => Promise.reject(err));
    },

    addWeatherByCoords(lat: number, lon: number) {
      if (this.currentWeathers.length < 5) {
        return loadWeather(lat, lon)
          .then(data => {
            if (this.currentWeathers.some(weather => weather.id === data.id)) {
              useAlertsStore().add({ title: 'weather.itemWasntAdded', message: 'weather.elementAlreadyExist', severity: 'warn', translatable: true });
            } else {
              this.currentWeathers.unshift(data);
            }
          })
          .catch(err => Promise.reject(err));
      } else {
        useAlertsStore().add({ title: 'weather.itemWasntAdded', message: 'weather.listIsFull', severity: 'warn', translatable: true });
      }
    },

    addFavoriteWeatherByCoords(lat: number, lon: number) {
      if (this.favoriteWeathers.length < 5) {
        return loadWeather(lat, lon)
          .then(data => {
            if (this.favoriteWeathers.some(weather => weather.id === data.id)) {
              useAlertsStore().add({ title: 'weather.itemWasntAddedToFavorite', message: 'weather.elementAlreadyExist', severity: 'warn', translatable: true });
            } else {
              this.favoriteWeathers.unshift(data);
            }
          })
          .catch(err => Promise.reject(err));
      } else {
        useAlertsStore().add({ title: 'weather.itemWasntAddedToFavorite', message: 'weather.listIsFull', severity: 'warn', translatable: true });
      }
    },

    getForecastByCoords(lat: number, lon: number, cnt: 1 | 5 = 1) {
      return loadForecast(lat, lon, cnt)
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

    deleteWeather(id: number) {
      this.currentWeathers = this.currentWeathers.filter(weather => weather.id !== id);
    },

    toggleFavorite(id: number) {
      const favoriteIndex = this.favoriteWeathers.findIndex(weather => weather.id === id);
      const currentWeather = this.currentWeathers.find(weather => weather.id === id);

      if (favoriteIndex !== -1) {
        this.favoriteWeathers.splice(favoriteIndex, 1);
      } else if (currentWeather) {
        this.addFavoriteWeatherByCoords(currentWeather.coord.lat, currentWeather.coord.lon);
      }
    },
  },
})
