<template>
  <main class="min-h-screen bg-gray-50 py-8 px-4 xl:px-8 2xl:px-16 overflow-x-hidden">
    <div class="max-w-4xl mx-auto w-full">
      <!-- 返回按钮 -->
      <div class="mb-6 animate-back-button">
        <router-link
          to="/projects"
          class="inline-flex items-center text-[#ed9a28] hover:text-[#6dd0e0] transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 group"
        >
          <span class="mr-2 transition-transform duration-500 group-hover:-translate-x-1">←</span>
          <span>Back to Projects</span>
        </router-link>
      </div>

      <!-- 项目不存在提示 -->
      <div v-if="!project" class="text-center py-12 animate-not-found">
        <div class="text-gray-400 text-6xl mb-4 animate-search-spin">🔍</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2 animate-not-found-title">
          Project not found
        </h3>
        <p class="text-gray-500 animate-not-found-text">
          The project you're looking for doesn't exist.
        </p>
      </div>

      <!-- 项目详情 -->
      <div v-else class="space-y-8">
        <!-- 项目头部 -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 p-6 lg:p-8 animate-header-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
        >
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4 animate-status-fade">
                <div :class="statusColor" class="w-3 h-3 rounded-full animate-status-pulse"></div>
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">{{
                  project.status.replace('-', ' ')
                }}</span>
                <span class="text-sm text-gray-400">{{ project.language }}</span>
                <LicenseDisplay :license="project.license || 'MIT'" />
              </div>
              <h1
                class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-title-emerge hover:text-[#ed9a28] transition-colors duration-500"
              >
                {{ project.title }}
              </h1>
              <p class="text-lg text-gray-600 leading-relaxed animate-description-flow">
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
                backgroundColor: getTagColor(tag).hoverBackgroundColor,
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
              <span class="mr-2 transition-transform duration-300 group-hover:rotate-12">💻</span>
              <span>View on GitHub</span>
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] text-white rounded-lg hover:from-[#6dd0e0] hover:to-[#ed9a28] hover:scale-105 hover:-translate-y-1 transition-all duration-500 hover:shadow-xl group"
            >
              <span class="mr-2 transition-transform duration-300 group-hover:scale-125">🚀</span>
              <span>Live Demo</span>
            </a>
          </div>
        </div>

        <!-- 项目详细描述 -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.2s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 mb-4 animate-section-title hover:text-[#ed9a28] transition-colors duration-500"
          >
            About This Project
          </h2>
          <div class="prose prose-gray max-w-none">
            <p class="text-gray-600 leading-relaxed mb-4 animate-text-reveal">
              {{ project.longDescription || project.description }}
            </p>
            <div v-if="project.features" class="mt-6 animate-features-slide">
              <h3 class="text-lg font-semibold text-gray-800 mb-3 animate-features-title">
                Key Features
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(feature, index) in project.features"
                  :key="feature"
                  class="flex items-start space-x-2 animate-feature-item hover:translate-x-2 transition-transform duration-300"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <span class="text-green-500 mt-1 animate-check-bounce">✓</span>
                  <span class="text-gray-600">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 技术栈详情 -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.4s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 mb-4 animate-section-title hover:text-[#6dd0e0] transition-colors duration-500"
          >
            Technical Stack
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-if="project.techStack?.backend"
              class="space-y-3 animate-tech-section"
              style="animation-delay: 0.6s"
            >
              <h3 class="text-lg font-semibold text-gray-800 animate-tech-title">Backend</h3>
              <div class="space-y-2">
                <div
                  v-for="(tech, index) in project.techStack.backend"
                  :key="tech.name"
                  class="flex justify-between items-center hover:bg-gray-50 hover:scale-105 p-2 rounded transition-all duration-300 animate-tech-item"
                  :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
                >
                  <span class="text-gray-600 font-medium">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="project.techStack?.frontend"
              class="space-y-3 animate-tech-section"
              style="animation-delay: 0.7s"
            >
              <h3 class="text-lg font-semibold text-gray-800 animate-tech-title">Frontend</h3>
              <div class="space-y-2">
                <div
                  v-for="(tech, index) in project.techStack.frontend"
                  :key="tech.name"
                  class="flex justify-between items-center hover:bg-gray-50 hover:scale-105 p-2 rounded transition-all duration-300 animate-tech-item"
                  :style="{ animationDelay: `${1 + index * 0.1}s` }"
                >
                  <span class="text-gray-600 font-medium">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="project.techStack?.tools"
              class="space-y-3 animate-tech-section"
              style="animation-delay: 0.8s"
            >
              <h3 class="text-lg font-semibold text-gray-800 animate-tech-title">Tools & DevOps</h3>
              <div class="space-y-2">
                <div
                  v-for="(tech, index) in project.techStack.tools"
                  :key="tech.name"
                  class="flex justify-between items-center hover:bg-gray-50 hover:scale-105 p-2 rounded transition-all duration-300 animate-tech-item"
                  :style="{ animationDelay: `${1.2 + index * 0.1}s` }"
                >
                  <span class="text-gray-600 font-medium">{{ tech.name }}</span>
                  <span class="text-sm text-gray-500">{{ tech.purpose }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 性能指标（如果有） -->
        <div
          v-if="project.performance"
          class="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 p-6 lg:p-8 animate-section-slide hover:shadow-xl hover:scale-[1.01] transition-all duration-700"
          style="animation-delay: 0.6s"
        >
          <h2
            class="text-2xl font-bold text-gray-800 mb-4 animate-section-title hover:text-[#ed9a28] transition-colors duration-500"
          >
            Performance Metrics
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(metric, index) in project.performance"
              :key="metric.name"
              class="text-center p-4 bg-gray-50/50 backdrop-blur-sm rounded-lg hover:bg-gradient-to-br hover:from-orange-50 hover:to-cyan-50 hover:scale-105 hover:-translate-y-1 transition-all duration-500 animate-metric-card"
              :style="{ animationDelay: `${1.5 + index * 0.2}s` }"
            >
              <div class="text-2xl font-bold text-[#ed9a28] mb-1 animate-metric-value">
                {{ metric.value }}
              </div>
              <div class="text-sm text-gray-600 animate-metric-label">{{ metric.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import LicenseDisplay from '@/components/LicenseDisplay.vue'
import { projects } from '@/data/projects'
import { getTagColor } from '@/utils/colorHash'
import type { Project } from '@/types/project'

const route = useRoute()
const projectId = computed(() => route.params.id as string)

const projectsData = ref<Project[]>(projects)
const project = computed(() => projectsData.value.find((p) => p.id === projectId.value))

const statusColor = computed(() => {
  if (!project.value) return 'bg-gray-400'
  switch (project.value.status) {
    case 'active':
      return 'bg-green-400'
    case 'in-development':
      return 'bg-yellow-400'
    case 'archived':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
})
</script>

<style scoped>
/* 现代动画关键帧 */
@keyframes backButton {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes notFound {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes searchSpin {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
}

@keyframes notFoundTitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes notFoundText {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes headerSlide {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes statusFade {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes statusPulse {
  0%,
  100% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

@keyframes titleEmerge {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
    filter: blur(5px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.02);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes descriptionFlow {
  from {
    transform: translateY(20px);
    opacity: 0;
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes tagsStagger {
  from {
    transform: translateY(30px);
    opacity: 0;
    filter: blur(0);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tagBounce {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-3px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes buttonsSlide {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes sectionSlide {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes sectionTitle {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes featuresSlide {
  from {
    transform: translateX(-40px);
    opacity: 0;
    filter: blur(0);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes featuresTitle {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes featureItem {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes checkBounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes techSection {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes techTitle {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes techItem {
  from {
    opacity: 0;
    transform: translateX(-15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes metricCard {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.8) rotateX(20deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}

@keyframes metricValue {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes metricLabel {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 动画类 */
.animate-back-button {
  animation: backButton 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-not-found {
  animation: notFound 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-search-spin {
  animation: searchSpin 3s ease-in-out infinite;
}

.animate-not-found-title {
  animation: notFoundTitle 0.6s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-not-found-text {
  animation: notFoundText 0.6s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

.animate-header-slide {
  animation: headerSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-status-fade {
  animation: statusFade 0.6s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-status-pulse {
  animation: statusPulse 2s ease-in-out infinite;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-title-emerge {
  animation: titleEmerge 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.animate-description-flow {
  animation: descriptionFlow 0.8s ease-out forwards;
  animation-delay: 0.7s;
  opacity: 0;
}

.animate-tags-stagger {
  animation: tagsStagger 0.6s ease-out forwards;
  animation-delay: 0.9s;
  opacity: 0;
}

.animate-tag-bounce {
  animation: tagBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.9s;
  opacity: 0;
}

.animate-buttons-slide {
  animation: buttonsSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 1.2s;
  opacity: 0;
}

.animate-section-slide {
  animation: sectionSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 1.2s;
  opacity: 0;
}

.animate-section-title {
  animation: sectionTitle 0.6s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-text-reveal {
  animation: textReveal 0.8s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-features-slide {
  animation: featuresSlide 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

.animate-features-title {
  animation: featuresTitle 0.6s ease-out forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

.animate-feature-item {
  animation: featureItem 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

.animate-check-bounce:hover {
  animation: checkBounce 0.6s ease-in-out;
}

.animate-tech-section {
  animation: techSection 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
}

.animate-check-bounce:hover {
  animation: checkBounce 0.6s ease-in-out;
}
</style>
