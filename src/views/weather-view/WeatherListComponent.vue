<template>
  <ul class="weather-list">
    <li v-for="weather in weatherStore.currentWeathers" :key="weather.id" class="weather-list__item">
      <h3 class="weather-list__item-title">{{ weather.name }}</h3>
      <div class="weather-list__item-info">
        <span class="weather-list__item-temp">
          {{ $t('weather.temperature', { temp: weather.main.temp.toFixed() }) }}
        </span>
        <span class="weather-list__item-feeling">
          {{ $t('weather.feelsLike', { temp: weather.main.feels_like.toFixed() }) }}
        </span>
        <span class="weather-list__item-wind">
          {{ $t('weather.windSpeed', { speed: +weather.wind.speed.toFixed(1) }) }}
        </span>
        <span class="weather-list__item-pressure">
          {{ $t('weather.pressure', { pressure: weather.main.pressure }) }}
        </span>
        <span class="weather-list__item-humidity">
          {{ $t('weather.humidity', { humidity: weather.main.humidity }) }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
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
    background-color: $surface-100;
    border: 1px solid $surface-300;
    border-radius: 10px;
    padding: 12px;
    width: 100%;
  }

  &__item-info {
    display: flex;
    flex-direction: column;
  }
}
</style>
