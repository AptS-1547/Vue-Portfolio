import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useThemeStore } from '@/stores/theme'
import { initWebVitals } from '@/utils/webVitals'

const app = createApp(App)
const pinia = createPinia()

// 注册 Pinia（必须在使用 store 之前）
app.use(pinia)
app.use(router)
app.use(i18n)

// 在应用挂载前初始化主题，避免闪烁
// 注意：在 app 外部使用 store 需要传递 pinia 实例
const themeStore = useThemeStore(pinia)
themeStore.initialize()

// 初始化 Web Vitals 性能监控
// 仅在生产环境或明确启用时运行
if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_WEB_VITALS === 'true') {
  initWebVitals()
}

app.mount('#app')
