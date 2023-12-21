<template>
  <div class="app-autocomplete">
    <div class="app-autocomplete__items">
      <label for="app-autocomplete-input" class="app-autocomplete__label">
        {{ $t('weather.searchCity') }}
      </label>
      <div class="app-autocomplete__items">
        <input
          type="text"
          class="app-autocomplete__input"
          id="app-autocomplete-input"
          :placeholder="$t('weather.enterCityName')"
          v-model="searchInput"
          @input="debouncedOnInput"
        >
      </div>
    </div>

    <ul v-if="cities?.length" class="app-autocomplete__dropdown">
      <li class="app-autocomplete__dropdown-item" v-for="city in cities" :key="'id' + city.lat + city.lon">
        {{ city.name + ` (${city.state ? city.state + ', ' + city.country : city.country})`}}
        <MyButton @click="addWeatherCard(city.lat, city.lon)" class="app-autocomplete__button">
          {{ $t('shared.add') }}
        </MyButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '../../stores/weather.store';
import { useHelpers } from '../../tools/hooks/helpers.hook';
import { ICity } from '@/types/general.types';
import { useAlertsStore } from '@/stores/alerts.store';

const { debounce } = useHelpers();
const weatherStore = useWeatherStore();
const alertStore = useAlertsStore();

const searchInput = ref('');
const cities = ref<ICity[]>();

const debouncedOnInput = debounce(() => {
  if (searchInput.value.length) {
    weatherStore.getPlacesInfo(searchInput.value)
      .then(data => {
        console.log(data);

        cities.value = data;
      });
  } else {
    cities.value = [];
  }
}, 500);

function addWeatherCard(lat: number, lon: number) {
  if (weatherStore.currentWeathers.length < 5) {
    weatherStore.addWeatherByCoords(lat, lon);
  } else {
    // Add translations
    alertStore.add({ title: 'Item wasn\'t added!', message: 'Can\'t add more than 10 elements' })
  }

  searchInput.value = '';
  cities.value = [];
}
</script>

<style scoped lang="scss">
.app-autocomplete {
  position: relative;

  &__label {
    display: inline-block;
    margin-bottom: 4px;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    border: 1px solid $bluegray-100;
    outline: none;
    transition: 0.3s;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 12px;
    border-radius: 8px;

    &:focus {
      border: 1px solid;
      transition: 0.1s;
      border-color: $primary-300;
      outline: 2px solid $primary-200;
    }
  }

  &__dropdown {
    list-style: none;
    position: absolute;
    top: 70px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: #fff;
    border: 1px solid $surface-300;
    border-radius: 8px;
    width: 100%;
    padding: 2px;
  }

  &__dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
    padding: 4px 8px;
    border-radius: 4px;
    gap: 20px;

    &:hover {
      background-color: $primary-100;
    }
  }

  &__button {
    width: 70px;
  }
}
</style>
