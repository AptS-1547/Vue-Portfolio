<template>
  <section class="animate-section-slide" :style="{ animationDelay: animationDelay }">
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
    >
      {{ skills.title }}
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
      ></span>
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      <div
        v-for="category in skills.categories"
        :key="category.name"
        class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 cursor-pointer group"
        :style="{ '--hover-border': category.borderColor }"
        @mouseenter="handleCategoryHover($event, category, true)"
        @mouseleave="handleCategoryHover($event, category, false)"
      >
        <h3
          class="font-medium text-gray-800 mb-2 text-sm lg:text-base group-hover:transition-colors duration-200"
          :style="{ '--hover-text': category.hoverColor }"
        >
          {{ category.name }}
        </h3>
        <div class="space-y-1">
          <span
            v-for="tech in category.technologies"
            :key="tech.name"
            class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 first:ml-0 hover:text-white transition-all duration-200"
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
import { useHoverEffect } from '@/composables/useHoverEffect'
import type { Skills, SkillCategory, Technology } from '@/types/profile'

defineProps<{
  skills: Skills
  animationDelay?: string
}>()

const { handleColorHover, handleCompoundHover } = useHoverEffect()

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
.animate-section-slide {
  animation: sectionSlide var(--animation-section-slide-duration, 300ms)
    var(--animation-section-slide-easing, ease-out) forwards;
  opacity: 0;
}

@keyframes sectionSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
