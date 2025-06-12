<template>
  <div
    class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 group"
  >
    <!-- 项目状态标识 -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center space-x-2">
        <div :class="statusColor" class="w-3 h-3 rounded-full"></div>
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{
          project.status.replace('-', ' ')
        }}</span>
      </div>
      <div class="text-xs text-gray-400">{{ project.language }}</div>
    </div>

    <!-- 项目标题和描述 -->
    <h3
      class="font-bold text-gray-800 text-lg mb-3 group-hover:text-blue-600 transition-colors duration-300"
    >
      {{ project.title }}
    </h3>

    <p class="text-gray-600 text-sm leading-relaxed mb-4">
      {{ project.longDescription || project.description }}
    </p>

    <!-- 技术标签 -->
    <div class="flex flex-wrap gap-1 mb-4">
      <span
        v-for="tag in project.tags.slice(0, 4)"
        :key="tag"
        class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-blue-100 transition-colors duration-200"
      >
        {{ tag }}
      </span>
      <span
        v-if="project.tags.length > 4"
        class="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs"
      >
        +{{ project.tags.length - 4 }}
      </span>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-between items-center pt-4 border-t border-gray-100">
      <router-link
        :to="`/projects/${project.id}`"
        class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1"
      >
        <span>View Details</span>
        <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
      </router-link>

      <div class="flex space-x-2">
        <a
          :href="project.githubUrl"
          target="_blank"
          class="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
          title="View on GitHub"
        >
          <span>💻</span>
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          class="inline-flex items-center text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
          title="Live Demo"
        >
          <span>🚀</span>
        </a>
      </div>
    </div>

    <!-- 许可证信息 -->
    <div class="flex items-center justify-between mt-4">
      <span class="text-xs text-gray-500">License:</span>
      <LicenseDisplay :license="project.license || 'MIT'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LicenseDisplay from './LicenseDisplay.vue'

interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  stars?: number
  language: string
  status: 'active' | 'archived' | 'in-development'
}

const props = defineProps<{
  project: Project
}>()

const statusColor = computed(() => {
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
</script>
