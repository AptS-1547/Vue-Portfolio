import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        titleKey: 'common.pageTitles.home',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: {
        titleKey: 'common.pageTitles.projects',
      },
    },
    {
      path: '/projects/:id',
      name: 'ProjectDetail',
      component: () => import('../views/ProjectDetailView.vue'),
      meta: {
        titleKey: 'common.pageTitles.projectDetail',
        requiresProjectTitle: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        titleKey: 'common.pageTitles.notFound',
      },
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

// 辅助函数：更新 meta 标签
function updateMetaTag(property: string, content: string, useProperty = true) {
  const attribute = useProperty ? 'property' : 'name'
  let element = document.querySelector(`meta[${attribute}="${property}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

// 路由守卫：自动更新页面标题和 meta 标签
router.beforeEach((to, _from, next) => {
  // 获取当前语言的翻译函数
  const t = i18n.global.t

  // 获取路由的 titleKey
  const titleKey = to.meta.titleKey as string | undefined

  // 基础信息
  const baseUrl = 'https://me.esaps.net'
  const currentUrl = `${baseUrl}${to.path}`

  if (titleKey) {
    let title = t(titleKey)
    let description = t('common.pageTitles.home') // 默认描述

    // 如果需要动态项目标题
    if (to.meta.requiresProjectTitle && to.params.id) {
      // 尝试从 i18n 获取项目标题和描述
      const projectTitleKey = `projects.${to.params.id}.title`
      const projectDescKey = `projects.${to.params.id}.description`
      const projectTitle = t(projectTitleKey)
      const projectDesc = t(projectDescKey)

      // 如果翻译存在且不是key本身，则使用项目标题替换占位符
      if (projectTitle && projectTitle !== projectTitleKey) {
        title = title.replace('{title}', projectTitle)
        description = projectDesc && projectDesc !== projectDescKey ? projectDesc : title
      }
    } else if (to.name === 'projects') {
      description = 'Browse all my projects including Rust, Node.js, Vue.js and more'
    }

    // 更新页面标题
    document.title = title

    // 更新 meta 描述
    updateMetaTag('description', description, false)

    // 更新 Open Graph 标签
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:url', currentUrl)

    // 更新 Twitter Card 标签
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)

    // 更新 canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentUrl)
  }

  next()
})

export default router
