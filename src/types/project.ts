export interface TechItem {
  name: string
  purpose: string
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
  status: 'active' | 'archived' | 'in-development'
  license?: string
  features?: string[]
  techStack?: {
    backend?: TechItem[]
    frontend?: TechItem[]
    tools?: TechItem[]
  }
  performance?: Array<{
    name: string
    value: string
  }>
}
