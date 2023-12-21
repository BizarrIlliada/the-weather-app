<template>
  <header class="app-header">
    <h1 class="app-header__title">
      {{ $t('appName') }}
    </h1>
    <div class="app-header__items">
      <nav class="app-header__nav">
        <ul class="app-header__nav-list">
          <li class="app-header__nav-item">
            <router-link class="app-header__nav-link" :to="{ name: 'Weather List' }">
              {{ $t('home') }}
            </router-link>
          </li>
          <li class="app-header__nav-item">
            <router-link class="app-header__nav-link" :to="{ name: 'Favorites List' }">
              {{ $t('favorite') }}
            </router-link>
          </li>
        </ul>
      </nav>

      <AppLangSelector />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppLangSelector from './shared/AppLangSelector.vue';
</script>

<style lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  text-align: center;
  padding: 20px 12px;
  background-color: $primary-100;

  &__title {
    @include phone {
      display: none;
    }
  }

  &__items {
    display: flex;
    align-items: center;
    gap: 20px;

    @include phone {
      justify-content: space-between;
      flex-direction: row-reverse;
      width: 100%;
    }
  }

  &__nav-list {
    display: flex;
    gap: 8px;
    list-style: none;
  }

  &__nav-link {
    text-decoration: none;
    transition: 0.3s;
    color: $surface-600;

    &:hover {
      background-color: var(--surface-100);
      color: $surface-900;
    }
  }
}

.router-link-active {
  color: $surface-900;
  text-decoration: underline;
}
</style>
