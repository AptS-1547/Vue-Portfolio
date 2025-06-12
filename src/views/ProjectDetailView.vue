<template>
  <!-- 导航栏 -->
  <Navigation />

  <main class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- 返回按钮 -->
      <div class="mb-6 animate-fade-in-up">
        <router-link
          to="/projects"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <span class="mr-2">←</span>
          <span>Back to Projects</span>
        </router-link>
      </div>

      <!-- 项目不存在提示 -->
      <div v-if="!project" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Project not found</h3>
        <p class="text-gray-500">The project you're looking for doesn't exist.</p>
      </div>

      <!-- 项目详情 -->
      <div v-else class="space-y-8">
        <!-- 项目头部 -->
        <div class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 animate-fade-in-up">
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <div :class="statusColor" class="w-3 h-3 rounded-full"></div>
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">{{
                  project.status.replace('-', ' ')
                }}</span>
                <span class="text-sm text-gray-400">{{ project.language }}</span>
                <LicenseDisplay :license="project.license || 'MIT'" />
              </div>
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{{ project.title }}</h1>
              <p class="text-lg text-gray-600 leading-relaxed">{{ project.description }}</p>
            </div>
          </div>

          <!-- 技术标签 -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              :href="project.githubUrl"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              <span class="mr-2">💻</span>
              <span>View on GitHub</span>
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              <span class="mr-2">🚀</span>
              <span>Live Demo</span>
            </a>
          </div>
        </div>

        <!-- 项目详细描述 -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 animate-fade-in-up animate-delay-200"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-600 leading-relaxed mb-4">
              {{ project.longDescription || project.description }}
            </p>
            <div v-if="project.features" class="mt-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul class="space-y-2">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex items-start space-x-2"
                >
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-600">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 技术栈详情 -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 animate-fade-in-up animate-delay-400"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Technical Stack</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="project.techStack?.backend" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-800">Backend</h3>
              <div class="space-y-2">
                <div
                  v-for="tech in project.techStack.backend"
                  :key="tech.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-600">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
            <div v-if="project.techStack?.frontend" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-800">Frontend</h3>
              <div class="space-y-2">
                <div
                  v-for="tech in project.techStack.frontend"
                  :key="tech.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-600">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
            <div v-if="project.techStack?.tools" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-800">Tools & DevOps</h3>
              <div class="space-y-2">
                <div
                  v-for="tech in project.techStack.tools"
                  :key="tech.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-600">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 性能指标（如果有） -->
        <div
          v-if="project.performance"
          class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 animate-fade-in-up animate-delay-600"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="metric in project.performance"
              :key="metric.name"
              class="text-center p-4 bg-gray-50 rounded-lg"
            >
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ metric.value }}</div>
              <div class="text-sm text-gray-600">{{ metric.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
import LicenseDisplay from '@/components/LicenseDisplay.vue'
import { projects, type Project } from '@/data/projects'

const route = useRoute()
const projectId = computed(() => route.params.id as string)

const projectsData = ref<Project[]>(projects)
const project = computed(() => projectsData.value.find((p) => p.id === projectId.value))

const statusColor = computed(() => {
  if (!project.value) return 'bg-gray-400'
  switch (project.value.status) {
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
</script>

<style scoped>
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
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
</style>
