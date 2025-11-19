<template>
  <section class="animate-section-slide" :style="{ animationDelay: animationDelay }">
    <h2
      class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
    >
      {{ aboutMe.title }}
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
      ></span>
    </h2>
    <p class="text-gray-600 leading-relaxed text-sm lg:text-base">
      {{ aboutMe.content }}
    </p>
  </section>
</template>

<script setup lang="ts">
import type { AboutMe } from '@/types/profile'

defineProps<{
  aboutMe: AboutMe
  animationDelay?: string
}>()
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
