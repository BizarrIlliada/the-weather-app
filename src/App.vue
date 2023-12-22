<template>
  <TheAlerts></TheAlerts>
  <TheHeader />

  <main class="app-main">
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheAlerts from './components/TheAlerts.vue';
import TheHeader from './components/TheHeader.vue';
import { onMounted } from 'vue';
import axios from 'axios';

import { useWeatherStore } from './stores/weather.store'
const weatherStore = useWeatherStore();

onMounted(async () => {
  const ip = (await axios.get('https://httpbin.org/ip')).data.origin;
  const myLocation = (await axios.get('http://ip-api.com/json/' + ip)).data.city;

  // const myLocation = (await axios.get('https://geo.ipify.org/api/v2/country,city', {
  //   params: {
  //     apiKey: 'at_z5VVfcLdcvpZd3FzjTy6b7sfwkuSy',
  //   }
  // })).data.location.city;
  const { lat, lon } = (await weatherStore.getPlacesInfo(myLocation, 1))[0];

  weatherStore.addWeatherByCoords(lat, lon);

  const favoriteCoordsString = localStorage.getItem('favoriteCoords');
  const favoriteCoords: { lat: number, lon: number }[] = favoriteCoordsString ? JSON.parse(favoriteCoordsString) : [];

  favoriteCoords.forEach(coords => {
    const { lat, lon } = coords;
    weatherStore.addWeatherByCoords(lat, lon, true);
  });

  window.addEventListener('beforeunload', () => {
    const favoriteCoords = [] as { lat: number, lon: number }[];

    weatherStore.favoriteWeathers.forEach(weather => {
      favoriteCoords.push({ lat: weather.coord.lat, lon: weather.coord.lon });
    });

    localStorage.setItem('favoriteCoords', JSON.stringify(favoriteCoords));
  });
});
</script>

<style lang="scss">
.app-main {
  display: flex;
  flex-grow: 1;
}
</style>
