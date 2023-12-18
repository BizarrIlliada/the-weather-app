<template>
  <div class="my-card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
  name: 'MyCard',
})
</script>

<style lang="scss">
.my-card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid $surface-200;
  border-radius: 12px;
}
</style>
