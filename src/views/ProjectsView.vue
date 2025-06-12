<template>
  <!-- 导航栏 -->
  <Navigation />

  <main class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-12 animate-fade-in-up">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          A collection of my open-source projects and technical contributions, spanning from
          high-performance backend services to modern frontend applications.
        </p>
      </div>

      <!-- 项目筛选 -->
      <div class="mb-8 animate-fade-in-up animate-delay-200">
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200',
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- 项目网格 -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animate-delay-400"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          class="animate-fade-in-up"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
        <p class="text-gray-500">Try adjusting your filters to see more projects.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import Navigation from '@/components/Navigation.vue'
import { projects, type Project } from '@/data/projects'

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
</script>

<style scoped>
/* 自定义样式 */
.bg-gray-50 {
  background-color: #f9fafb;
}

.border-gray-300 {
  border-color: #dee2e6;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-400 {
  animation-delay: 0.4s;
}

.animate-delay-600 {
  animation-delay: 0.6s;
}

.animate-delay-800 {
  animation-delay: 0.8s;
}

.animate-delay-1000 {
  animation-delay: 1s;
}

.animate-delay-1200 {
  animation-delay: 1.2s;
}

.animate-delay-1400 {
  animation-delay: 1.4s;
}

.animate-delay-1600 {
  animation-delay: 1.6s;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 移动端优化 */
@media (max-width: 1024px) {
  .animate-slide-in-left {
    animation: fadeInUp 1s ease-out forwards;
  }

  /* 禁用移动端悬停效果 */
  @media (hover: none) {
    .hover\:scale-110:hover {
      transform: none;
    }

    .hover\:scale-125:hover {
      transform: none;
    }

    .hover\:-translate-y-1:hover {
      transform: none;
    }

    .hover\:-translate-y-2:hover {
      transform: none;
    }
  }
}

/* 确保移动端文本不会过小 */
@media (max-width: 640px) {
  .text-xs {
    font-size: 0.75rem;
  }
}
</style>
