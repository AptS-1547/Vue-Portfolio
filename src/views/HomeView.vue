<template>
  <main class="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
    <!-- 左侧个人信息栏 - 移动端顶部，桌面端固定 -->
    <div
      class="lg:fixed lg:left-0 lg:top-0 lg:w-1/3 lg:h-screen w-full bg-white border-b lg:border-r lg:border-b-0 border-gray-300 p-4 lg:p-8 flex flex-col items-center justify-center animate-slide-in-left"
    >
      <!-- 头像 -->
      <div
        class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 mb-4 lg:mb-6 flex items-center justify-center overflow-hidden animate-fade-in-up animate-delay-200 hover:scale-110 transition-transform duration-300"
      >
        <img
          src="https://weavatar.com/avatar/a12172cc89e35b5c4482afdb1f76b98c8c6bf3aa6aa4b4001c401638c6780ab2?s=512&d=mm&r=g"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 基本信息 -->
      <div class="text-center space-y-2 lg:space-y-4 animate-fade-in-up animate-delay-400">
        <h1
          class="text-xl lg:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          AptS-1547
        </h1>
        <p class="text-gray-600 text-sm lg:text-base">Full-Stack Developer</p>
        <p class="text-xs lg:text-sm text-gray-500 px-2 lg:px-0">
          Building modern web applications with Rust, Node.js & Vue...
        </p>

        <!-- 联系方式 -->
        <div class="pt-2 lg:pt-4 space-y-2 animate-fade-in-up animate-delay-600">
          <div
            class="flex items-center justify-center space-x-2 text-xs lg:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <span>📧</span>
            <span class="break-all">AptS-1547@esaps.net</span>
          </div>
        </div>

        <!-- 社交链接 -->
        <div
          class="flex justify-center space-x-3 lg:space-x-4 pt-2 lg:pt-4 animate-fade-in-up animate-delay-800"
        >
          <a
            href="https://www.esaps.net/"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:scale-125 transition-all duration-300 hover:shadow-lg"
            title="Personal Blog"
          >
            <span class="text-xs">📝</span>
          </a>
          <a
            href="https://www.esaps.net/feed/"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:scale-125 transition-all duration-300 hover:shadow-lg"
            title="RSS Feed"
          >
            <span class="text-xs">📡</span>
          </a>
          <a
            href="https://github.com/AptS-1547"
            class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-800 hover:text-white hover:scale-125 transition-all duration-300 hover:shadow-lg"
            title="GitHub"
          >
            <span class="text-xs">💻</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 右侧详细信息栏 - 移动端全宽，桌面端考虑左侧栏宽度 -->
    <div class="flex-1 lg:ml-[33.333333%] p-4 lg:p-8 overflow-y-auto">
      <div class="max-w-4xl mx-auto space-y-6 lg:space-y-8">
        <!-- About Me -->
        <section class="animate-fade-in-up animate-delay-1000">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-300 pb-2 hover:text-blue-600 transition-colors duration-300"
          >
            About Me
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
        <section class="animate-fade-in-up animate-delay-1200">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-300 pb-2 hover:text-blue-600 transition-colors duration-300"
          >
            Skills & Expertise
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <h3 class="font-medium text-gray-800 mb-2 text-sm lg:text-base">Backend</h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-blue-100 transition-colors duration-200"
                  >Rust</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >Node.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >Python</span
                >
              </div>
            </div>
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <h3 class="font-medium text-gray-800 mb-2 text-sm lg:text-base">Frontend</h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-blue-100 transition-colors duration-200"
                  >Vue.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >Nuxt.js</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >TypeScript</span
                >
              </div>
            </div>
            <div
              class="bg-white p-3 lg:p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <h3 class="font-medium text-gray-800 mb-2 text-sm lg:text-base">DevOps & Tools</h3>
              <div class="space-y-1">
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm hover:bg-blue-100 transition-colors duration-200"
                  >Docker</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >Git</span
                >
                <span
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs lg:text-sm ml-1 hover:bg-blue-100 transition-colors duration-200"
                  >Linux</span
                >
              </div>
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="animate-fade-in-up animate-delay-1400">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-300 pb-2 hover:text-blue-600 transition-colors duration-300"
          >
            Experience
          </h2>
          <div class="space-y-4 lg:space-y-6">
            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <h3 class="font-semibold text-gray-800 text-sm lg:text-base">
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
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                <h3 class="font-semibold text-gray-800 text-sm lg:text-base">Backend Developer</h3>
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
        <section class="animate-fade-in-up animate-delay-1600">
          <h2
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4 border-b border-gray-300 pb-2 hover:text-blue-600 transition-colors duration-300"
          >
            Featured Projects
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 group"
            >
              <h3
                class="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-sm lg:text-base"
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
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Rust</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Actix-web</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">SQLite</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Docker</span>
              </div>
              <a
                href="https://github.com/AptS-1547/shortlinker"
                target="_blank"
                class="inline-flex items-center text-xs lg:text-sm text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1"
              >
                <span>View Project</span>
                <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  >→</span
                >
              </a>
            </div>

            <div
              class="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 group"
            >
              <h3
                class="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-sm lg:text-base"
              >
                Ferrus Gate - Modern Identity Gateway
              </h3>
              <p class="text-gray-600 text-xs lg:text-sm mb-3">
                A modern identity gateway built with Rust, supporting OAuth2, OIDC, SAML, and
                Passkey (FIDO2) protocols. Provides unified authentication entry and account
                management platform for distributed systems with multi-tenant support, passwordless
                login, MFA, and pluggable architecture.
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Rust</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">OAuth2</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">OIDC</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">FIDO2</span>
              </div>
              <a
                href="https://github.com/FerrusGate/FerrusGate"
                target="_blank"
                class="inline-flex items-center text-xs lg:text-sm text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1"
              >
                <span>View Project</span>
                <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  >→</span
                >
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 自定义样式 */
.bg-gray-50 {
  background-color: #f9fafb;
}

.border-gray-300 {
  border-color: #dee2e6;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-400 {
  animation-delay: 0.4s;
}

.animate-delay-600 {
  animation-delay: 0.6s;
}

.animate-delay-800 {
  animation-delay: 0.8s;
}

.animate-delay-1000 {
  animation-delay: 1s;
}

.animate-delay-1200 {
  animation-delay: 1.2s;
}

.animate-delay-1400 {
  animation-delay: 1.4s;
}

.animate-delay-1600 {
  animation-delay: 1.6s;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 移动端优化 */
@media (max-width: 1024px) {
  .animate-slide-in-left {
    animation: fadeInUp 1s ease-out forwards;
  }

  /* 禁用移动端悬停效果 */
  @media (hover: none) {
    .hover\:scale-110:hover {
      transform: none;
    }

    .hover\:scale-125:hover {
      transform: none;
    }

    .hover\:-translate-y-1:hover {
      transform: none;
    }

    .hover\:-translate-y-2:hover {
      transform: none;
    }
  }
}

/* 确保移动端文本不会过小 */
@media (max-width: 640px) {
  .text-xs {
    font-size: 0.75rem;
  }
}
</style>
