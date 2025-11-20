<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type BadgeVariants, badgeVariants } from './badge'
import { cn } from '@/lib/utils'

interface Props {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
