<template>
  <div>
    <Navigation />
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in" @enter="onPageEnter" @leave="onPageLeave">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
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
/* 防止页面切换时出现滚动条闪烁 */
html,
body {
  overflow-x: hidden;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  overflow-x: hidden;
}

/* 确保页面内容不被固定导航栏遮挡 */
body {
  padding-top: 0; /* 移除可能的默认padding */
}

/* 页面过渡动画 - 修复滚动条问题 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-x: hidden;
  min-height: calc(100vh - 4rem); /* 减去导航栏高度 */
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

/* 确保页面过渡期间滚动位置正确 */
.page-enter-active {
  /* 禁止页面进入时的滚动 */
  overflow-y: hidden;
}

/* 确保过渡期间容器不溢出 */
.page-enter-active *,
.page-leave-active * {
  max-width: 100%;
  box-sizing: border-box;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-primary-reverse);
}

/* 全局平滑滚动 */
html {
  scroll-behavior: smooth;
  /* 在页面切换时强制滚动到顶部 */
  scroll-padding-top: 64px; /* 导航栏高度 */
}

/* 为主要内容区域添加滚动控制 */
main {
  scroll-margin-top: 64px; /* 导航栏高度 */
}

/* 防止动画期间的水平滚动 */
* {
  box-sizing: border-box;
}

*:not(html):not(body) {
  max-width: 100%;
}

/* 减少运动偏好设置 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 高对比度支持 */
@media (prefers-contrast: high) {
  * {
    filter: contrast(1.2);
  }
}

/* 焦点可见性增强 */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--border-radius-default);
}

/* 移动端特殊处理 */
@media (max-width: 768px) {
  body {
    overflow-x: hidden;
    width: 100%;
  }

  .page-enter-active,
  .page-leave-active {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
