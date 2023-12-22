<template>
  <div class="temp-graph">
    <canvas class="temp-graph__graph" ref="chartCanvas"></canvas>
    <div class="temp-graph__buttons">
      <MyButton @click="toggleForecast(1)" severity="primary" :outlined="!singleDayMode">{{ $t('weather.day', 1) }}</MyButton>
      <MyButton @click="toggleForecast(5)" severity="primary" :outlined="singleDayMode">{{ $t('weather.day', 5) }}</MyButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Chart, registerables } from 'chart.js';

import { useWeatherStore } from '@/stores/weather.store';
import { watch } from 'vue';

const weatherStore = useWeatherStore();

const props = defineProps<{
  coords: {
    lat: number,
    lon: number,
  },
}>();

const { t, locale } = useI18n();

Chart.register(...registerables);
let chartInstance: Chart | null = null;

const chartCanvas = ref<HTMLCanvasElement | null>(null);

const forecastList = ref<{ temp: number, time: string }[]>([]);
const singleDayMode = ref(true);
const labels = ref<string[]>([]);
const data = ref<number[]>([]);

let resizeHandler: () => void;

function createChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');

    forecastList.value.forEach((forecast => {
      const date = new Date(forecast.time);
      labels.value.push(date.toLocaleString(localStorage.getItem('currentLang') !== null ? localStorage.getItem('currentLang') as string : 'en' as string, {
        hour: '2-digit',
      }));

      data.value.push(forecast.temp);
    }));

    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels.value,
          datasets: [{
            label: t('weather.tempGraph'),
            data: data.value,
            borderWidth: 1
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // scales: {
          //   y: {
          //     beginAtZero: true,
          //   }
          // }
        }
      });
    }
  }
}

async function resetForecast(days: 1 | 5) {
  forecastList.value = await weatherStore.getForecastByCoords(props.coords.lat, props.coords.lon, days);
  labels.value = [];
  data.value = [];

  createChart();
}

async function toggleForecast(days: 1 | 5) {
  await resetForecast(days);

  singleDayMode.value = !singleDayMode.value;
}

onMounted(async () => {
  forecastList.value = await weatherStore.getForecastByCoords(props.coords.lat, props.coords.lon);

  createChart();

  resizeHandler = () => {
    chartInstance?.resize();
  };

  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  window.removeEventListener('resize', resizeHandler);
});

watch(locale, () => {
  resetForecast(singleDayMode.value ? 1 : 5);
});
</script>

<style scoped lang="scss">
.temp-graph {
  width: 70%;

  @include tablet {
    width: 99%;
  }

  &__graph {
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
