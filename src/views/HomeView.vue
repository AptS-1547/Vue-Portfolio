<template>
  <main
    class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col lg:flex-row overflow-x-hidden pt-16"
  >
    <!-- 左侧个人信息栏 -->
    <ProfileSidebar :personal-info="personalInfo" />

    <!-- 右侧详细信息栏 -->
    <div
      class="flex-1 lg:ml-[33.333333%] p-4 lg:p-8 xl:px-12 2xl:px-20 overflow-y-auto overflow-x-hidden"
    >
      <div class="max-w-4xl mx-auto space-y-6 lg:space-y-8 w-full">
        <!-- About Me -->
        <AboutSection :about-me="aboutMe" animation-delay="0.1s" />

        <!-- Skills -->
        <SkillsSection :skills="skills" animation-delay="0.2s" />

        <!-- Experience -->
        <ExperienceSection :experience="experience" animation-delay="0.3s" />

        <!-- Featured Projects -->
        <FeaturedProjectsSection :featured-projects="featuredProjects" animation-delay="0.4s" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useProfileI18n } from '@/composables/useProfileI18n'
import ProfileSidebar from '@/components/sections/ProfileSidebar.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection.vue'

// 使用 i18n 数据
const { personalInfo, aboutMe, skills, experience, featuredProjects } = useProfileI18n()

// 确保页面加载时在正确位置
onMounted(() => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
})
</script>
