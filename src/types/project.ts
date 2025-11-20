export interface TechItem {
  name: string
  purpose: string
}

export interface TechCategory {
  name: string // 分类的 key，用于 i18n，如 'backend', 'frontend', 'infrastructure' 等
  items: TechItem[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  stars?: number
  language: string
  status: 'active' | 'archived' | 'in-development' | 'planned'
  license?: string
  features?: string[]
  techStack?: TechCategory[] // 灵活的分类数组，每个项目可自定义分类
  performance?: Array<{
    name: string
    value: string
  }>
}
