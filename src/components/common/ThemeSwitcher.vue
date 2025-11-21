<script setup lang="ts">
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)
const { setTheme, toggleTheme } = themeStore
const showMenu = ref(false)

const themes = computed(() => [
  { value: 'light' as const, label: t('common.theme.light'), icon: SunIcon },
  { value: 'dark' as const, label: t('common.theme.dark'), icon: MoonIcon },
  { value: 'system' as const, label: t('common.theme.system'), icon: ComputerDesktopIcon },
])

const currentThemeLabel = computed(() => {
  const theme = themes.value.find((t) => t.value === themeMode.value)
  return theme ? theme.label : t('common.theme.system')
})

const selectTheme = (value: 'light' | 'dark' | 'system') => {
  setTheme(value)
  showMenu.value = false
}
</script>

<template>
  <div class="relative">
    <!-- 主按钮 -->
    <button
      @click="toggleTheme"
      class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      :aria-label="`${t('common.theme.currentTheme')}: ${currentThemeLabel}`"
    >
      <SunIcon v-if="themeMode === 'light'" class="w-5 h-5" />
      <MoonIcon v-else-if="themeMode === 'dark'" class="w-5 h-5" />
      <ComputerDesktopIcon v-else class="w-5 h-5" />
    </button>

    <!-- 下拉菜单（可选，长按显示） -->
    <div
      v-if="showMenu"
      class="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg py-1 z-50"
    >
      <button
        v-for="theme in themes"
        :key="theme.value"
        @click="selectTheme(theme.value)"
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
        :class="{
          'text-primary dark:text-primary font-medium': themeMode === theme.value,
          'text-gray-700 dark:text-gray-300': themeMode !== theme.value,
        }"
      >
        <component :is="theme.icon" class="w-4 h-4" />
        {{ theme.label }}
      </button>
    </div>
  </div>
</template>
