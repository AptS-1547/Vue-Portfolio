<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-3">
        <!-- Logo/Brand -->
        <router-link
          to="/"
          class="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          <span>🚀</span>
          <span>AptS-1547</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            :class="[
              'px-3 py-2 text-sm font-medium transition-colors duration-300',
              $route.path === '/'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600',
            ]"
          >
            Home
          </router-link>
          <router-link
            to="/projects"
            :class="[
              'px-3 py-2 text-sm font-medium transition-colors duration-300',
              $route.path.startsWith('/projects')
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600',
            ]"
          >
            Projects
          </router-link>
          <a
            href="https://www.esaps.net/"
            target="_blank"
            class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Blog
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
        >
          <svg
            class="w-5 h-5"
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
        class="md:hidden border-t border-gray-200 py-3 space-y-2 animate-fade-in"
      >
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-3 py-2 text-sm font-medium transition-colors duration-300',
            $route.path === '/'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Home
        </router-link>
        <router-link
          to="/projects"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-3 py-2 text-sm font-medium transition-colors duration-300',
            $route.path.startsWith('/projects')
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Projects
        </router-link>
        <a
          href="https://www.esaps.net/"
          target="_blank"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
