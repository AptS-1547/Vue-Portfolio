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
          @click.stop="toggleMobileMenu"
          :class="`${styles.mobileMenu.button.base} ${styles.mobileMenu.button.hover}`"
          :aria-expanded="mobileMenuOpen"
          :aria-label="t('common.accessibility.toggleNavigationMenu')"
        >
          <Bars3Icon v-if="!mobileMenuOpen" class="w-5 h-5 pointer-events-none" />
          <XMarkIcon v-else class="w-5 h-5 pointer-events-none" />
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <Teleport to="body">
        <!-- Backdrop -->
        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="mobileMenuOpen"
            @click="closeMobileMenu"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
          ></div>
        </Transition>

        <!-- Drawer -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-300 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-show="mobileMenuOpen"
            class="fixed top-0 right-0 h-full w-[80vw] max-w-[320px] bg-white dark:bg-gray-900 shadow-2xl z-[9999] lg:hidden overflow-y-auto"
          >
            <!-- Drawer Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-center space-x-3">
                <RocketLaunchIcon class="w-6 h-6 text-[var(--color-primary)]" />
                <span class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ logo.text }}</span>
              </div>
              <button
                @click="closeMobileMenu"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                :aria-label="t('common.accessibility.closeMenu')"
              >
                <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <!-- Drawer Navigation -->
            <nav class="flex flex-col p-4 space-y-1">
              <template v-for="item in menu" :key="`mobile-${item.name}`">
                <!-- 内部链接 -->
                <router-link
                  v-if="item.type === 'internal'"
                  :to="item.path"
                  @click="handleMobileNavClick"
                  :class="[
                    'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-orange-50 to-cyan-50 dark:from-orange-950/30 dark:to-cyan-950/30 text-[var(--color-primary)]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--color-primary)]',
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
                  class="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--color-primary)] transition-all duration-200"
                >
                  {{ getMenuItemName(item.name) }}
                </a>
              </template>
            </nav>

            <!-- Drawer Footer - Settings -->
            <div class="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
              <div class="space-y-3">
                <!-- Language Switcher -->
                <div class="flex items-center justify-between px-4 py-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('common.settings.language') }}</span>
                  <LanguageSwitcher />
                </div>
                <!-- Theme Switcher -->
                <div class="flex items-center justify-between px-4 py-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('common.settings.theme') }}</span>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
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
  // 只在菜单打开时才处理外部点击
  if (!mobileMenuOpen.value || !responsive.mobile.closeOnOutsideClick) {
    return
  }

  const nav = document.querySelector('nav')
  if (nav && !nav.contains(event.target as Node)) {
    closeMobileMenu()
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
