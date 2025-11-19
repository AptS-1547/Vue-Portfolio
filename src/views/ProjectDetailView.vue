<template>
  <main
    class="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 xl:px-8 2xl:px-16 overflow-x-hidden pt-24"
  >
    <div class="max-w-4xl mx-auto w-full">
      <!-- 返回按钮 -->
      <div class="mb-6 animate-back-button">
        <router-link
          to="/projects"
          class="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 group"
        >
          <span class="mr-2 transition-transform duration-500 group-hover:-translate-x-1">←</span>
          <span>{{ $t('common.buttons.backToProjects') }}</span>
        </router-link>
      </div>

      <!-- 项目不存在提示 -->
      <ErrorState
        v-if="!project"
        :icon-component="MagnifyingGlassIcon"
        :title="$t('common.errors.projectNotFound')"
        :message="$t('common.errors.projectNotFoundMessage')"
        back-route="/projects"
        :back-text="$t('common.buttons.backToProjects')"
      />

      <!-- 项目详情 -->
      <div v-else class="space-y-8">
        <!-- 项目头部 -->
        <div
          class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-800 p-6 lg:p-8 animate-header-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
        >
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4 animate-status-fade">
                <div :class="statusColor" class="w-3 h-3 rounded-full animate-status-pulse"></div>
                <span
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                  >{{ $t(`common.projectStatus.${project.status}`) }}</span
                >
                <span class="text-sm text-gray-400 dark:text-gray-500">{{ project.language }}</span>
                <LicenseDisplay :license="project.license || 'MIT'" />
              </div>
              <h1
                class="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-title-emerge hover:text-[var(--color-primary)] transition-colors duration-500"
              >
                {{ project.title }}
              </h1>
              <p
                class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-description-flow"
              >
                {{ project.description }}
              </p>
            </div>
          </div>

          <!-- 技术标签 -->
          <div class="flex flex-wrap gap-2 mb-6 animate-tags-stagger">
            <span
              v-for="(tag, index) in project.tags"
              :key="tag"
              class="px-3 py-1 rounded-full text-sm font-medium hover:scale-110 transition-all duration-300 animate-tag-bounce cursor-pointer"
              :style="{
                animationDelay: `${index * 0.1}s`,
                backgroundColor: getTagColor(tag, isDark).hoverBackgroundColor,
                color: 'white',
              }"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-3 animate-buttons-slide">
            <a
              :href="project.githubUrl"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 hover:scale-105 hover:-translate-y-1 transition-all duration-500 hover:shadow-xl group"
            >
              <CodeBracketIcon
                class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12"
              />
              <span>{{ $t('common.buttons.viewOnGithub') }}</span>
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] hover:scale-105 hover:-translate-y-1 transition-all duration-500 hover:shadow-xl group"
            >
              <RocketLaunchIcon
                class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-125"
              />
              <span>{{ $t('common.buttons.liveDemo') }}</span>
            </a>
          </div>
        </div>

        <!-- 项目详细描述 -->
        <div
          class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-800 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.2s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-section-title hover:text-[var(--color-primary)] transition-colors duration-500"
          >
            {{ $t('common.sections.aboutProject') }}
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 animate-text-reveal">
              {{ project.longDescription || project.description }}
            </p>
            <div v-if="project.features" class="mt-6 animate-features-slide">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 animate-features-title"
              >
                {{ $t('common.sections.keyFeatures') }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(feature, index) in project.features"
                  :key="feature"
                  class="flex items-start space-x-2 animate-feature-item hover:translate-x-2 transition-transform duration-300"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <span class="text-green-500 mt-1 animate-check-bounce">✓</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 技术栈详情 -->
        <div
          class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-800 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.4s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-section-title hover:text-[var(--color-secondary)] transition-colors duration-500"
          >
            {{ $t('common.sections.techStack') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(category, categoryIndex) in project.techStack"
              :key="category.name"
              class="space-y-3 animate-tech-section"
              :style="{ animationDelay: `${0.6 + categoryIndex * 0.1}s` }"
            >
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 animate-tech-title">
                {{ $t(`common.techCategories.${category.name}`) }}
              </h3>
              <div class="space-y-2">
                <div
                  v-for="(tech, index) in category.items"
                  :key="tech.name"
                  class="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 p-2 rounded transition-all duration-300 animate-tech-item"
                  :style="{ animationDelay: `${0.8 + categoryIndex * 0.2 + index * 0.1}s` }"
                >
                  <span class="text-gray-600 dark:text-gray-400 font-medium">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 性能指标（如果有） -->
        <div
          v-if="project.performance"
          class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-800 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.6s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-section-title hover:text-[var(--color-primary)] transition-colors duration-500"
          >
            {{ $t('common.sections.performance') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(metric, index) in project.performance"
              :key="metric.name"
              class="text-center p-4 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gradient-to-br hover:from-orange-50 hover:to-cyan-50 dark:hover:from-orange-950/30 dark:hover:to-cyan-950/30 hover:scale-105 hover:-translate-y-1 transition-all duration-500 animate-metric-card"
              :style="{ animationDelay: `${1.5 + index * 0.2}s` }"
            >
              <div class="text-2xl font-bold text-[var(--color-primary)] mb-1 animate-metric-value">
                {{ metric.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 animate-metric-label">
                {{ metric.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LicenseDisplay from '@/components/project/LicenseDisplay.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import { CodeBracketIcon, RocketLaunchIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useProjectsI18n } from '@/composables/useProjectsI18n'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { getTagColor } from '@/utils/colorHash'

const route = useRoute()
const { t } = useI18n()
const { projects } = useProjectsI18n()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// 确保页面加载时在正确位置
onMounted(() => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})

const projectId = computed(() => route.params.id as string)

const projectsData = computed(() => projects.value)
const project = computed(() => projectsData.value.find((p) => p.id === projectId.value))

const statusColor = computed(() => {
  if (!project.value) return 'bg-gray-400 dark:bg-gray-500'
  switch (project.value.status) {
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
</script>

<style scoped>
/* ProjectDetailView 特有样式 - 所有通用动画已移至全局 */

/* 返回按钮动画 */
.animate-back-button {
  animation: fadeInLeft var(--animation-duration-slow) ease-out forwards;
}

/* 头部卡片动画 */
.animate-header-slide {
  animation: scaleInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  animation-delay: 0.05s;
  opacity: 0;
}

/* 状态信息动画 */
.animate-status-fade {
  animation: fadeInLeft var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-status-pulse {
  animation: statusPulse 2s ease-in-out infinite;
}

/* 标题动画 */
.animate-title-emerge {
  animation: bounceIn var(--animation-duration-slow) var(--animation-easing-bounce) forwards;
  animation-delay: 0.15s;
  opacity: 0;
}

/* 描述动画 */
.animate-description-flow {
  animation: fadeInUp var(--animation-duration-slow) ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

/* 标签动画 */
.animate-tags-stagger {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.25s;
  opacity: 0;
}

.animate-tag-bounce {
  animation: bounceIn var(--animation-duration-normal) var(--animation-easing-bounce) forwards;
  opacity: 0;
}

/* 按钮动画 */
.animate-buttons-slide {
  animation: fadeInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

/* 区块动画 */
.animate-section-slide {
  animation: scaleInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  opacity: 0;
}

.animate-section-title {
  animation: fadeInLeft var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

/* 文本动画 */
.animate-text-reveal {
  animation: fadeInUp var(--animation-duration-slow) ease-out forwards;
  animation-delay: 0.15s;
  opacity: 0;
}

/* 特性列表动画 */
.animate-features-slide {
  animation: fadeInLeft var(--animation-duration-slow) ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-features-title {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.25s;
  opacity: 0;
}

.animate-feature-item {
  animation: fadeInLeft var(--animation-duration-normal) var(--animation-easing-ease-in-out)
    forwards;
  opacity: 0;
}

.animate-check-bounce:hover {
  animation: bounce var(--animation-duration-slow) ease-in-out;
}

/* 技术栈动画 */
.animate-tech-section {
  animation: scaleInUp var(--animation-duration-slow) var(--animation-easing-ease-in-out) forwards;
  opacity: 0;
}

.animate-tech-title {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  opacity: 0;
}

.animate-tech-item {
  animation: fadeInLeft var(--animation-duration-normal) ease-out forwards;
  opacity: 0;
}

/* 性能指标动画 */
.animate-metric-card {
  animation: bounceInUp var(--animation-duration-slower) var(--animation-easing-bounce) forwards;
  opacity: 0;
}

.animate-metric-value {
  animation: bounceIn var(--animation-duration-slow) var(--animation-easing-bounce) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-metric-label {
  animation: fadeInUp var(--animation-duration-normal) ease-out forwards;
  animation-delay: 0.15s;
  opacity: 0;
}
</style>
