<template>
  <main class="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-x-hidden pt-16">
    <!-- 左侧个人信息栏 - 移动端顶部，桌面端固定 -->
    <div
      class="lg:fixed lg:left-0 lg:top-16 lg:w-1/3 lg:h-[calc(100vh-4rem)] w-full bg-white border-b lg:border-r lg:border-b-0 border-gray-200 p-4 lg:p-8 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <!-- 头像 -->
      <div
        class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 mb-4 lg:mb-6 flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105"
      >
        <img
          :src="personalInfo.avatar.url"
          :alt="personalInfo.avatar.alt"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 基本信息 -->
      <div class="text-center space-y-2 lg:space-y-4">
        <h1
          class="text-xl lg:text-2xl font-bold text-gray-800 hover:text-[#ed9a28] transition-colors duration-200"
        >
          {{ personalInfo.name }}
        </h1>
        <p class="text-gray-600 text-sm lg:text-base">{{ personalInfo.title }}</p>
        <p class="text-xs lg:text-sm text-gray-500 px-2 lg:px-0">
          {{ personalInfo.tagline }}
        </p>

        <!-- 联系方式 -->
        <div class="pt-2 lg:pt-4 space-y-2">
          <div
            class="flex items-center justify-center space-x-2 text-xs lg:text-sm text-gray-600 hover:text-[#ed9a28] transition-colors duration-200"
          >
            <span>📧</span>
            <span class="break-all">{{ personalInfo.email }}</span>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="flex justify-center space-x-3 lg:space-x-4 pt-2 lg:pt-4">
          <a
            v-for="social in personalInfo.socialLinks"
            :key="social.name"
            :href="social.url"
            :title="social.name"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-200"
            :style="{ '--hover-color': social.hoverColor }"
            @mouseenter="handleSocialHover($event, true)"
            @mouseleave="handleSocialHover($event, false)"
          >
            <span class="text-xs">{{ social.icon }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 右侧详细信息栏 -->
    <div
      class="flex-1 lg:ml-[33.333333%] p-4 lg:p-8 xl:px-12 2xl:px-20 overflow-y-auto overflow-x-hidden"
    >
      <div class="max-w-4xl mx-auto space-y-6 lg:space-y-8 w-full">
        <!-- About Me -->
        <section class="animate-section-slide" style="animation-delay: 0.1s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            {{ aboutMe.title }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm lg:text-base">
            {{ aboutMe.content }}
          </p>
        </section>

        <!-- Skills -->
        <section class="animate-section-slide" style="animation-delay: 0.2s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            {{ skills.title }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <div
              v-for="category in skills.categories"
              :key="category.name"
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 cursor-pointer group"
              :style="{ '--hover-border': category.borderColor }"
              @mouseenter="handleCategoryHover($event, category, true)"
              @mouseleave="handleCategoryHover($event, category, false)"
            >
              <h3
                class="font-medium text-gray-800 mb-2 text-sm lg:text-base group-hover:transition-colors duration-200"
                :style="{ '--hover-text': category.hoverColor }"
              >
                {{ category.name }}
              </h3>
              <div class="space-y-1">
                <span
                  v-for="tech in category.technologies"
                  :key="tech.name"
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 first:ml-0 hover:text-white transition-all duration-200"
                  :style="{ '--tech-hover': tech.hoverColor }"
                  @mouseenter="handleTechHover($event, tech, true)"
                  @mouseleave="handleTechHover($event, tech, false)"
                >
                  {{ tech.name }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="animate-section-slide" style="animation-delay: 0.3s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            {{ experience.title }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <div class="space-y-4 lg:space-y-6">
            <div
              v-for="position in experience.positions"
              :key="`${position.company}-${position.period}`"
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200"
              :style="{ '--hover-border': position.hoverColor }"
              @mouseenter="handlePositionHover($event, position, true)"
              @mouseleave="handlePositionHover($event, position, false)"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <h3
                  class="font-semibold text-gray-800 text-sm lg:text-base transition-colors duration-200"
                  :style="{ '--hover-text': position.hoverColor }"
                >
                  {{ position.title }}
                </h3>
                <span class="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-0">{{
                  position.period
                }}</span>
              </div>
              <p class="text-gray-600 mb-2 text-sm lg:text-base">
                {{ position.company }}
              </p>
              <p class="text-gray-600 text-xs lg:text-sm leading-relaxed">
                {{ position.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section class="animate-section-slide" style="animation-delay: 0.4s">
          <div class="flex justify-between items-center mb-3 lg:mb-4">
            <h2
              class="text-lg lg:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
            >
              {{ featuredProjects.title }}
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
              ></span>
            </h2>
            <router-link
              :to="featuredProjects.viewAllLink.route"
              class="text-sm text-[#ed9a28] hover:text-[#6dd0e0] transition-colors duration-200 hover:underline"
            >
              {{ featuredProjects.viewAllLink.text }}
            </router-link>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div
              v-for="project in featuredProjects.projects"
              :key="project.id"
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 group"
              :style="{ '--hover-border': project.hoverColor }"
              @mouseenter="handleProjectHover($event, project, true)"
              @mouseleave="handleProjectHover($event, project, false)"
            >
              <h3
                class="font-semibold text-gray-800 mb-2 group-hover:transition-colors duration-200 text-sm lg:text-base"
                :style="{ '--hover-text': project.hoverColor }"
              >
                {{ project.title }}
              </h3>
              <p class="text-gray-600 text-xs lg:text-sm mb-3">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-1 rounded text-xs font-medium transition-all duration-200"
                  :style="{
                    backgroundColor: getTagColor(tag).backgroundColor,
                    color: getTagColor(tag).textColor,
                  }"
                >
                  {{ tag }}
                </span>
              </div>
              <router-link
                :to="`/projects/${project.id}`"
                class="inline-flex items-center text-xs lg:text-sm transition-colors duration-200"
                :style="{ color: project.hoverColor }"
              >
                <span>{{ project.linkText }}</span>
                <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  >→</span
                >
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getTagColor } from '@/utils/colorHash'
import { profileConfig } from '@/data/profile'
import { onMounted, nextTick } from 'vue'

// 解构配置
const { personalInfo, aboutMe, skills, experience, featuredProjects } = profileConfig

// 确保页面加载时在正确位置
onMounted(() => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})

// 悬停处理函数
const handleSocialHover = (event: Event, isEnter: boolean) => {
  const target = event.target as HTMLElement
  const link = target.closest('a') as HTMLElement
  if (isEnter) {
    const hoverColor = link.style.getPropertyValue('--hover-color')
    link.style.backgroundColor = hoverColor
    link.style.color = 'white'
  } else {
    link.style.backgroundColor = ''
    link.style.color = ''
  }
}

const handleCategoryHover = (event: Event, category: any, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  const title = target.querySelector('h3') as HTMLElement
  if (isEnter) {
    target.style.borderColor = category.borderColor
    if (title) title.style.color = category.hoverColor
  } else {
    target.style.borderColor = ''
    if (title) title.style.color = ''
  }
}

const handleTechHover = (event: Event, tech: any, isEnter: boolean) => {
  const target = event.target as HTMLElement
  if (isEnter) {
    target.style.backgroundColor = tech.hoverColor
  } else {
    target.style.backgroundColor = ''
  }
}

const handlePositionHover = (event: Event, position: any, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  const title = target.querySelector('h3') as HTMLElement
  if (isEnter) {
    target.style.borderColor = position.hoverColor
    if (title) title.style.color = position.hoverColor
  } else {
    target.style.borderColor = ''
    if (title) title.style.color = ''
  }
}

const handleProjectHover = (event: Event, project: any, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  const title = target.querySelector('h3') as HTMLElement
  if (isEnter) {
    target.style.borderColor = project.hoverColor
    if (title) title.style.color = project.hoverColor
  } else {
    target.style.borderColor = ''
    if (title) title.style.color = ''
  }
}
</script>

<style scoped>
/* 简化动画，加快速度 */
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

.animate-section-slide {
  animation: sectionSlide 0.3s ease-out forwards;
  opacity: 0;
}
</style>
