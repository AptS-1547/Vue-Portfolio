<template>
  <!-- 左侧个人信息栏 - 移动端顶部，桌面端固定 -->
  <div
    class="lg:fixed lg:left-0 lg:top-16 lg:w-1/3 lg:h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-800 p-4 lg:p-8 flex flex-col items-center justify-center overflow-x-hidden"
  >
    <!-- 头像 -->
    <div
      class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 lg:mb-6 flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105"
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
          class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all duration-200"
          :style="{ '--hover-color': social.hoverColor }"
          @mouseenter="handleSocialHover($event, true)"
          @mouseleave="handleSocialHover($event, false)"
        >
          <component :is="getIconComponent(social.icon)" class="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { useHoverEffect } from '@/utils/hoverEffect'
import type { PersonalInfo } from '@/types/profile'
import { EnvelopeIcon, DocumentTextIcon, RssIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'

defineProps<{
  personalInfo: PersonalInfo
}>()

const { handleColorHover } = useHoverEffect()

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

// 社交链接悬停
const handleSocialHover = (event: Event, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const link = target.closest('a') as HTMLElement
  const hoverColor = link.style.getPropertyValue('--hover-color')

  handleColorHover(link, { backgroundColor: hoverColor, textColor: 'white' }, isEnter)
}
</script>
