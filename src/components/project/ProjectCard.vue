<template>
  <Card
    class="group hover:shadow-xl hover:border-primary hover:-translate-y-1 transition-all duration-300 w-full"
  >
    <CardHeader class="pb-3">
      <!-- 项目状态标识 -->
      <div class="flex justify-between items-start mb-2">
        <div class="flex items-center space-x-2">
          <div class="w-2.5 h-2.5 rounded-full animate-pulse" :class="statusColorClass"></div>
          <span
            class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide"
          >
            {{ project.status.replace('-', ' ') }}
          </span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-500">{{ project.language }}</span>
      </div>

      <!-- 项目标题 -->
      <CardTitle class="group-hover:text-primary transition-colors duration-200">
        {{ project.title }}
      </CardTitle>
    </CardHeader>

    <CardContent class="space-y-4">
      <!-- 项目描述 -->
      <CardDescription class="leading-relaxed">
        {{ project.longDescription || project.description }}
      </CardDescription>

      <!-- 技术标签 -->
      <div class="flex flex-wrap gap-1.5">
        <Badge
          v-for="(tag, index) in project.tags.slice(0, 4)"
          :key="tag"
          :style="{
            backgroundColor: getTagColor(tag, isDark).backgroundColor,
            color: getTagColor(tag, isDark).textColor,
            borderColor: getTagColor(tag, isDark).backgroundColor,
          }"
          class="hover:scale-105 transition-transform duration-200 cursor-pointer border"
          @mouseenter="handleTagHover($event, tag, true)"
          @mouseleave="handleTagHover($event, tag, false)"
        >
          {{ tag }}
        </Badge>
        <Badge v-if="project.tags.length > 4" variant="secondary">
          +{{ project.tags.length - 4 }}
        </Badge>
      </div>
    </CardContent>

    <CardFooter class="flex-col space-y-3 pt-4">
      <!-- 操作按钮 -->
      <div
        class="flex justify-between items-center w-full border-t border-gray-200 dark:border-gray-800 pt-4"
      >
        <router-link
          :to="`/projects/${project.id}`"
          class="inline-flex items-center text-sm text-primary hover:text-secondary transition-colors duration-200 group/link"
        >
          <span>查看详情</span>
          <span class="ml-1 transition-transform duration-200 group-hover/link:translate-x-1"
            >→</span
          >
        </router-link>

        <div class="flex space-x-2">
          <a
            :href="project.githubUrl"
            target="_blank"
            class="inline-flex items-center justify-center w-8 h-8 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-primary hover:text-white transition-all duration-200"
            title="View on GitHub"
          >
            <CodeBracketIcon class="w-4 h-4" />
          </a>
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            class="inline-flex items-center justify-center w-8 h-8 text-xs bg-gradient-to-r from-primary to-secondary text-white rounded hover:from-secondary hover:to-primary transition-all duration-200"
            title="Live Demo"
          >
            <RocketLaunchIcon class="w-4 h-4" />
          </a>
        </div>
      </div>

      <!-- 许可证信息 -->
      <div
        class="flex items-center justify-between w-full text-xs text-gray-600 dark:text-gray-400"
      >
        <span>许可证:</span>
        <LicenseDisplay :license="project.license || 'MIT'" />
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import Badge from '@/components/ui/Badge.vue'
import LicenseDisplay from './LicenseDisplay.vue'
import { getTagColor } from '@/utils/colorHash'
import { useHoverEffect } from '@/utils/hoverEffect'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { CodeBracketIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

// 使用统一的悬停效果 composable
const { handleColorHover } = useHoverEffect()

// 获取主题状态
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// 修复状态颜色计算
const statusColorClass = computed(() => {
  switch (props.project.status) {
    case 'active':
      return 'bg-green-500 dark:bg-green-400'
    case 'in-development':
      return 'bg-yellow-500 dark:bg-yellow-400'
    case 'planned':
      return 'bg-blue-500 dark:bg-blue-400'
    case 'archived':
      return 'bg-gray-500 dark:bg-gray-400'
    default:
      return 'bg-gray-500 dark:bg-gray-400'
  }
})

// 处理标签悬停（使用 composable）
const handleTagHover = (event: Event, tag: string, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const colors = getTagColor(tag, isDark.value)

  const hoverColors = isEnter
    ? { backgroundColor: colors.hoverBackgroundColor, textColor: 'white' }
    : { backgroundColor: colors.backgroundColor, textColor: colors.textColor }

  handleColorHover(target, hoverColors, isEnter)
}
</script>

<style scoped>
/* 减少运动偏好支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
