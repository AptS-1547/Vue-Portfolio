<template>
  <!-- 左侧个人信息栏 - 移动端顶部，桌面端固定 -->
  <div
    class="lg:fixed lg:left-0 lg:top-16 lg:w-1/3 lg:h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-800 p-4 lg:p-8 flex flex-col items-center justify-center overflow-x-hidden"
  >
    <!-- 头像 -->
    <div
      ref="avatarRef"
      class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 lg:mb-6 flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105"
      :style="avatarStyle"
      @mousemove="handleAvatarMouseMove"
      @mouseleave="handleAvatarMouseLeave"
    >
      <img
        :src="personalInfo.avatar.url"
        :alt="personalInfo.avatar.alt"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 基本信息 -->
    <div class="text-center space-y-2 lg:space-y-4">
      <h1
        class="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-[var(--color-primary)] transition-colors duration-200"
      >
        {{ personalInfo.name }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm lg:text-base">{{ personalInfo.title }}</p>
      <p class="text-xs lg:text-sm text-gray-500 dark:text-gray-400 px-2 lg:px-0">
        {{ personalInfo.tagline }}
      </p>

      <!-- 联系方式 -->
      <div class="pt-2 lg:pt-4 space-y-2">
        <div
          class="flex items-center justify-center space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] transition-colors duration-200"
        >
          <EnvelopeIcon class="w-4 h-4" />
          <span class="break-all">{{ personalInfo.email }}</span>
        </div>
      </div>

      <!-- 社交链接 -->
      <div class="flex justify-center space-x-3 lg:space-x-4 pt-2 lg:pt-4">
        <a
          v-for="social in personalInfo.socialLinks"
          :key="social.name"
          :href="social.url"
          :title="social.name"
          class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110"
          :style="{ '--hover-color': social.hoverColor }"
          @mouseenter="handleSocialHover($event, true)"
          @mouseleave="handleSocialHover($event, false)"
        >
          <component
            :is="getIconComponent(social.icon)"
            class="w-4 h-4 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'
import { useHoverEffect } from '@/utils/hoverEffect'
import type { PersonalInfo } from '@/types/profile'
import { EnvelopeIcon, DocumentTextIcon, RssIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'

defineProps<{
  personalInfo: PersonalInfo
}>()

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
  boxShadow: `0 0 20px rgba(var(--color-primary-rgb), ${Math.abs(avatarTilt.value.x) / 50}), 0 0 40px rgba(var(--color-secondary-rgb), ${Math.abs(avatarTilt.value.y) / 50})`,
}))

// 头像鼠标移动事件（视差效果）
const handleAvatarMouseMove = (event: MouseEvent) => {
  if (!avatarRef.value) return

  const rect = avatarRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX - centerX
  const mouseY = event.clientY - centerY

  // 限制倾斜角度在 -10 到 10 度之间
  avatarTilt.value.x = Math.max(-10, Math.min(10, (mouseX / rect.width) * 20))
  avatarTilt.value.y = Math.max(-10, Math.min(10, -(mouseY / rect.height) * 20))
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
</script>
