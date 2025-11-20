import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { generateCSSVariables } from '@/config/theme'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

// localStorage 降级方案：内存缓存
const memoryStorage: Record<string, string> = {}

// 安全的 localStorage 包装器
const storage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.warn('localStorage.getItem failed, using memory storage:', e)
      return memoryStorage[key] || null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      console.warn('localStorage.setItem failed, using memory storage:', e)
      memoryStorage[key] = value
    }
  },
}

// 检测系统主题
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// 解析主题模式
const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
  return mode === 'system' ? getSystemTheme() : mode
}

// 应用主题到文档
const applyTheme = (theme: ResolvedTheme) => {
  const root = document.documentElement

  // 更新 class
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // 更新 CSS 变量
  const variables = generateCSSVariables(theme)
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 更新 meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#030712' : '#ffffff')
  }
}

// 监听系统主题变化
let systemThemeCleanup: (() => void) | null = null

const watchSystemTheme = (
  currentMode: ThemeMode,
  onThemeChange: (theme: ResolvedTheme) => void,
) => {
  if (typeof window === 'undefined') return

  // 清理之前的监听器
  if (systemThemeCleanup) {
    systemThemeCleanup()
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => {
    if (currentMode === 'system') {
      const newTheme = getSystemTheme()
      onThemeChange(newTheme)
    }
  }

  mediaQuery.addEventListener('change', handler)
  systemThemeCleanup = () => mediaQuery.removeEventListener('change', handler)
}

export const useThemeStore = defineStore('theme', () => {
  // State
  const themeMode = ref<ThemeMode>('system')
  const resolvedTheme = ref<ResolvedTheme>('light')

  // Getters
  const isDark = computed(() => resolvedTheme.value === 'dark')

  // Actions
  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode
    const resolved = resolveTheme(mode)
    resolvedTheme.value = resolved
    applyTheme(resolved)

    // 保存到 storage（带降级）
    storage.setItem(STORAGE_KEY, mode)

    // 更新系统主题监听
    watchSystemTheme(mode, (newTheme) => {
      resolvedTheme.value = newTheme
      applyTheme(newTheme)
    })
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
  }

  const initialize = () => {
    // 从 storage 读取偏好（带降级）
    let savedTheme: ThemeMode = 'system'
    const saved = storage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      savedTheme = saved
    }

    themeMode.value = savedTheme
    resolvedTheme.value = resolveTheme(savedTheme)
    applyTheme(resolvedTheme.value)

    // 监听系统主题变化
    watchSystemTheme(savedTheme, (newTheme) => {
      resolvedTheme.value = newTheme
      applyTheme(newTheme)
    })
  }

  return {
    // State
    themeMode: computed(() => themeMode.value),
    resolvedTheme: computed(() => resolvedTheme.value),
    isDark,

    // Actions
    setTheme,
    toggleTheme,
    initialize,
  }
})
