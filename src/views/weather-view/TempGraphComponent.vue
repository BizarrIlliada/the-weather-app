<template>
  <div class="temp-graph">
    <canvas class="temp-graph__graph" ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Chart, registerables } from 'chart.js';

import { useWeatherStore } from '@/stores/weather.store';

const weatherStore = useWeatherStore();

const props = defineProps<{
  coords: {
    lat: number,
    lon: number,
  },
}>();

const { t } = useI18n();

Chart.register(...registerables);
let chartInstance: Chart | null = null;

const chartCanvas = ref<HTMLCanvasElement | null>(null);

const forecastList = ref<{ temp: number, time: string }[]>([]);
const labels = ref<string[]>([]);
const data = ref<number[]>([]);

let resizeHandler: () => void;

async function createChart() {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');

    forecastList.value = await weatherStore.getForecastByCoords(props.coords.lat, props.coords.lon);

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

onMounted(async () => {
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
</script>

<style scoped lang="scss">
.temp-graph {
  width: 70%;

  @include tablet {
    width: 99%;
  }
}
</style>
