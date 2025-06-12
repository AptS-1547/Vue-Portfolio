<template>
  <div class="inline-flex items-center space-x-2">
    <span class="text-sm text-gray-500">License:</span>
    <span :class="['px-2 py-1 rounded text-xs font-medium', licenseColor]">
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
