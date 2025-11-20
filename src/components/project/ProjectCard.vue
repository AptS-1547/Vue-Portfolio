<template>
  <div
    class="group relative w-full h-full rounded-2xl transition-all duration-500 ease-out cursor-pointer shadow-lg hover:shadow-2xl"
    @mouseenter="handleCardHover(true)"
    @mouseleave="handleCardHover(false)"
  >
    <!-- 玻璃态背景 -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl rounded-2xl"
    ></div>

    <!-- 渐变边框 -->
    <div
      class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style="padding: 1px; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"
    ></div>

    <!-- 内容容器 -->
    <Card class="relative h-full flex flex-col bg-transparent border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 overflow-hidden">
      <CardHeader class="pb-3">
        <!-- 项目状态标识 - 简约徽章 -->
        <div class="flex justify-between items-start mb-3">
          <div
            class="flex items-center space-x-2 px-2.5 py-1 rounded-full backdrop-blur-sm border"
            :class="statusBadgeClass"
          >
            <div class="w-1.5 h-1.5 rounded-full animate-pulse" :class="statusDotClass"></div>
            <span class="text-xs font-medium">
              {{ $t(`common.projectStatus.${project.status}`) }}
            </span>
          </div>
          <span
            class="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm px-2.5 py-1 rounded-full"
          >
            {{ project.language }}
          </span>
        </div>

        <!-- 项目标题 - 渐变文字 -->
        <CardTitle
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 group-hover:from-primary group-hover:via-secondary group-hover:to-primary transition-all duration-500"
        >
          {{ project.title }}
        </CardTitle>
      </CardHeader>

      <CardContent class="flex-grow space-y-4">
        <!-- 项目描述 - 增强对比度 -->
        <CardDescription class="leading-relaxed text-gray-700 dark:text-gray-300">
          {{ project.longDescription || project.description }}
        </CardDescription>

        <!-- 技术标签 - 玻璃态效果 -->
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="tag in project.tags.slice(0, 4)"
            :key="tag"
            :style="{
              backgroundColor: getTagColor(tag, isDark).backgroundColor + '40',
              borderColor: getTagColor(tag, isDark).backgroundColor,
            }"
            class="relative backdrop-blur-sm border-2 hover:scale-110 transition-all duration-300 cursor-pointer font-medium shadow-md hover:shadow-lg overflow-hidden group/tag"
            @mouseenter="handleTagHover($event, tag, true)"
            @mouseleave="handleTagHover($event, tag, false)"
          >
            <!-- 标签发光效果 -->
            <div
              class="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"
              :style="{
                background: `radial-gradient(circle at center, ${getTagColor(tag, isDark).backgroundColor}40 0%, transparent 70%)`,
              }"
            ></div>
            <span class="relative z-10" :style="{ color: getTagColor(tag, isDark).textColor }">
              {{ tag }}
            </span>
          </Badge>
          <Badge
            v-if="project.tags.length > 4"
            class="backdrop-blur-sm bg-gray-200/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600"
          >
            +{{ project.tags.length - 4 }}
          </Badge>
        </div>
      </CardContent>

      <CardFooter class="flex-col space-y-3 pt-4">
        <!-- 玻璃态分隔线 -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

        <!-- 操作按钮 -->
        <div class="flex justify-between items-center w-full pt-2">
          <router-link
            :to="`/projects/${project.id}`"
            class="inline-flex items-center text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 group/link"
          >
            <span>{{ $t('common.buttons.viewDetails') }}</span>
            <span class="ml-1 transition-transform duration-300 group-hover/link:translate-x-2"
              >→</span
            >
          </router-link>

          <div class="flex space-x-2">
            <a
              :href="project.githubUrl"
              target="_blank"
              class="relative inline-flex items-center justify-center w-9 h-9 rounded-lg backdrop-blur-sm bg-gray-200/60 dark:bg-gray-700/60 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 overflow-hidden group/btn transition-all duration-300 hover:scale-110 hover:shadow-lg"
              :title="$t('common.buttons.viewOnGithub')"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              ></div>
              <CodeBracketIcon class="w-4 h-4 relative z-10 group-hover/btn:text-white transition-colors duration-300" />
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="relative inline-flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden group/btn transition-all duration-300 hover:scale-110 hover:shadow-xl"
              :title="$t('common.buttons.liveDemo')"
            >
              <!-- 流动渐变背景 -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient"
              ></div>
              <RocketLaunchIcon class="w-4 h-4 relative z-10 text-white" />
            </a>
          </div>
        </div>

        <!-- 许可证信息 - 玻璃态 -->
        <div
          class="flex items-center justify-between w-full text-xs backdrop-blur-sm bg-gray-100/40 dark:bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
        >
          <span class="text-gray-600 dark:text-gray-400 font-medium">
            {{ $t('common.labels.license') }}
          </span>
          <LicenseDisplay :license="project.license || 'MIT'" />
        </div>
      </CardFooter>
    </Card>
  </div>
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
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { CodeBracketIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

// 获取主题状态
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// 状态徽章样式
const statusBadgeClass = computed(() => {
  switch (props.project.status) {
    case 'active':
      return 'bg-green-50/60 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
    case 'in-development':
      return 'bg-yellow-50/60 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
    case 'planned':
      return 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
    case 'archived':
      return 'bg-gray-50/60 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
    default:
      return 'bg-gray-50/60 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
  }
})

// 状态圆点样式
const statusDotClass = computed(() => {
  switch (props.project.status) {
    case 'active':
      return 'bg-green-500 dark:bg-green-400'
    case 'in-development':
      return 'bg-yellow-500 dark:bg-yellow-400'
    case 'planned':
      return 'bg-blue-500 dark:bg-blue-400'
    case 'archived':
      return 'bg-gray-400 dark:bg-gray-500'
    default:
      return 'bg-gray-400 dark:bg-gray-500'
  }
})

// 卡片悬停效果
const handleCardHover = (isEnter: boolean) => {
  // 预留给未来可能的 3D 效果或其他交互
  // 当前主要通过 CSS 实现 hover 效果
}

// 处理标签悬停
const handleTagHover = (event: Event, tag: string, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const colors = getTagColor(tag, isDark.value)

  if (isEnter) {
    // 鼠标进入：应用悬停样式
    target.style.backgroundColor = colors.hoverBackgroundColor
    target.style.color = 'white'
  } else {
    // 鼠标离开：恢复原始样式
    target.style.backgroundColor = colors.backgroundColor
    target.style.color = colors.textColor
  }
}
</script>

<style scoped>
/* 流动渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

/* 减少运动偏好支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
