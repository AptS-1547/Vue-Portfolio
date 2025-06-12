import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: 'Projects - AptS-1547',
      },
    },
    {
      path: '/projects/:id',
      name: 'ProjectDetail',
      component: () => import('../views/ProjectDetailView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如浏览器后退/前进），使用保存的位置
    if (savedPosition) {
      return new Promise((resolve) => {
        // 延迟一下确保页面渲染完成
        setTimeout(() => {
          resolve(savedPosition)
        }, 100)
      })
    }

    // 如果是锚点链接
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // 考虑固定导航栏的高度
      }
    }

    // 默认回到页面顶部
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    }
  },
})

export default router
