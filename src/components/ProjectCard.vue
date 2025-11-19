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
/* 现代动画关键帧 */
@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}

@keyframes statusBar {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes statusPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@keyframes statusText {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes languageBadge {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes titleSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes descriptionFade {
  from {
    opacity: 0;
    transform: translateY(15px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes tagsFlow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tagPop {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes actionsSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes buttonsStagger {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes buttonBounce {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes licenseFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 动画类 */
.animate-card-entrance {
  animation: cardEntrance 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
}

.animate-status-bar {
  animation: statusBar 0.2s ease-out forwards;
  animation-delay: 0.05s;
  opacity: 0;
}

.animate-status-pulse {
  animation: statusPulse 1.5s ease-in-out infinite;
}

.animate-status-text {
  animation: statusText 0.2s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-language-badge {
  animation: languageBadge 0.2s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-title-slide {
  animation: titleSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.15s;
  opacity: 0;
}

.animate-description-fade {
  animation: descriptionFade 0.3s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-tags-flow {
  animation: tagsFlow 0.2s ease-out forwards;
  animation-delay: 0.25s;
  opacity: 0;
}

.animate-tag-pop {
  animation: tagPop 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.animate-actions-slide {
  animation: actionsSlide 0.2s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-buttons-stagger {
  animation: buttonsStagger 0.2s ease-out forwards;
  opacity: 0;
}

.animate-button-bounce {
  animation: buttonBounce 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.animate-license-fade {
  animation: licenseFade 0.2s ease-out forwards;
  animation-delay: 0.35s;
  opacity: 0;
}
</style>
