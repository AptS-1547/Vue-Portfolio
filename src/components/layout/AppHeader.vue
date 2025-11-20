<template>
  <nav
    :class="`${styles.background} ${styles.backdropBlur} ${styles.border} ${styles.position} ${styles.zIndex} ${styles.shadow} ${animations.navbar.name} w-full`"
  >
    <div :class="`${styles.container.maxWidth} mx-auto ${styles.container.padding} w-full`">
      <div :class="`flex justify-between items-center ${styles.container.innerPadding}`">
        <!-- Logo/Brand -->
        <router-link
          :to="logo.homeLink"
          :class="`${styles.logo.base} ${styles.logo.hover} ${styles.logo.hoverColor} ${animations.logo.container}`"
          @click="closeMobileMenu"
        >
          <RocketLaunchIcon :class="`w-5 h-5 ${animations.logo.icon}`" />
          <span :class="animations.logo.text">{{ logo.text }}</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div :class="`${styles.desktopMenu.container} ${animations.desktopMenu}`">
          <template v-for="item in menu" :key="item.name">
            <!-- 内部链接 -->
            <router-link
              v-if="item.type === 'internal'"
              :to="item.path"
              :class="[
                `${styles.desktopMenu.item.base} ${styles.desktopMenu.item.hover}`,
                isActiveRoute(item.path)
                  ? styles.desktopMenu.item.active
                  : styles.desktopMenu.item.inactive,
              ]"
            >
              {{ getMenuItemName(item.name) }}
              <span
                :class="[
                  styles.desktopMenu.underline.base,
                  isActiveRoute(item.path)
                    ? styles.desktopMenu.underline.active
                    : styles.desktopMenu.underline.inactive,
                ]"
              ></span>
            </router-link>

            <!-- 外部链接 -->
            <a
              v-else
              :href="item.path"
              :target="item.target || '_self'"
              :class="`${styles.desktopMenu.item.base} ${styles.desktopMenu.item.hover} ${styles.desktopMenu.item.inactive}`"
            >
              {{ getMenuItemName(item.name) }}
              <span
                :class="`${styles.desktopMenu.underline.base} ${styles.desktopMenu.underline.inactive}`"
              ></span>
            </a>
          </template>

          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Theme Switcher -->
          <ThemeSwitcher />
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          :class="`${styles.mobileMenu.button.base} ${styles.mobileMenu.button.hover}`"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon v-if="!mobileMenuOpen" class="w-5 h-5" />
          <XMarkIcon v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition v-bind="animations.mobileMenu.transition">
        <div v-show="mobileMenuOpen" :class="styles.mobileMenu.container">
          <template v-for="item in menu" :key="`mobile-${item.name}`">
            <!-- 内部链接 -->
            <router-link
              v-if="item.type === 'internal'"
              :to="item.path"
              @click="handleMobileNavClick"
              :class="[
                `${styles.mobileMenu.item.base} ${styles.mobileMenu.item.hover}`,
                isActiveRoute(item.path)
                  ? styles.mobileMenu.item.active
                  : styles.mobileMenu.item.inactive,
              ]"
            >
              {{ getMenuItemName(item.name) }}
            </router-link>

            <!-- 外部链接 -->
            <a
              v-else
              :href="item.path"
              :target="item.target || '_self'"
              @click="handleMobileNavClick"
              :class="`${styles.mobileMenu.item.base} ${styles.mobileMenu.item.hover} ${styles.mobileMenu.item.inactive}`"
            >
              {{ getMenuItemName(item.name) }}
            </a>
          </template>

          <!-- Language Switcher for Mobile -->
          <div
            class="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-2"
          >
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { RocketLaunchIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { navigationConfig } from '@/config/navigation'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)
const { t } = useI18n()

// 解构配置
const { logo, menu, styles, animations, responsive } = navigationConfig

// 获取翻译后的菜单项名称
const getMenuItemName = (itemName: string) => {
  const menuKey = itemName.toLowerCase()
  return t(`navigation.menu.${menuKey}`)
}

// 判断路由是否激活
const isActiveRoute = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// 切换移动菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭移动菜单
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// 处理移动端导航点击
const handleMobileNavClick = () => {
  if (responsive.mobile.autoClose) {
    setTimeout(() => {
      closeMobileMenu()
    }, 100)
  }
}

// 监听路由变化，自动关闭移动菜单
if (responsive.mobile.autoClose) {
  watch(
    () => route.path,
    () => {
      closeMobileMenu()
    },
  )
}

// 监听窗口大小变化
const handleResize = () => {
  if (responsive.mobile.closeOnResize && window.innerWidth >= responsive.breakpoints.mobile) {
    closeMobileMenu()
  }
}

// 点击外部区域关闭移动菜单
const handleClickOutside = (event: Event) => {
  if (responsive.mobile.closeOnOutsideClick) {
    const nav = document.querySelector('nav')
    if (nav && !nav.contains(event.target as Node)) {
      closeMobileMenu()
    }
  }
}

// 监听 ESC 键关闭移动菜单
const handleEscKey = (event: KeyboardEvent) => {
  if (responsive.mobile.closeOnEscape && event.key === 'Escape') {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
/* ...existing code... */
</style>
