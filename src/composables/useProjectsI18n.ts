import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types/project'
import { projects as staticProjects } from '@/data/projects'

/**
 * 使用 i18n 的项目数据
 */
export function useProjectsI18n() {
  const { t } = useI18n()

  // 将项目数据转换为i18n版本
  const projects = computed<Project[]>(() => {
    return staticProjects.map((project) => ({
      ...project,
      title: t(`projects.${project.id}.title`),
      description: t(`projects.${project.id}.description`),
      longDescription: t(`projects.${project.id}.longDescription`),
      features: project.features
        ? project.features.map((_, index) => t(`projects.${project.id}.features.${index}`))
        : [],
      techStack: project.techStack?.map((category, categoryIndex) => ({
        name: category.name,
        items: category.items.map((tech, index) => ({
          name: tech.name,
          purpose: t(`projects.${project.id}.techStack.${categoryIndex}.items.${index}.purpose`),
        })),
      })),
      performance:
        project.performance?.map((perf, index) => ({
          name: t(`projects.${project.id}.performance.${index}.name`),
          value: t(`projects.${project.id}.performance.${index}.value`),
        })) || [],
    }))
  })

  return {
    projects,
  }
}
