<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden pt-16 relative">
    <!-- 粒子背景 -->
    <ParticleBackground />

    <!-- 单栏布局 -->
    <div class="w-full">
      <!-- Hero Section - 个人信息 -->
      <HeroSection :personal-info="personalInfo" />

      <!-- 内容区域 -->
      <div class="max-w-5xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-12 lg:space-y-16">
        <!-- About Me -->
        <AboutSection :about-me="aboutMe" animation-delay="0.1s" />

        <!-- Skills -->
        <SkillsSection :skills="skills" animation-delay="0.2s" />

        <!-- Experience -->
        <ExperienceSection :experience="experience" animation-delay="0.4s" />

        <!-- Featured Projects -->
        <FeaturedProjectsSection :featured-projects="featuredProjects" animation-delay="0.3s" />

        <!-- Timeline - 时间线/动态 -->
        <TimelineSection github-username="AptS-1547" :initial-limit="10" :max-display="5" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useProfileI18n } from '@/composables/useProfileI18n'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import TimelineSection from '@/components/sections/TimelineSection.vue'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ParticleBackground from '@/components/common/ParticleBackground.vue'

// 使用 i18n 数据
const { personalInfo, aboutMe, skills, experience, featuredProjects } = useProfileI18n()

// 确保页面加载时在正确位置
onMounted(() => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})
</script>
