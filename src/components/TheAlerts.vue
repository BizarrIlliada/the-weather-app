<template>
  <TransitionGroup tag="div" class="alerts" name="alerts-list">
    <TheAlert
      v-for="(alert, index) of alertsStore.alerts"
      :key="alert.id"
      :index="index"
      :severity="alert.severity"
      :title="alert.title"
      :message="alert.message"
      :time="alert.time"
      :sticky="alert.sticky"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import TheAlert from './TheAlert.vue';

import { useAlertsStore } from '@/stores/alerts.store';

const alertsStore = useAlertsStore();
</script>

<style scoped lang="scss">
.alerts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 101;
}

.alerts-list-move,
.alerts-list-enter-active,
.alerts-list-leave-active {
  transition: all 0.3s ease;
}

.alerts-list-enter-from,
.alerts-list-leave-to {
  opacity: 0;
}

.alerts-list-enter-from {
  transform: translateX(-30px);
}

.alerts-leave-active,
.alerts-list-leave-active {
  position: fixed;
}
</style>
