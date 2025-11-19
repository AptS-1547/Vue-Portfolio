<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <div class="text-center max-w-md animate-fade-in-up">
      <!-- 404 数字 -->
      <h1
        class="text-9xl font-bold mb-4"
        :style="{
          background: `var(--gradient-primary)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }"
      >
        404
      </h1>

      <!-- 错误标题 -->
      <h2 class="text-2xl md:text-3xl font-bold mb-4" style="color: var(--color-text-primary)">
        {{ t('common.errors.notFound') }}
      </h2>

      <!-- 错误描述 -->
      <p class="text-base md:text-lg mb-8" style="color: var(--color-text-secondary)">
        {{ t('common.errors.resourceNotFound') }}
      </p>

      <!-- 返回按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          @click="router.push('/')"
          class="min-w-[140px]"
          variant="default"
        >
          {{ t('common.buttons.goBack') }}
        </Button>
        <Button
          @click="router.push('/projects')"
          class="min-w-[140px]"
          variant="outline"
        >
          {{ t('common.buttons.viewAll') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const router = useRouter()
</script>
