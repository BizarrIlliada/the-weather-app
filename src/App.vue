<template>
  <TheHeader />

  <main class="app-main">
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>

<style lang="scss">
.app-main {
  display: flex;
  flex-grow: 1;
}
</style>
