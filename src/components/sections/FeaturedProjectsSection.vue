<template>
  <section
    ref="sectionRef"
    class="opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <div class="flex justify-between items-center mb-3 lg:mb-4">
      <h2
        class="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
      >
        {{ featuredProjects.title }}
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
        ></span>
      </h2>
      <router-link
        :to="featuredProjects.viewAllLink.route"
        class="text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-200 hover:underline"
      >
        {{ featuredProjects.viewAllLink.text }}
      </router-link>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div
        v-for="(project, index) in featuredProjects.projects"
        :key="project.id"
        :ref="
          (el) => {
            if (el) cardRefs[index] = el as HTMLElement
          }
        "
        class="transition-all duration-500 ease-out bg-white dark:bg-gray-900 p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 group animate-fade-in-up"
        :style="{ '--hover-border': project.hoverColor, animationDelay: `${index * 150}ms` }"
        @mouseenter="handleProjectHover($event, project, true)"
        @mouseleave="handleProjectHover($event, project, false)"
      >
        <h3
          class="font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:transition-colors duration-200 text-sm lg:text-base"
          :style="{ '--hover-text': project.hoverColor }"
        >
          {{ project.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-3">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-1 mb-3">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2 py-1 rounded text-xs font-medium transition-all duration-200"
            :style="{
              backgroundColor: getTagColor(tag, isDark).backgroundColor,
              color: getTagColor(tag, isDark).textColor,
            }"
          >
            {{ tag }}
          </span>
        </div>
        <router-link
          :to="`/projects/${project.id}`"
          class="inline-flex items-center text-xs lg:text-sm transition-colors duration-200"
          :style="{ color: project.hoverColor }"
        >
          <span>{{ project.linkText }}</span>
          <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTagColor } from '@/utils/colorHash'
import { useHoverEffect } from '@/utils/hoverEffect'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import type { FeaturedProjects, FeaturedProject } from '@/types/profile'

defineProps<{
  featuredProjects: FeaturedProjects
  animationDelay?: string // 保留 prop 以兼容，但不再使用
}>()

const { handleCompoundHover } = useHoverEffect()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const sectionRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])
useScrollAnimation(sectionRef, { threshold: 0.2, once: true })

// 项目卡片悬停
const handleProjectHover = (event: Event, project: FeaturedProject, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  handleCompoundHover(target, 'h3', project.hoverColor, isEnter)
}
</script>

<style scoped>
/* 样式已迁移到 Tailwind 类名中，无需额外样式 */
</style>
