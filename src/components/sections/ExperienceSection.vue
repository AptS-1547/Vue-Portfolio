<template>
  <section
    ref="sectionRef"
    class="opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 lg:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
    >
      {{ experience.title }}
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
      ></span>
    </h2>
    <div class="space-y-4 lg:space-y-6">
      <div
        v-for="position in experience.positions"
        :key="`${position.company}-${position.period}`"
        class="bg-white dark:bg-gray-900 p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200"
        :style="{ '--hover-border': position.hoverColor }"
        @mouseenter="handlePositionHover($event, position, true)"
        @mouseleave="handlePositionHover($event, position, false)"
      >
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
          <h3
            class="font-semibold text-gray-800 dark:text-gray-100 text-sm lg:text-base transition-colors duration-200"
            :style="{ '--hover-text': position.hoverColor }"
          >
            {{ position.title }}
          </h3>
          <span class="text-xs lg:text-sm text-gray-500 dark:text-gray-500 mt-1 lg:mt-0">{{
            position.period
          }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-2 text-sm lg:text-base">
          {{ position.company }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed">
          {{ position.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHoverEffect } from '@/utils/hoverEffect'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import type { Experience, Position } from '@/types/profile'

defineProps<{
  experience: Experience
  animationDelay?: string // 保留 prop 以兼容，但不再使用
}>()

const { handleCompoundHover } = useHoverEffect()
const sectionRef = ref<HTMLElement>()
useScrollAnimation(sectionRef, { threshold: 0.2, once: true })

// 职位经历悬停
const handlePositionHover = (event: Event, position: Position, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  handleCompoundHover(target, 'h3', position.hoverColor, isEnter)
}
</script>

<style scoped>
/* 样式已迁移到 Tailwind 类名中，无需额外样式 */
</style>
