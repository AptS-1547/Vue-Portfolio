<template>
  <section
    ref="sectionRef"
    class="opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 lg:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
    >
      {{ aboutMe.title }}
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
      ></span>
    </h2>
    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm lg:text-base">
      {{ aboutMe.content }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AboutMe } from '@/types/profile'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineProps<{
  aboutMe: AboutMe
  animationDelay?: string // 保留 prop 以兼容，但不再使用
}>()

const sectionRef = ref<HTMLElement>()
useScrollAnimation(sectionRef, { threshold: 0.2, once: true })
</script>

<style scoped>
/* 样式已迁移到 Tailwind 类名中，无需额外样式 */
</style>
