<template>
  <div
    class="my-dropdown"
    :class="{ 'my-dropdown--opened': isOpen }"
    v-click-outside="{ handler: closeDropdown, isShown: isOpen }"
    @click="toggleDropdown"
  >
    <div class="my-dropdown__head">
      {{ selectedOptionLabel }}
    </div>

    <transition name="my-dropdown-transition" mode="out-in">
      <div v-if="isOpen" class="my-dropdown__options">
        <div
          v-for="option in options"
          :key="option.value"
          class="my-dropdown__option"
          @click="selectOption(option)"
        >
          {{ option.label }}c
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineOptions, defineProps, defineEmits } from 'vue';

defineOptions({
  name: 'MyDropdown',
});

interface Props {
  modelValue: string | number,
  options: Array<{ value: string, label: string }>,
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'change']);
const isOpen = ref(false);

const selectedOptionLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === props.modelValue);
  return selectedOption ? selectedOption.label : 'Select an option';
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function selectOption(option: { value: string | number; label: string }) {
  if (props.modelValue !== option.value) {
    emit('update:modelValue', option.value);
    emit('change', option.value);
  }
}
</script>

<style lang="scss">
.my-dropdown {
  position: relative;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  cursor: pointer;
  background-color: #fff;
  min-width: 50px;

  &:hover {
    background-color: $surface-100;
  }

  &--opened {
    background-color: $surface-100;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: absolute;
    top: 40px;
    padding: 2px;
    background-color: #fff;
    border-radius: 6px;
    width: 100%;
    z-index: 100;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background-color: $surface-100;
      color: $surface-900;
    }
  }
}

.my-dropdown-transition-enter-from,
.my-dropdown-transition-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
.my-dropdown-transition-enter-active,
.my-dropdown-transition-leave-active {
  transition: all 0.3s;
}
.my-dropdown-transition-enter-to,
.my-dropdown-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
