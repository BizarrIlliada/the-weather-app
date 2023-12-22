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

    addWeatherByCoords(lat: number, lon: number, isFavorite = false) {
      return loadWeather(lat, lon)
        .then(data => {
          console.log(data);

          if (!isFavorite) {
            if (this.currentWeathers.some(weather => weather.id === data.id)) {
              console.log('Its already added');
              useAlertsStore().add({ title: 'Item wasn\'t added', message: 'It\'s in the list already!', severity: 'warn' });
            } else {
              this.currentWeathers.unshift(data);
            }
          } else if (isFavorite) {
            if (this.currentWeathers.some(weather => weather.id === data.id)) {
              this.favoriteWeathers.unshift(data);
            } else {
              this.currentWeathers.unshift(data);
              this.favoriteWeathers.unshift(data);
            }
          }

        })
        .catch(err => Promise.reject(err));
    },

    addFavoriteWeatherByCoords(lat: number, lon: number) {
      if (this.favoriteWeathers.length < 5) {
        return loadWeather(lat, lon)
          .then(data => {
            if (this.favoriteWeathers.some(weather => weather.id === data.id)) {
              useAlertsStore().add({ title: 'Item wasn\'t added', message: 'It\'s in the list already!', severity: 'warn' });
            } else {
              this.favoriteWeathers.unshift(data);
            }
          })
      } else {
        useAlertsStore().add({ title: 'Item wasn\'t added to favorite list!', message: 'Allowed to add only 5 items!', severity: 'warn' });
      }
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
