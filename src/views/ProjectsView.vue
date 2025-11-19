<template>
  <main class="min-h-screen bg-gray-50 py-8 px-4 xl:px-8 2xl:px-16 overflow-x-hidden pt-24">
    <div class="max-w-6xl mx-auto w-full">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-hero-entrance">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-title-emerge">
          {{ $t('profile.pages.projects.title') }}
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto animate-subtitle-flow">
          {{ $t('profile.pages.projects.subtitle') }}
        </p>
      </div>

      <!-- 项目筛选 -->
      <div class="mb-8 animate-filter-slide overflow-x-hidden">
        <div class="flex flex-wrap justify-center gap-2 mb-6 w-full">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 border border-gray-200 hover:shadow-md relative overflow-hidden"
            :class="selectedTags.includes(tag) ? 'shadow-lg scale-105' : ''"
            :style="getButtonStyle(tag)"
            @mouseenter="handleMouseEnter($event, tag)"
            @mouseleave="handleMouseLeave($event, tag)"
          >
            <!-- 选中状态的背景叠加 -->
            <div
              v-if="selectedTags.includes(tag)"
              class="absolute inset-0 rounded-full transition-all duration-200"
              :style="{ backgroundColor: getTagColor(tag).selectedBackgroundColor }"
            ></div>
            <span class="relative z-10">{{ tag }}</span>
          </button>
        </div>
      </div>

      <!-- 项目网格 -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid-entrance w-full"
      >
        <ProjectCard
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          :project="project"
          class="animate-card-float"
          :style="{ animationDelay: `${index * 0.05}s` }"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12 animate-empty-state">
        <div class="flex justify-center text-gray-400 mb-4 animate-search-bounce">
          <MagnifyingGlassIcon class="w-16 h-16" />
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2 animate-empty-title">
          {{ $t('common.errors.noProjects') }}
        </h3>
        <p class="text-gray-500 animate-empty-text">
          {{ $t('common.errors.noProjectsMessage') }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useProjectsI18n } from '@/composables/useProjectsI18n'
import { getTagColor } from '@/utils/colorHash'

const { projects } = useProjectsI18n()
const projectsData = computed(() => projects.value)
const selectedTags = ref<string[]>([])

const allTags = computed(() => {
  const tags = new Set<string>()
  projectsData.value.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  if (selectedTags.value.length === 0) {
    return projectsData.value
  }
  return projectsData.value.filter((project) =>
    selectedTags.value.some((tag) => project.tags.includes(tag)),
  )
})

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 计算按钮样式
const getButtonStyle = (tag: string) => {
  const colors = getTagColor(tag)
  const isSelected = selectedTags.value.includes(tag)

  return {
    backgroundColor: colors.backgroundColor,
    color: isSelected ? colors.selectedTextColor : colors.textColor,
    borderColor: isSelected ? colors.textColor + '40' : 'transparent',
  }
}

// 处理鼠标悬停
const handleMouseEnter = (event: Event, tag: string) => {
  if (selectedTags.value.includes(tag)) return

  const target = event.target as HTMLElement
  const colors = getTagColor(tag)
  target.style.backgroundColor = colors.hoverBackgroundColor
  target.style.color = 'white'
}

// 处理鼠标离开
const handleMouseLeave = (event: Event, tag: string) => {
  if (selectedTags.value.includes(tag)) return

  const target = event.target as HTMLElement
  const colors = getTagColor(tag)
  target.style.backgroundColor = colors.backgroundColor
  target.style.color = colors.textColor
}

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

/* 筛选器滑入动画 */
.animate-filter-slide {
  animation: scaleInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

/* 网格入场动画 */
.animate-grid-entrance {
  animation: scaleIn var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

/* 卡片浮动动画 */
.animate-card-float {
  animation: cardFloat var(--animation-duration-slower) var(--animation-easing-bounce) forwards;
  opacity: 0;
}

/* 空状态动画 */
.animate-empty-state {
  animation: scaleIn var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.animate-search-bounce {
  animation: bounce 1.5s ease-in-out infinite;
  animation-delay: 0.6s;
}

.animate-empty-title {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.7s;
  opacity: 0;
}

.animate-empty-text {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

/* 移动端优化 - 禁用悬停效果 */
@media (hover: none) {
  .touch\:hover\:scale-100:hover,
  .touch\:hover\:translate-y-0:hover {
    transform: none;
  }
}
</style>
