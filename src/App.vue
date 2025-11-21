<template>
  <div class="relative">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">
      {{ t('common.accessibility.skipToContent') }}
    </a>

    <div class="relative z-10">
      <AppHeader />

      <main id="main-content" tabindex="-1">
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in" @enter="onPageEnter" @leave="onPageLeave">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 页面进入动画开始时
const onPageEnter = () => {
  // 确保页面在动画开始时就在顶部
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

// 页面离开动画开始时
const onPageLeave = () => {
  // 可以在这里添加离开页面时的处理逻辑
}
</script>

<style>
/* Skip to main content link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  font-weight: 500;
  z-index: 9999;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Main content area */
#main-content:focus {
  outline: none;
}

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-x: hidden;
  min-height: calc(100vh - 4rem);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-enter-active {
  overflow-y: hidden;
}

.page-enter-active *,
.page-leave-active * {
  max-width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .page-enter-active,
  .page-leave-active {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
