<template>
  <div v-if="isOpen" class="app-modal">
    <MyCard
      class="app-modal__body"
      v-click-outside="{ handler: closeModal, isShown: isOpen }"
    >
      <div class="app-modal__content">
        <slot>
          <h4>
            {{ $t('shared.confirm') + '?'}}
          </h4>
        </slot>
      </div>
      <img v-if="!confirmMode" @click="closeModal" src="../../assets/icons/UI/close.svg" class="app-modal__close" />
      <div v-else class="app-modal__confirmation">
        <MyButton severity="danger" @click="cancelAction">{{ $t('shared.cancel') }}</MyButton>
        <MyButton severity="success" @click="confirmAction">{{ $t('shared.confirm') }}</MyButton>
      </div>
    </MyCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, withDefaults } from 'vue';
import MyButton from '../global/MyButton.vue';

interface Props {
  isOpen: boolean,
  confirmMode?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  confirmMode: false,
});

const emit = defineEmits(['update:isOpen', 'confirm', 'cancel']);

function closeModal() {
  console.log('On Close');

  emit('update:isOpen', false);
}

function confirmAction() {
  emit('confirm');
  closeModal();
}

function cancelAction() {
  emit('cancel');
  closeModal();
}

watch(() => props.isOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});
</script>

<style lang="scss">
.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0002;

  &__body {
    width: 400px;
    position: relative;

    @include phone {
      width: 90%;
    }
  }

  &__content {
    margin-bottom: 20px;
  }

  &__close {
    position: absolute;
    height: 25px;
    width: 25px;
    top: 20px;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    border-radius: 50%;
  }

  &__confirmation {
    display: flex;
    justify-content: space-between;
  }
}
</style>
