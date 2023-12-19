<template>
  <MyDropdown
    v-model="locale"
    :options="options"
    @change="onChangeLang"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const options = [
  { label: 'EN', value: 'en' },
  { label: 'UA', value: 'uk' },
];

function onChangeLang() {
  localStorage.setItem('currentLang', locale.value);
}
</script>
