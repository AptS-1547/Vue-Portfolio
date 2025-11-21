<template>
  <span
    :class="[
      'inline-block px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md border',
      clickable ? 'cursor-pointer' : '',
      variantClass,
    ]"
    :style="dynamicStyle"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTagColor } from '@/utils/colorHash'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

interface Props {
  /**
   * 标签文字（当不使用插槽时）
   */
  label?: string

  /**
   * 颜色变体
   * - auto: 使用 getTagColor 动态生成颜色（用于项目标签）
   * - neutral: 固定灰色样式（用于技能标签）
   * - timeline: 时间轴灰色样式
   */
  variant?: 'auto' | 'neutral' | 'timeline'

  /**
   * 是否可点击（添加 cursor-pointer）
   */
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'auto',
  clickable: true,
})

// 获取主题状态
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// 根据 variant 计算固定样式类
const variantClass = computed(() => {
  switch (props.variant) {
    case 'neutral':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
    case 'timeline':
      return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
    default:
      return ''
  }
})

// 动态样式（用于 auto 模式）
const dynamicStyle = computed(() => {
  if (props.variant === 'auto' && props.label) {
    const colors = getTagColor(props.label, isDark.value)
    return {
      backgroundColor: colors.backgroundColor + '40',
      borderColor: colors.backgroundColor,
      color: colors.textColor,
    }
  }
  return {}
})
</script>
