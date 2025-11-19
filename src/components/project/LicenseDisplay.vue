<template>
  <div class="inline-flex items-center space-x-2 animate-license-entrance">
    <span class="text-sm text-gray-500 animate-label-fade">License:</span>
    <span
      :class="[
        'px-2 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 animate-badge-bounce',
        licenseColor,
      ]"
    >
      {{ license }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  license: string
}

const props = withDefaults(defineProps<Props>(), {
  license: 'MIT',
})

const licenseColor = computed(() => {
  switch (props.license.toLowerCase()) {
    case 'mit':
      return 'bg-green-100 text-green-800'
    case 'apache-2.0':
      return 'bg-blue-100 text-blue-800'
    case 'gpl-3.0':
      return 'bg-purple-100 text-purple-800'
    case 'bsd-3-clause':
      return 'bg-orange-100 text-orange-800'
    case 'unlicense':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})
</script>

<style scoped>
/* 微动画关键帧 */
@keyframes licenseEntrance {
  from {
    opacity: 0;
    transform: translateX(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes labelFade {
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes badgeBounce {
  from {
    opacity: 0;
    transform: translateX(5px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* 动画类 */
.animate-license-entrance {
  animation: licenseEntrance 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-label-fade {
  animation: labelFade 0.6s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-badge-bounce {
  animation: badgeBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.2s;
  opacity: 0;
}
</style>
