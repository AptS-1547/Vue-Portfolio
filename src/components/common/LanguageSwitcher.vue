<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES, saveLocale, type Locale } from '@/i18n'
import { LanguageIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const { locale, t } = useI18n()
const isOpen = ref(false)
const buttonRef = ref<HTMLButtonElement | null>(null)
const dropdownPosition = ref({ top: 0, right: 0 })

// 语言选项配置
const languageOptions = [
  { code: 'zh-CN' as Locale, label: '简体中文', flag: '🇨🇳' },
  { code: 'en' as Locale, label: 'English', flag: '🇺🇸' },
  { code: 'ja' as Locale, label: '日本語', flag: '🇯🇵' },
]

// 获取当前语言标签
const getCurrentLanguage = () => {
  return languageOptions.find((lang) => lang.code === locale.value)
}

// 计算下拉菜单位置
const updateDropdownPosition = () => {
  if (buttonRef.value) {
    const rect = buttonRef.value.getBoundingClientRect()
    const dropdownWidth = 192 // w-48 = 12rem = 192px

    // 计算从右边对齐的位置
    let rightPosition = window.innerWidth - rect.right

    // 检查是否会溢出左边
    const leftEdge = window.innerWidth - rightPosition - dropdownWidth
    if (leftEdge < 0) {
      // 如果会溢出，改为从左边对齐
      rightPosition = window.innerWidth - rect.left - dropdownWidth
      // 确保不会超出右边界
      if (rightPosition < 0) {
        rightPosition = 8 // 最小间距
      }
    }

    dropdownPosition.value = {
      top: rect.bottom + 8, // 按钮底部 + 8px 间距
      right: Math.max(8, rightPosition), // 确保最小间距为 8px
    }
  }
}

// 切换语言
const changeLanguage = (code: Locale) => {
  locale.value = code
  saveLocale(code)
  isOpen.value = false
}

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// 点击外部关闭
const closeDropdown = () => {
  isOpen.value = false
}

// 监听窗口大小变化，重新计算位置
const handleResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// 监听滚动事件，重新计算位置
const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// 监听 isOpen 变化
watch(isOpen, (newValue) => {
  if (newValue) {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)
  } else {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll, true)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div class="relative" @click.stop>
    <!-- 语言按钮 -->
    <button
      ref="buttonRef"
      @click.stop="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-200 rounded-md hover:text-[var(--color-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 touch:hover:scale-100"
      :class="{ 'text-primary bg-gray-50 dark:bg-gray-800': isOpen }"
      :aria-label="t('common.accessibility.changeLanguage')"
    >
      <LanguageIcon class="w-5 h-5" />
      <span class="hidden lg:inline">{{ getCurrentLanguage()?.label }}</span>
      <ChevronDownIcon
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- 下拉菜单 - 使用 Teleport 传送到 body -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          v-click-outside="closeDropdown"
          class="fixed w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-[9999]"
          :style="{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }"
        >
          <div class="py-1">
            <button
              v-for="lang in languageOptions"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              class="w-full flex items-center justify-between px-4 py-2 text-sm transition-colors duration-150"
              :class="[
                locale === lang.code
                  ? 'bg-linear-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 text-primary font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary',
              ]"
            >
              <span>{{ lang.label }}</span>
              <CheckIcon v-if="locale === lang.code" class="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
// 扩展 HTMLElement 类型以包含自定义属性
interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

// 自定义指令：点击外部关闭
export default {
  directives: {
    clickOutside: {
      mounted(el: HTMLElementWithClickOutside, binding: any) {
        el.clickOutsideEvent = (event: Event) => {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el: HTMLElementWithClickOutside) {
        if (el.clickOutsideEvent) {
          document.removeEventListener('click', el.clickOutsideEvent)
        }
      },
    },
  },
}
</script>
