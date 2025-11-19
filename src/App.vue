<template>
  <div>
    <AppHeader />
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in" @enter="onPageEnter" @leave="onPageLeave">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import { generateCSSVariables } from '@/config/theme'
import { onMounted, nextTick } from 'vue'

// 在组件挂载时应用 CSS 变量
onMounted(() => {
  const cssVariables = generateCSSVariables()
  const root = document.documentElement

  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
})

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
