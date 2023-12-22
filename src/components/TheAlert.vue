<template>
  <div
    :class="theAlertClasses"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <h6 v-if="title" class="alert__title">
      {{ translatable ? $t(title) : title }}
    </h6>
    <p class="alert__message">
      {{ translatable ? $t(message) : message }}
    </p>
    <img @click="alertsStore.close(index)" src="../assets/icons/UI/close.svg" class="alert__close" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, withDefaults } from 'vue';

import { useAlertsStore } from '@/stores/alerts.store';

import { IAlert } from '@/types/general.types';

interface Props extends IAlert {
  index: number,
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'info',
  time: 3000,
  sticky: false,
});

const alertsStore = useAlertsStore();

const theAlertClasses = computed(() => {
  const classes = ['alert', 'alert--' + props.severity];

  return classes;
});

const closeTimeout = ref(0);

function onMouseEnter() {
  if (!props.sticky) {
    clearTimeout(closeTimeout.value);
  }
}

function onMouseLeave() {
  if (!props.sticky) {
    closeTimeout.value = setTimeout(() => {
      alertsStore.close(props.index);
    }, 1500);
  }
}

onMounted(() => {
  if (!props.sticky) {
    closeTimeout.value = setTimeout(() => {
      alertsStore.close(props.index);
    }, props.time);
  }
});
</script>

<style scoped lang="scss">
.alert {
  height: min-content;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: #0000005a 0px 0px 5px 0px, #0000001a 0px 0px 1px 0px;
  border-radius: 8px;
  padding: 10px 45px 10px 10px;
  cursor: default;

  @include phone {
    width: 340px;
  }

  &--info {
    background-color: $indigo-100;
    color: $indigo-800;
  }
  
  &--error {
    background-color: $red-100;
    color: $red-800;
  }
  
  &--success {
    background-color: $green-100;
    color: $green-800;
  }
  
  &--warn {
    background-color: $yellow-100;
    color: $yellow-800;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__message {
    font-size: 14px;
  }

  &__close {
    position: absolute;
    height: 25px;
    width: 25px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    border-radius: 50%;
  }
}
</style>
