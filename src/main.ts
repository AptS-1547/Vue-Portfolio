import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useThemeStore } from '@/stores/theme'

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

app.mount('#app')
