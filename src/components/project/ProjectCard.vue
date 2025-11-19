<template>
  <div
    class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-[var(--color-primary)] hover:-translate-y-1 hover:scale-105 touch:hover:translate-y-0 touch:hover:scale-100 transition-all duration-200 group animate-card-entrance w-full overflow-hidden"
  >
    <!-- 项目状态标识 -->
    <div class="flex justify-between items-start mb-4 animate-status-bar">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full animate-status-pulse" :class="statusColorClass"></div>
        <span
          class="text-xs font-medium text-gray-500 uppercase tracking-wide animate-status-text"
          >{{ project.status.replace('-', ' ') }}</span
        >
      </div>
      <div class="text-xs text-gray-400 animate-language-badge">{{ project.language }}</div>
    </div>

    <!-- 项目标题和描述 -->
    <h3
      class="font-bold text-gray-800 text-lg mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200 hover:scale-105 touch:hover:scale-100 animate-title-slide"
    >
      {{ project.title }}
    </h3>

    <p class="text-gray-600 text-sm leading-relaxed mb-4 animate-description-fade">
      {{ project.longDescription || project.description }}
    </p>

    <!-- 技术标签 -->
    <div class="flex flex-wrap gap-1 mb-4 animate-tags-flow w-full overflow-hidden">
      <span
        v-for="(tag, index) in project.tags.slice(0, 4)"
        :key="tag"
        class="px-2 py-1 rounded text-xs font-medium hover:scale-105 touch:hover:scale-100 transition-all duration-200 animate-tag-pop cursor-pointer"
        :style="{
          animationDelay: `${index * 0.05}s`,
          backgroundColor: getTagColor(tag).backgroundColor,
          color: getTagColor(tag).textColor,
        }"
        @mouseenter="handleTagHover($event, tag, true)"
        @mouseleave="handleTagHover($event, tag, false)"
      >
        {{ tag }}
      </span>
      <span
        v-if="project.tags.length > 4"
        class="bg-gray-100/60 text-gray-600 px-2 py-1 rounded text-xs animate-tag-pop"
        style="animation-delay: 0.2s"
      >
        +{{ project.tags.length - 4 }}
      </span>
    </div>

    <!-- 操作按钮 -->
    <div
      class="flex justify-between items-center pt-4 border-t border-gray-200 animate-actions-slide"
    >
      <router-link
        :to="`/projects/${project.id}`"
        class="inline-flex items-center text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-200 group-hover:translate-x-1"
      >
        <span>View Details</span>
        <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
      </router-link>

      <div class="flex space-x-2 animate-buttons-stagger">
        <a
          :href="project.githubUrl"
          target="_blank"
          class="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-[var(--color-primary)] hover:text-white hover:scale-105 touch:hover:scale-100 transition-all duration-200 group animate-button-bounce"
          title="View on GitHub"
          style="animation-delay: 0.05s"
        >
          <CodeBracketIcon class="w-4 h-4" />
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          class="inline-flex items-center text-xs bg-[image:var(--gradient-primary)] text-white px-2 py-1 rounded hover:bg-[image:var(--gradient-primary-reverse)] hover:scale-105 touch:hover:scale-100 transition-all duration-200 group animate-button-bounce"
          title="Live Demo"
          style="animation-delay: 0.1s"
        >
          <RocketLaunchIcon class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- 许可证信息 -->
    <div class="flex items-center justify-between mt-4 animate-license-fade">
      <span class="text-xs text-gray-500">License:</span>
      <LicenseDisplay :license="project.license || 'MIT'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LicenseDisplay from './LicenseDisplay.vue'
import { getTagColor } from '@/utils/colorHash'
import { useHoverEffect } from '@/composables/useHoverEffect'
import { CodeBracketIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

// 使用统一的悬停效果 composable
const { handleColorHover } = useHoverEffect()

// 修复状态颜色计算
const statusColorClass = computed(() => {
  switch (props.project.status) {
    case 'active':
      return 'bg-green-400'
    case 'in-development':
      return 'bg-yellow-400'
    case 'archived':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
})

// 处理标签悬停（使用 composable）
const handleTagHover = (event: Event, tag: string, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const colors = getTagColor(tag)

  const hoverColors = isEnter
    ? { backgroundColor: colors.hoverBackgroundColor, textColor: 'white' }
    : { backgroundColor: colors.backgroundColor, textColor: colors.textColor }

  handleColorHover(target, hoverColors, isEnter)
}
</script>

<style scoped>
/* ProjectCard 特有样式 - 所有通用动画已移至全局 */

/* 卡片入场动画 */
.animate-card-entrance {
  animation: cardEntrance var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  opacity: 0;
}

/* 状态栏动画 */
.animate-status-bar {
  animation: fadeInDown var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.05s;
  opacity: 0;
}

.animate-status-pulse {
  animation: statusPulse 1.5s ease-in-out infinite;
}

.animate-status-text {
  animation: fadeInLeft var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-language-badge {
  animation: fadeInRight var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

/* 标题动画 */
.animate-title-slide {
  animation: fadeInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  animation-delay: 0.15s;
  opacity: 0;
}

/* 描述动画 */
.animate-description-fade {
  animation: blurUp var(--animation-duration-slow) ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

/* 标签流动画 */
.animate-tags-flow {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.25s;
  opacity: 0;
}

.animate-tag-pop {
  animation: bounceIn var(--animation-duration-normal) var(--animation-easing-bounce) forwards;
  opacity: 0;
}

/* 操作按钮动画 */
.animate-actions-slide {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-buttons-stagger {
  animation: fadeInRight var(--animation-duration-normal) ease-out forwards;
  opacity: 0;
}

.animate-button-bounce {
  animation: bounceIn var(--animation-duration-normal) var(--animation-easing-bounce) forwards;
  opacity: 0;
}

/* 许可证信息动画 */
.animate-license-fade {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.35s;
  opacity: 0;
}
</style>
