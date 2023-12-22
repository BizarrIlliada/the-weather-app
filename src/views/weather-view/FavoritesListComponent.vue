<template>
  <ul v-if="weatherStore.favoriteWeathers.length" class="weather-list">
    <li v-for="weather in weatherStore.favoriteWeathers" :key="weather.id" class="weather-list__item">
      <WeatherCardComponent inFavoriteList :weather="weather"></WeatherCardComponent>
      <TempGraphComponent :coords="weather.coord"></TempGraphComponent>
    </li>
  </ul>
  <p v-else>
    {{ $t('shared.noData') }}
  </p>
</template>

<script setup lang="ts">
import WeatherCardComponent from './WeatherCardComponent.vue';
import TempGraphComponent from './TempGraphComponent.vue';
import { useWeatherStore } from '@/stores/weather.store';

const weatherStore = useWeatherStore();
</script>

<style scoped lang="scss">
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  
  &__item {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    background-color: $surface-100;
    border: 1px solid $surface-300;
    border-radius: 10px;
    padding: 12px;
    width: 100%;

    @include tablet {
      flex-direction: column;
    }
  }
}
</style>
