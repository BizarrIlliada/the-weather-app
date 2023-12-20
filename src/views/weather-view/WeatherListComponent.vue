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
      <MyButton
        @click="onDelete(weather.id, weather.name)"
        severity="danger"
        outlined
      >
        {{ $t('shared.delete') }}
      </MyButton>
    </li>
  </ul>
  <AppModalWindow
    :isOpen="isConfirmDeleteOpen"
    confirmMode
    @confirm="weatherStore.deleteWeather(deleteItemInfo.id)"
    @update:isOpen="isConfirmDeleteOpen = $event"
  >
    <h4>{{ $t('weather.confirmDelete', { city: deleteItemInfo.name }) }}</h4>
  </AppModalWindow>
</template>

<script setup lang="ts">
import AppModalWindow from '@/components/shared/AppModalWindow.vue';
import { ref, reactive } from 'vue';
import { useWeatherStore } from '@/stores/weather.store';

const weatherStore = useWeatherStore();

const isConfirmDeleteOpen = ref(false);

const deleteItemInfo = reactive({} as { id: number, name: string });

function onDelete(id: number, name: string) {
  isConfirmDeleteOpen.value = true;

  deleteItemInfo.id = id;
  deleteItemInfo.name = name;
}
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
    margin-bottom: 10px;
  }
}
</style>
