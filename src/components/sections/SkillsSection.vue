<template>
  <section
    ref="sectionRef"
    class="opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 lg:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
    >
      {{ skills.title }}
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
      ></span>
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      <div
        v-for="(category, index) in skills.categories"
        :key="category.name"
        :ref="
          (el) => {
            if (el) cardRefs[index] = el as HTMLElement
          }
        "
        class="transition-all duration-500 ease-out bg-white dark:bg-gray-900 p-3 lg:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 cursor-pointer group animate-fade-in-up"
        :style="{ '--hover-border': category.borderColor, animationDelay: `${index * 100}ms` }"
        @mouseenter="handleCategoryHover($event, category, true)"
        @mouseleave="handleCategoryHover($event, category, false)"
      >
        <h3
          class="font-medium text-gray-800 dark:text-gray-100 mb-2 text-sm lg:text-base group-hover:transition-colors duration-200"
          :style="{ '--hover-text': category.hoverColor }"
        >
          {{ category.name }}
        </h3>
        <div class="space-y-1">
          <span
            v-for="tech in category.technologies"
            :key="tech.name"
            class="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs lg:text-sm ml-1 first:ml-0 hover:text-white transition-all duration-200"
            :style="{ '--tech-hover': tech.hoverColor }"
            @mouseenter="handleTechHover($event, tech, true)"
            @mouseleave="handleTechHover($event, tech, false)"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHoverEffect } from '@/utils/hoverEffect'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import type { Skills, SkillCategory, Technology } from '@/types/profile'

const props = defineProps<{
  skills: Skills
  animationDelay?: string // 保留 prop 以兼容，但不再使用
}>()

const { handleColorHover, handleCompoundHover } = useHoverEffect()
const sectionRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])
useScrollAnimation(sectionRef, { threshold: 0.2, once: true })

// 技能类别悬停
const handleCategoryHover = (event: Event, category: SkillCategory, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  handleCompoundHover(target, 'h3', category.hoverColor, isEnter)
}

// 技术标签悬停
const handleTechHover = (event: Event, tech: Technology, isEnter: boolean) => {
  const target = event.target as HTMLElement
  handleColorHover(target, { backgroundColor: tech.hoverColor }, isEnter)
}
</script>

<style scoped>
/* 样式已迁移到 Tailwind 类名中，无需额外样式 */
</style>
