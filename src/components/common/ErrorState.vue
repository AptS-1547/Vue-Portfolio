<template>
  <div class="text-center py-12 animate-fade-in">
    <div class="text-gray-400 text-6xl mb-4 flex justify-center">
      <component v-if="iconComponent" :is="iconComponent" class="w-16 h-16" />
      <span v-else>{{ icon }}</span>
    </div>
    <h3 class="text-xl font-semibold text-gray-600 mb-2">
      {{ displayTitle }}
    </h3>
    <p class="text-gray-500 mb-4">
      {{ displayMessage }}
    </p>
    <slot name="action">
      <router-link
        v-if="showBackButton"
        :to="backRoute"
        class="inline-flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors duration-200"
      >
        <span class="mr-2">←</span>
        {{ displayBackText }}
      </router-link>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Component } from 'vue'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    icon?: string
    iconComponent?: Component
    title?: string
    message?: string
    showBackButton?: boolean
    backRoute?: string
    backText?: string
  }>(),
  {
    icon: '🔍',
    showBackButton: true,
    backRoute: '/',
  },
)

// 使用 computed 提供国际化的默认值
const displayTitle = computed(() => props.title || t('common.errors.notFound'))
const displayMessage = computed(() => props.message || t('common.errors.resourceNotFound'))
const displayBackText = computed(() => props.backText || t('common.buttons.goBack'))
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
