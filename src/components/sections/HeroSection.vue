<template>
  <!-- Hero Section - 居中全宽布局 -->
  <section
    ref="sectionRef"
    class="w-full min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95 opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <div class="max-w-4xl mx-auto text-center">
      <!-- 头像 -->
      <div class="flex justify-center mb-6 lg:mb-8">
        <div
          ref="avatarRef"
          class="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 cursor-pointer relative"
          :style="avatarStyle"
          @mousemove="handleAvatarMouseMove"
          @mouseleave="handleAvatarMouseLeave"
        >
          <img
            :src="personalInfo.avatar.url"
            :alt="personalInfo.avatar.alt"
            class="w-full h-full object-cover"
          />
          <!-- 发光边框 -->
          <div
            class="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] opacity-0 transition-opacity duration-300 hover:opacity-50"
          ></div>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="space-y-3 lg:space-y-4">
        <!-- 姓名 -->
        <h1
          class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 hover:text-[var(--color-primary)] transition-colors duration-300 animate-fade-in"
        >
          {{ personalInfo.name }}
        </h1>

        <!-- 职位 -->
        <p
          class="text-lg lg:text-2xl text-gray-700 dark:text-gray-300 font-medium animate-fade-in-delay-1"
        >
          {{ personalInfo.title }}
        </p>

        <!-- 标语 -->
        <p
          class="text-sm lg:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2"
        >
          {{ personalInfo.tagline }}
        </p>

        <!-- 邮箱 -->
        <div class="flex items-center justify-center space-x-2 text-sm lg:text-base pt-2">
          <a
            :href="`mailto:${personalInfo.email}`"
            class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] transition-colors duration-200 group"
          >
            <EnvelopeIcon class="w-5 h-5 transition-transform group-hover:scale-110" />
            <span class="break-all">{{ personalInfo.email }}</span>
          </a>
        </div>

        <!-- 社交链接 -->
        <div
          class="flex justify-center items-center space-x-4 lg:space-x-6 pt-4 lg:pt-6 animate-fade-in-delay-3"
        >
          <a
            v-for="social in personalInfo.socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="social.name"
            class="group relative w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110"
            :style="{ '--hover-color': social.hoverColor }"
            @mouseenter="handleSocialHover($event, true)"
            @mouseleave="handleSocialHover($event, false)"
          >
            <component
              :is="getIconComponent(social.icon)"
              class="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110"
            />
            <!-- Tooltip -->
            <span
              class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {{ social.name }}
            </span>
          </a>
        </div>

        <!-- 向下滚动提示（可选） -->
        <div class="pt-8 lg:pt-12 animate-bounce">
          <button
            @click="scrollToContent"
            class="text-gray-400 dark:text-gray-500 hover:text-[var(--color-primary)] transition-colors"
            aria-label="Scroll to content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 lg:h-8 lg:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'
import { useHoverEffect } from '@/utils/hoverEffect'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import type { PersonalInfo } from '@/types/profile'
import { EnvelopeIcon, DocumentTextIcon, RssIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'

defineProps<{
  personalInfo: PersonalInfo
}>()

const sectionRef = ref<HTMLElement>()
useScrollAnimation(sectionRef, { threshold: 0.1, once: true })

const { handleColorHover } = useHoverEffect()
const avatarRef = ref<HTMLElement>()
const avatarTilt = ref({ x: 0, y: 0 })

// 图标映射
const iconComponents: Record<string, Component> = {
  DocumentTextIcon,
  RssIcon,
  CodeBracketIcon,
}

// 获取图标组件
const getIconComponent = (iconName: string) => {
  return iconComponents[iconName] || DocumentTextIcon
}

// 头像样式（带 3D 倾斜和发光）
const avatarStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${avatarTilt.value.y}deg) rotateY(${avatarTilt.value.x}deg)`,
  boxShadow: `0 0 30px rgba(var(--color-primary-rgb), ${Math.abs(avatarTilt.value.x) / 40}), 0 0 50px rgba(var(--color-secondary-rgb), ${Math.abs(avatarTilt.value.y) / 40})`,
}))

// 头像鼠标移动事件（视差效果）
const handleAvatarMouseMove = (event: MouseEvent) => {
  if (!avatarRef.value) return

  const rect = avatarRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX - centerX
  const mouseY = event.clientY - centerY

  // 限制倾斜角度在 -15 到 15 度之间
  avatarTilt.value.x = Math.max(-15, Math.min(15, (mouseX / rect.width) * 30))
  avatarTilt.value.y = Math.max(-15, Math.min(15, -(mouseY / rect.height) * 30))
}

// 头像鼠标离开事件（恢复原位）
const handleAvatarMouseLeave = () => {
  avatarTilt.value = { x: 0, y: 0 }
}

// 社交链接悬停
const handleSocialHover = (event: Event, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const link = target.closest('a') as HTMLElement
  const hoverColor = link.style.getPropertyValue('--hover-color')

  handleColorHover(link, { backgroundColor: hoverColor, textColor: 'white' }, isEnter)
}

// 滚动到内容区域
const scrollToContent = () => {
  window.scrollBy({
    top: window.innerHeight * 0.7,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.6s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.6s ease-out 0.6s forwards;
  opacity: 0;
}
</style>
