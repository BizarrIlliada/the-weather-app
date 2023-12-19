import { defineStore } from 'pinia';
import { useWeatherApi } from '@/api/weather.api';

import { IWeather } from '@/types/general.types';

const {
  loadPlaces,
  loadWeather,
} = useWeatherApi();

export const useWeatherStore = defineStore('weatherStore', {
  state() {
    return {
      currentWeathers: [
        {
          id: 1,
          name: 'Volodymyr',
          main: {
            temp: 2,
            feels_like: 0,
            pressure: 1040,
            humidity: 95,
          },
          wind: {
            speed: 8,
          }
        },
        {
          id: 2,
          name: 'Lviv',
          main: {
            temp: 1,
            feels_like: 3,
            pressure: 1036,
            humidity: 80,
          },
          wind: {
            speed: 8,
          }
        },
      ] as IWeather[],
    }
  },

  getters: {},

  actions: {
    getPlacesInfo(city: string) {
      return loadPlaces(city)
        .then(data => data)
        .catch(err => Promise.reject(err));
    },

    addWeatherByCoords( lat: number, lon: number) {
      return loadWeather(lat, lon)
        .then(data => {
          console.log(data);

          this.currentWeathers.unshift(data);
        })
        .catch(err => Promise.reject(err));
    }
  },
})
