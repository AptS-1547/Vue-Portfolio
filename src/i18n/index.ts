import { createI18n } from 'vue-i18n'
import type { I18nOptions } from 'vue-i18n'

// 直接导入所有语言
import zhCN from './locales/zh-CN'
import en from './locales/en'
import ja from './locales/ja'

// 支持的语言列表
export const SUPPORT_LOCALES = ['zh-CN', 'en', 'ja'] as const
export type Locale = (typeof SUPPORT_LOCALES)[number]

// localStorage key
const LOCALE_STORAGE_KEY = 'user-locale'

// 获取浏览器语言
function getBrowserLocale(): Locale {
  const browserLocale = navigator.language

  // 精确匹配
  if (SUPPORT_LOCALES.includes(browserLocale as Locale)) {
    return browserLocale as Locale
  }

  // 语言代码匹配（如 zh 匹配 zh-CN）
  const languageCode = browserLocale.split('-')[0] || 'zh'
  const matched = SUPPORT_LOCALES.find((locale) => locale.startsWith(languageCode))
  if (matched) {
    return matched
  }

  // 默认中文
  return 'zh-CN'
}

// 获取初始语言
function getInitialLocale(): Locale {
  // 优先从 localStorage 读取
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
  if (stored && SUPPORT_LOCALES.includes(stored)) {
    return stored
  }

  // 其次使用浏览器语言
  return getBrowserLocale()
}

// 保存语言选择
export function saveLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}

// 初始语言
const initialLocale = getInitialLocale()

// i18n 配置（直接加载所有语言）
const i18nOptions: I18nOptions = {
  legacy: false, // 使用 Composition API 模式
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    en: en,
    ja: ja,
  },
  globalInjection: true, // 全局注入 $t
  missingWarn: false,
  fallbackWarn: false,
}

const i18n = createI18n(i18nOptions)

// 设置 HTML lang 属性
document.documentElement.setAttribute('lang', initialLocale)

export default i18n
