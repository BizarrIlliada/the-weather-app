<template>
  <button :class="myButtonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults, defineOptions } from 'vue';

defineOptions({
  name: 'MyButton',
});

interface Props {
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger',
  rounded?: boolean,
  outlined?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'secondary',
  rounded: false,
  outlined: false,
});

const myButtonClasses = computed(() => {
  const classes = ['my-button', 'my-button--' + props.severity];

  if (props.rounded) {
    classes.push('my-button--rounded');
  }

  if (props.outlined) {
    classes.push('my-button--' + props.severity + '--outlined');
    classes.push('my-button--outlined');
  }

  return classes;
});
</script>

<style lang="scss">
.my-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  gap: 4px;

  padding: 8px 12px;
  height: 36px;
  border: 1px solid;
  border-radius: 8px;
  color: $surface-0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  
  &--primary {
    background-color: $primary-600;
    border-color: $primary-600;

    &:hover {
      background-color: $primary-700;
      border-color: $primary-700;
    }

    &--outlined {
      border-color: $primary-600;
      color: $primary-600;

      &:hover {
        background-color: $primary-100;
        border-color: $primary-700;
        color: $primary-700;
      }
    }
  }

  &--secondary {
    background-color: $surface-600;
    border-color: $surface-600;

    &:hover {
      background-color: $surface-700;
      border-color: $surface-700;
    }

    &--outlined {
      border-color: $surface-600;
      color: $surface-600;

      &:hover {
        background-color: $surface-100;
        border-color: $surface-700;
        color: $surface-700;
      }
    }
  }

  &--success {
    background-color: $green-600;
    border-color: $green-600;

    &:hover {
      background-color: $green-700;
      border-color: $green-700;
    }

    &--outlined {
      border-color: $green-600;
      color: $green-600;

      &:hover {
        background-color: $green-100;
        border-color: $green-700;
        color: $green-700;
      }
    }
  }

  &--info {
    background-color: $indigo-600;
    border-color: $indigo-600;

    &:hover {
      background-color: $indigo-700;
      border-color: $indigo-700;
    }

    &--outlined {
      border-color: $indigo-600;
      color: $indigo-600;

      &:hover {
        background-color: $indigo-100;
        border-color: $indigo-700;
        color: $indigo-700;
      }
    }
  }

  &--warning {
    background-color: $orange-600;
    border-color: $orange-600;

    &:hover {
      background-color: $orange-700;
      border-color: $orange-700;
    }

    &--outlined {
      border-color: $orange-600;
      color: $orange-600;

      &:hover {
        background-color: $orange-100;
        border-color: $orange-700;
        color: $orange-700;
      }
    }
  }

  &--help {
    background-color: $yellow-600;
    border-color: $yellow-600;

    &:hover {
      background-color: $yellow-700;
      border-color: $yellow-700;
    }

    &--outlined {
      border-color: $yellow-600;
      color: $yellow-600;

      &:hover {
        background-color: $yellow-100;
        border-color: $yellow-700;
        color: $yellow-700;
      }
    }
  }

  &--danger {
    background-color: $red-600;
    border-color: $red-600;

    &:hover {
      background-color: $red-700;
      border-color: $red-700;
    }

    &--outlined {
      border-color: $red-600;
      color: $red-600;

      &:hover {
        background-color: $red-100;
        border-color: $red-700;
        color: $red-700;
      }
    }
  }

  &--rounded {
    border-radius: 38px;
  }
  
  &--outlined {
    background-color: transparent;
  }
}
</style>
