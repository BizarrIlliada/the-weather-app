<template>
  <ul v-if="weatherStore.currentWeathers.length" class="weather-list">
    <li v-for="weather in weatherStore.currentWeathers" :key="weather.id" class="weather-list__item">
      <WeatherCardComponent :weather="weather" @delete="onDelete(weather.id, weather.name)"></WeatherCardComponent>
      <TempGraphComponent :coords="weather.coord"></TempGraphComponent>
    </li>
  </ul>
  <p v-else>
    {{ $t('shared.noData') }}
  </p>
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
import WeatherCardComponent from './WeatherCardComponent.vue';
import TempGraphComponent from './TempGraphComponent.vue';
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
    display: flex;
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
