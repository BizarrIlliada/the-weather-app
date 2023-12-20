import { defineStore } from 'pinia';
import { useWeatherApi } from '@/api/weather.api';

import { useAlertsStore } from './alerts.store';

import { IWeather } from '@/types/general.types';

const {
  loadPlaces,
  loadWeather,
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

    addWeatherByCoords( lat: number, lon: number) {
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

    deleteWeather(id: number) {
      this.currentWeathers = this.currentWeathers.filter(weather => weather.id !== id);
    }
  },
})
