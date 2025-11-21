import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types/project'

/**
 * 使用 i18n 的项目数据
 *
 * 直接从当前语言的翻译文件中获取项目数据
 * 所有语言的项目数据结构已通过验证脚本确保一致性
 */
export function useProjectsI18n() {
  const { messages, locale } = useI18n()

  // 从当前语言的翻译数据中获取项目
  const projects = computed<Project[]>(() => {
    const currentLocale = locale.value
    const projectsData = messages.value[currentLocale]?.projects

    if (!projectsData) {
      console.warn(`未找到语言 ${currentLocale} 的项目数据`)
      return []
    }

    // 将对象转换为数组
    return Object.values(projectsData) as Project[]
  })

  return {
    projects,
  }
}
