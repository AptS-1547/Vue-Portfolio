<template>
  <section class="animate-section-slide" :style="{ animationDelay: animationDelay }">
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
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
        class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200"
        :style="{ '--hover-border': position.hoverColor }"
        @mouseenter="handlePositionHover($event, position, true)"
        @mouseleave="handlePositionHover($event, position, false)"
      >
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
          <h3
            class="font-semibold text-gray-800 text-sm lg:text-base transition-colors duration-200"
            :style="{ '--hover-text': position.hoverColor }"
          >
            {{ position.title }}
          </h3>
          <span class="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-0">{{ position.period }}</span>
        </div>
        <p class="text-gray-600 mb-2 text-sm lg:text-base">
          {{ position.company }}
        </p>
        <p class="text-gray-600 text-xs lg:text-sm leading-relaxed">
          {{ position.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHoverEffect } from '@/composables/useHoverEffect'
import type { Experience, Position } from '@/types/profile'

defineProps<{
  experience: Experience
  animationDelay?: string
}>()

const { handleCompoundHover } = useHoverEffect()

// 职位经历悬停
const handlePositionHover = (event: Event, position: Position, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  handleCompoundHover(target, 'h3', position.hoverColor, isEnter)
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
