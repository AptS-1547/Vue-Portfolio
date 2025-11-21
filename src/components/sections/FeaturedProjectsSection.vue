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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <div
        v-for="(project, index) in featuredProjects.projects"
        :key="project.id"
        :ref="
          (el) => {
            if (el) cardRefs[index] = el as HTMLElement
          }
        "
        class="relative group transition-all duration-500 ease-out rounded-2xl cursor-pointer animate-fade-in-up shadow-lg hover:shadow-2xl"
        :style="{ animationDelay: `${index * 150}ms` }"
        @mouseenter="handleProjectHover($event, project, true)"
        @mouseleave="handleProjectHover($event, project, false)"
      >
        <!-- 玻璃态背景 -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl"
        ></div>

        <!-- 渐变边框 -->
        <div
          class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          :style="{
            background: `linear-gradient(135deg, ${project.hoverColor}30, ${project.hoverColor}10)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }"
        ></div>

        <!-- 内容区域 -->
        <div
          class="relative h-full flex flex-col p-5 lg:p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl transition-all duration-500 overflow-hidden"
        >
          <h3
            class="font-bold text-gray-800 dark:text-gray-100 mb-3 text-base lg:text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 group-hover:from-[var(--hover-color)] group-hover:to-[var(--hover-color)] transition-all duration-500"
            :style="{ '--hover-color': project.hoverColor }"
          >
            {{ project.title }}
          </h3>
          <p
            class="text-gray-700 dark:text-gray-300 text-xs lg:text-sm mb-4 leading-relaxed flex-grow"
          >
            {{ project.description }}
          </p>

          <!-- 技术标签 -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <Tag v-for="tag in project.tags" :key="tag" variant="auto" :label="tag" />
          </div>

          <!-- 查看详情链接 - 渐变文字 -->
          <router-link
            :to="`/projects/${project.id}`"
            class="inline-flex items-center text-xs lg:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 group/link"
            :style="{
              backgroundImage: `linear-gradient(to right, ${project.hoverColor}, ${project.hoverColor}DD)`,
            }"
          >
            <span>{{ project.linkText }}</span>
            <span class="ml-1 transition-transform duration-300 group-hover/link:translate-x-2"
              >→</span
            >
          </router-link>
        </div>
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
import Tag from '@/components/ui/Tag.vue'
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
