<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type ButtonVariants, buttonVariants } from './button'
import { cn } from '@/lib/utils'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  as?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  type: 'button',
  disabled: false,
})

const buttonClass = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
)
</script>

<template>
  <component
    :is="as"
    :class="buttonClass"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>
