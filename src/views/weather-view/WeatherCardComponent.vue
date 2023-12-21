<template>
  <MyCard :class="['weather-card', weather.isFavorite ? 'weather-card--favorite' : '']">
    <h3 class="weather-card__title">{{ weather.name }}</h3>
    <span class="weather-card__temp">
      {{ $t('weather.temperature', { temp: weather.main.temp.toFixed() }) }}
    </span>
    <span class="weather-card__feeling">
      {{ $t('weather.feelsLike', { temp: weather.main.feels_like.toFixed() }) }}
    </span>
    <span class="weather-card__wind">
      {{ $t('weather.windSpeed', { speed: +weather.wind.speed.toFixed(1) }) }}
    </span>
    <span class="weather-card__pressure">
      {{ $t('weather.pressure', { pressure: weather.main.pressure }) }}
    </span>
    <span class="weather-card__humidity">
      {{ $t('weather.humidity', { humidity: weather.main.humidity }) }}
    </span>

    <div class="weather-card__buttons">
      <MyButton
        v-if="!inFavoriteList"
        class="weather-card__button"
        @click="$emit('delete')"
        severity="danger"
        outlined
      >
        {{ $t('shared.delete') }}
      </MyButton>
  
      <MyButton
        class="weather-card__button weather-card__button--gold"
        severity="help"
        @click="weatherStore.toggleFavorite(weather.id)"
        outlined
      >
        <img v-if="weather.isFavorite" src="../../assets//icons//UI/starGold.svg" alt="Star Gold">
        <img v-else src="../../assets//icons//UI/starGray.svg" alt="Star Gray">
      </MyButton>
    </div>
  </MyCard>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { useWeatherStore } from '@/stores/weather.store';
import { IWeather } from '@/types/general.types';

withDefaults(defineProps<{
  weather: IWeather,
  inFavoriteList?: boolean,
}>(), {
  inFavoriteList: false,
});

const weatherStore = useWeatherStore();
</script>

<style scoped lang="scss">
.weather-card {
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  &--favorite {
    outline: 3px solid $yellow-400;
    background-color: $yellow-100;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__humidity {
    margin-bottom: 10px;
  }

  &__buttons  {
    display: flex;
    justify-content: space-between;

    @include tablet {
      justify-content: flex-start;
      gap: 20px;
    }
  }

  &__button {
    width: 90px;

    &--gold {
      width: 36px;
    }
  }
}
</style>
