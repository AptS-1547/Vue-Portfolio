import { ref, computed, watch, onMounted } from 'vue'
import { generateCSSVariables } from '@/config/theme'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

// 全局状态，确保所有组件共享同一个主题状态
const themeMode = ref<ThemeMode>('system')
const resolvedTheme = ref<ResolvedTheme>('light')

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
const watchSystemTheme = () => {
  if (typeof window === 'undefined') return

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => {
    if (themeMode.value === 'system') {
      const newTheme = getSystemTheme()
      resolvedTheme.value = newTheme
      applyTheme(newTheme)
    }
  }

  mediaQuery.addEventListener('change', handler)
  return () => mediaQuery.removeEventListener('change', handler)
}

export function useTheme() {
  // 切换主题模式
  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode
    const resolved = resolveTheme(mode)
    resolvedTheme.value = resolved
    applyTheme(resolved)

    // 保存到 localStorage
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch (e) {
      console.warn('Failed to save theme preference:', e)
    }
  }

  // 切换亮色/暗色（忽略 system 模式）
  const toggleTheme = () => {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
  }

  // 初始化主题
  const initTheme = () => {
    // 从 localStorage 读取偏好
    let savedTheme: ThemeMode = 'system'
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        savedTheme = saved
      }
    } catch (e) {
      console.warn('Failed to read theme preference:', e)
    }

    themeMode.value = savedTheme
    resolvedTheme.value = resolveTheme(savedTheme)
    applyTheme(resolvedTheme.value)

    // 监听系统主题变化
    watchSystemTheme()
  }

  // 计算属性：是否为暗色模式
  const isDark = computed(() => resolvedTheme.value === 'dark')

  onMounted(() => {
    // 如果还没初始化过，就初始化
    if (!document.documentElement.classList.contains('dark') && resolvedTheme.value === 'light') {
      initTheme()
    }
  })

  return {
    // 状态
    themeMode: computed(() => themeMode.value),
    resolvedTheme: computed(() => resolvedTheme.value),
    isDark,

    // 方法
    setTheme,
    toggleTheme,
    initTheme,
  }
}
