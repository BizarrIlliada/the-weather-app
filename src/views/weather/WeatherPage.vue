<template>
  <section class="weather-page">
    <MyCard>
    </MyCard>

    <MyCard class="weather-page__tabs">
      <router-view/>
    </MyCard>

    <button @click="logCoords()">Get coords</button>
  </section>
</template>

<script setup lang="ts">
import { useWeatherApi } from '../../api/weather.api';

const weatherApi = useWeatherApi();

function logCoords() {
  weatherApi.getCoordinatesOfPlace().then(res => { console.log(res)})
}
</script>

<style scoped lang="scss">

</style>
