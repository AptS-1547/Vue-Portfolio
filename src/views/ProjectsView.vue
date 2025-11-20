<template>
  <main
    class="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 xl:px-8 2xl:px-16 overflow-x-hidden pt-24"
  >
    <div class="max-w-6xl mx-auto w-full">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-hero-entrance">
        <h1
          class="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-title-emerge"
        >
          {{ $t('profile.pages.projects.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto animate-subtitle-flow">
          {{ $t('profile.pages.projects.subtitle') }}
        </p>
      </div>

      <!-- 项目网格 -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid-entrance w-full"
      >
        <ProjectCard
          v-for="(project, index) in sortedProjects"
          :key="project.id"
          :project="project"
          class="animate-card-float"
          :style="{ animationDelay: `${index * 0.05}s` }"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import { useProjectsI18n } from '@/composables/useProjectsI18n'

const { projects } = useProjectsI18n()

// 按项目状态排序：active > in-development > planned > archived
const sortedProjects = computed(() => {
  const statusPriority: Record<string, number> = {
    active: 1,
    'in-development': 2,
    planned: 3,
    archived: 4,
  }

  return [...projects.value].sort((a, b) => {
    const priorityA = statusPriority[a.status] || 999
    const priorityB = statusPriority[b.status] || 999
    return priorityA - priorityB
  })
})

// 确保页面加载时在正确位置
onMounted(() => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})
</script>

<style scoped>
/* ProjectsView 特有样式 - 所有通用动画已移至全局 */

/* Hero 入场动画 */
.animate-hero-entrance {
  animation: scaleIn var(--animation-duration-slower) var(--animation-easing-ease-in-out) forwards;
}

/* 标题动画 */
.animate-title-emerge {
  animation: bounceIn var(--animation-duration-slow) var(--animation-easing-bounce) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

/* 副标题动画 */
.animate-subtitle-flow {
  animation: blurUp var(--animation-duration-slow) ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

/* 网格入场动画 */
.animate-grid-entrance {
  animation: scaleIn var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

/* 卡片浮动动画 - 移除 opacity: 0，避免卡片不显示 */
.animate-card-float {
  animation: cardFloat var(--animation-duration-slower) var(--animation-easing-bounce) forwards;
}
</style>
