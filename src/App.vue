<template>
  <div>
    <Navigation />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
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

/* 页面过渡动画 - 修复滚动条问题 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-x: hidden;
  min-height: 100vh;
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
  background: linear-gradient(to bottom, #ed9a28, #6dd0e0);
  border-radius: 4px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #6dd0e0, #ed9a28);
}

/* 全局平滑滚动 */
html {
  scroll-behavior: smooth;
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
  outline: 2px solid #ed9a28;
  outline-offset: 2px;
  border-radius: 4px;
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
