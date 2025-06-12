<template>
  <main class="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-x-hidden">
    <!-- 左侧个人信息栏 - 移动端顶部，桌面端固定 -->
    <div
      class="lg:fixed lg:left-0 lg:top-16 lg:w-1/3 lg:h-[calc(100vh-4rem)] w-full bg-white border-b lg:border-r lg:border-b-0 border-gray-200 p-4 lg:p-8 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <!-- 头像 -->
      <div
        class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 mb-4 lg:mb-6 flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105"
      >
        <img
          src="https://weavatar.com/avatar/a12172cc89e35b5c4482afdb1f76b98c8c6bf3aa6aa4b4001c401638c6780ab2?s=512&d=mm&r=g"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 基本信息 -->
      <div class="text-center space-y-2 lg:space-y-4">
        <h1
          class="text-xl lg:text-2xl font-bold text-gray-800 hover:text-[#ed9a28] transition-colors duration-200"
        >
          AptS-1547
        </h1>
        <p class="text-gray-600 text-sm lg:text-base">Full-Stack Developer</p>
        <p class="text-xs lg:text-sm text-gray-500 px-2 lg:px-0">
          Building modern web applications with Rust, Node.js & Vue...
        </p>

        <!-- 联系方式 -->
        <div class="pt-2 lg:pt-4 space-y-2">
          <div
            class="flex items-center justify-center space-x-2 text-xs lg:text-sm text-gray-600 hover:text-[#ed9a28] transition-colors duration-200"
          >
            <span>📧</span>
            <span class="break-all">AptS-1547@esaps.net</span>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="flex justify-center space-x-3 lg:space-x-4 pt-2 lg:pt-4">
          <a
            href="https://www.esaps.net/"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#ed9a28] hover:text-white transition-all duration-200"
            title="Personal Blog"
          >
            <span class="text-xs">📝</span>
          </a>
          <a
            href="https://www.esaps.net/feed/"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#6dd0e0] hover:text-white transition-all duration-200"
            title="RSS Feed"
          >
            <span class="text-xs">📡</span>
          </a>
          <a
            href="https://github.com/AptS-1547"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-200"
            title="GitHub"
          >
            <span class="text-xs">💻</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 右侧详细信息栏 - 移动端全宽，桌面端考虑左侧栏宽度 -->
    <div
      class="flex-1 lg:ml-[33.333333%] lg:mt-16 p-4 lg:p-8 xl:px-12 2xl:px-20 overflow-y-auto overflow-x-hidden"
    >
      <div class="max-w-4xl mx-auto space-y-6 lg:space-y-8 w-full">
        <!-- About Me -->
        <section class="animate-section-slide" style="animation-delay: 0.1s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            About Me
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <p class="text-gray-600 leading-relaxed text-sm lg:text-base">
            I'm a passionate full-stack developer with 6 years of experience building robust web
            applications. I specialize in modern tech stacks including Rust for backend systems,
            Node.js for APIs, Python for data processing, and Vue.js/Nuxt.js for frontend
            development. I love sharing knowledge through technical writing and contributing to
            open-source projects.
          </p>
        </section>

        <!-- Skills -->
        <section class="animate-section-slide" style="animation-delay: 0.2s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            Skills & Expertise
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#ed9a28] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 cursor-pointer group"
            >
              <h3
                class="font-medium text-gray-800 mb-2 text-sm lg:text-base group-hover:text-[#ed9a28] transition-colors duration-200"
              >
                Backend
              </h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-[#ed9a28] hover:text-white transition-all duration-200"
                  >Rust</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-[#ed9a28] hover:text-white transition-all duration-200"
                  >Node.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-[#ed9a28] hover:text-white transition-all duration-200"
                  >Python</span
                >
              </div>
            </div>
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#6dd0e0] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 cursor-pointer group"
            >
              <h3
                class="font-medium text-gray-800 mb-2 text-sm lg:text-base group-hover:text-[#6dd0e0] transition-colors duration-200"
              >
                Frontend
              </h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-[#6dd0e0] hover:text-white transition-all duration-200"
                  >Vue.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-[#6dd0e0] hover:text-white transition-all duration-200"
                  >Nuxt.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-[#6dd0e0] hover:text-white transition-all duration-200"
                  >TypeScript</span
                >
              </div>
            </div>
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-gray-400 hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 cursor-pointer group"
            >
              <h3
                class="font-medium text-gray-800 mb-2 text-sm lg:text-base group-hover:text-gray-600 transition-colors duration-200"
              >
                DevOps & Tools
              </h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-gray-600 hover:text-white transition-all duration-200"
                  >Docker</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-gray-600 hover:text-white transition-all duration-200"
                  >Git</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-gray-600 hover:text-white transition-all duration-200"
                  >Linux</span
                >
              </div>
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="animate-section-slide" style="animation-delay: 0.3s">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-200 pb-2 hover:text-[#ed9a28] transition-colors duration-200 relative group"
          >
            Experience
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
            ></span>
          </h2>
          <div class="space-y-4 lg:space-y-6">
            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#ed9a28] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <h3
                  class="font-semibold text-gray-800 text-sm lg:text-base hover:text-[#ed9a28] transition-colors duration-200"
                >
                  Full-Stack Developer & Technical Writer
                </h3>
                <span class="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-0">2024 - Present</span>
              </div>
              <p class="text-gray-600 mb-2 text-sm lg:text-base">
                Aberdeen Institute Digital Infrastructure Projects
              </p>
              <p class="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Leading full-stack development for digital infrastructure projects using Node.js for
                backend APIs, Vue.js with Vite for modern frontend applications, and handling DevOps
                operations including server management and deployment automation. Also maintaining a
                technical blog with 100+ monthly readers covering full-stack development and
                infrastructure topics.
              </p>
            </div>

            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#6dd0e0] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <h3
                  class="font-semibold text-gray-800 text-sm lg:text-base hover:text-[#6dd0e0] transition-colors duration-200"
                >
                  Backend Developer
                </h3>
                <span class="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-0">2021 - Present</span>
              </div>
              <p class="text-gray-600 mb-2 text-sm lg:text-base">The ESAP Project</p>
              <p class="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Focused on backend development using Node.js and Python, building microservices
                architecture, and gradually expanding into full-stack development by learning Rust
                and modern frontend frameworks.
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
              Featured Projects
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 group-hover:w-full"
              ></span>
            </h2>
            <router-link
              to="/projects"
              class="text-sm text-[#ed9a28] hover:text-[#6dd0e0] transition-colors duration-200 hover:underline"
            >
              View All →
            </router-link>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#ed9a28] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 group"
            >
              <h3
                class="font-semibold text-gray-800 mb-2 group-hover:text-[#ed9a28] transition-colors duration-200 text-sm lg:text-base"
              >
                ShortLinker - High-Performance URL Shortener
              </h3>
              <p class="text-gray-600 text-xs lg:text-sm mb-3">
                A minimalist URL shortener service built with Rust and Actix-web, supporting HTTP
                307 redirection. Achieves 700k+ QPS with smart caching, Bloom filters, and supports
                both SQLite and JSON storage backends. Features admin API, expiration support, and
                cross-platform deployment.
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in ['Rust', 'Actix-web', 'SQLite', 'Docker']"
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
                :to="`/projects/shortlinker`"
                class="inline-flex items-center text-xs lg:text-sm text-[#ed9a28] hover:text-[#6dd0e0] transition-colors duration-200"
              >
                <span>View Project</span>
                <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  >→</span
                >
              </router-link>
            </div>

            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#6dd0e0] hover:-translate-y-1 touch:hover:translate-y-0 transition-all duration-200 group"
            >
              <h3
                class="font-semibold text-gray-800 mb-2 group-hover:text-[#6dd0e0] transition-colors duration-200 text-sm lg:text-base"
              >
                OneBot GitHub Webhook - QQ 通知服务
              </h3>
              <p class="text-gray-600 text-xs lg:text-sm mb-3">
                一个强大的服务，通过 OneBot 协议将 GitHub Webhook 推送到 QQ
                群。支持安全验证、灵活的仓库分支匹配、自定义消息格式，以及推送、PR、Issues 和
                Releases 等全面的事件处理。具备通配符匹配、多群支持等高级功能。
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in ['Python', 'FastAPI', 'OneBot', 'Docker']"
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
                :to="`/projects/onebot-github-webhook`"
                class="inline-flex items-center text-xs lg:text-sm text-[#6dd0e0] hover:text-[#ed9a28] transition-colors duration-200"
              >
                <span>View Project</span>
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
