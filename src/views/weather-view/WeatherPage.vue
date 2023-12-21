<template>
  <section class="weather-page">
    <div v-if="$route.name === 'Weather List'" class="weather-page__search">
      <SearchCityComponent />
    </div>

    <MyCard class="weather-page__tabs">
      <router-view/>
    </MyCard>
  </section>
</template>

<script setup lang="ts">
import SearchCityComponent from './SearchCityComponent.vue';
</script>

<style scoped lang="scss">
.weather-page {
  &__search {
    margin-bottom: 20px;
  }

  &__search-label {
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
