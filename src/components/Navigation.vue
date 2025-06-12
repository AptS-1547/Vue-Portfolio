<template>
  <nav
    class="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm animate-slide-down overflow-x-hidden w-full"
  >
    <div class="max-w-6xl mx-auto px-4 xl:px-8 2xl:px-16 w-full">
      <div class="flex justify-between items-center py-3">
        <!-- Logo/Brand -->
        <router-link
          to="/"
          class="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-[#ed9a28] transition-all duration-200 hover:scale-105 touch:hover:scale-100 animate-bounce-in"
        >
          <span class="animate-rotate-in">🚀</span>
          <span class="animate-slide-in-left">AptS-1547</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6 animate-stagger-in">
          <router-link
            to="/"
            :class="[
              'px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 relative group',
              $route.path === '/' ? 'text-[#ed9a28]' : 'text-gray-600 hover:text-[#ed9a28]',
            ]"
          >
            Home
            <span
              :class="[
                'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 transform origin-center',
                $route.path === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              ]"
            ></span>
          </router-link>
          <router-link
            to="/projects"
            :class="[
              'px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 relative group',
              $route.path.startsWith('/projects')
                ? 'text-[#ed9a28]'
                : 'text-gray-600 hover:text-[#ed9a28]',
            ]"
          >
            Projects
            <span
              :class="[
                'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 transform origin-center',
                $route.path.startsWith('/projects')
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100',
              ]"
            ></span>
          </router-link>
          <a
            href="https://www.esaps.net/"
            target="_blank"
            class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#ed9a28] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0 relative group"
          >
            Blog
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 transform origin-center scale-x-0 group-hover:scale-x-100"
            ></span>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-md text-gray-600 hover:text-[#ed9a28] hover:bg-gray-50 transition-all duration-200 hover:scale-110 touch:hover:scale-100"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-90': mobileMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-3 space-y-2 animate-mobile-menu-slide w-full overflow-x-hidden"
      >
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:translate-x-2 touch:hover:scale-100 touch:hover:translate-x-0 animate-mobile-item',
            $route.path === '/'
              ? 'text-[#ed9a28] bg-gradient-to-r from-orange-50 to-cyan-50'
              : 'text-gray-600 hover:text-[#ed9a28] hover:bg-gradient-to-r hover:from-orange-50 hover:to-cyan-50',
          ]"
          style="animation-delay: 0.05s"
        >
          Home
        </router-link>
        <router-link
          to="/projects"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:translate-x-2 touch:hover:scale-100 touch:hover:translate-x-0 animate-mobile-item',
            $route.path.startsWith('/projects')
              ? 'text-[#ed9a28] bg-gradient-to-r from-orange-50 to-cyan-50'
              : 'text-gray-600 hover:text-[#ed9a28] hover:bg-gradient-to-r hover:from-orange-50 hover:to-cyan-50',
          ]"
          style="animation-delay: 0.1s"
        >
          Projects
        </router-link>
        <a
          href="https://www.esaps.net/"
          target="_blank"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#ed9a28] hover:bg-gradient-to-r hover:from-orange-50 hover:to-cyan-50 transition-all duration-200 hover:scale-105 hover:translate-x-2 touch:hover:scale-100 touch:hover:translate-x-0 animate-mobile-item"
          style="animation-delay: 0.15s"
        >
          Blog
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes staggerIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mobileMenuSlide {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes mobileItem {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.animate-slide-in-left {
  animation: slideInLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-rotate-in {
  animation: rotateIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-stagger-in {
  animation: staggerIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.animate-mobile-menu-slide {
  animation: mobileMenuSlide 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-mobile-item {
  animation: mobileItem 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
}
</style>
