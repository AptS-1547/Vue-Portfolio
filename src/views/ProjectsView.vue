<template>
  <main class="min-h-screen bg-gray-50 py-8 px-4 xl:px-8 2xl:px-16 overflow-x-hidden pt-24">
    <div class="max-w-6xl mx-auto w-full">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-hero-entrance">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-title-emerge">
          My Projects
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto animate-subtitle-flow">
          A collection of my open-source projects and technical contributions, spanning from
          high-performance backend services to modern frontend applications.
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
          No projects found
        </h3>
        <p class="text-gray-500 animate-empty-text">
          Try adjusting your filters to see more projects.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { projects } from '@/data/projects'
import { getTagColor } from '@/utils/colorHash'
import type { Project } from '@/types/project'

const projectsData = ref<Project[]>(projects)
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
/* 现代动画关键帧 */
@keyframes heroEntrance {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes titleEmerge {
  0% {
    opacity: 0;
    transform: translateY(-30px) scale(0.8);
    filter: blur(10px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.02);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes subtitleFlow {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes filterSlide {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes gridEntrance {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes cardFloat {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.8) rotateX(30deg);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.02) rotateX(-5deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}

@keyframes emptyState {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes searchBounce {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
}

@keyframes emptyTitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes emptyText {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 动画类 */
.animate-hero-entrance {
  animation: heroEntrance 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-title-emerge {
  animation: titleEmerge 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-subtitle-flow {
  animation: subtitleFlow 0.3s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-filter-slide {
  animation: filterSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-grid-entrance {
  animation: gridEntrance 0.2s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-card-float {
  animation: cardFloat 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

.animate-empty-state {
  animation: emptyState 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.animate-search-bounce {
  animation: searchBounce 1.5s ease-in-out infinite;
  animation-delay: 0.6s;
}

.animate-empty-title {
  animation: emptyTitle 0.2s ease-out forwards;
  animation-delay: 0.7s;
  opacity: 0;
}

.animate-empty-text {
  animation: emptyText 0.2s ease-out forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

/* 移动端优化 */
.touch\:scale-105:hover,
.touch\:-translate-y-0\.5:hover {
  transform: none;
}
</style>
