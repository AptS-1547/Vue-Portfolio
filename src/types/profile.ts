/**
 * 个人信息配置类型定义
 * 为 src/data/profile.ts 提供完整的 TypeScript 类型支持
 */

/** 头像配置 */
export interface Avatar {
  url: string
  alt: string
}

/** 社交链接 */
export interface SocialLink {
  name: string
  url: string
  icon: string
  hoverColor: string
}

/** 个人信息 */
export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  email: string
  avatar: Avatar
  socialLinks: SocialLink[]
}

/** 关于我部分 */
export interface AboutMe {
  title: string
  content: string
}

/** 技术栈项 */
export interface Technology {
  name: string
  hoverColor: string
}

/** 技能类别 */
export interface SkillCategory {
  name: string
  hoverColor: string
  borderColor: string
  technologies: Technology[]
}

/** 技能配置 */
export interface Skills {
  title: string
  categories: SkillCategory[]
}

/** 职位/工作经历 */
export interface Position {
  title: string
  company: string
  period: string
  hoverColor: string
  description: string
}

/** 工作经历配置 */
export interface Experience {
  title: string
  positions: Position[]
}

/** 特色项目（首页展示的简化版本） */
export interface FeaturedProject {
  id: string
  title: string
  description: string
  tags: string[]
  hoverColor: string
  linkText: string
}

/** 特色项目配置 */
export interface FeaturedProjects {
  title: string
  viewAllLink: {
    text: string
    route: string
  }
  projects: FeaturedProject[]
}

/** 页面布局配置 */
export interface PageConfig {
  animationDelays: {
    aboutMe: string
    skills: string
    experience: string
    projects: string
  }
  layout: {
    leftPanelWidth: string
    maxContentWidth: string
    spacing: {
      section: string
      card: string
      skillGrid: string
    }
  }
}

/** 整体 Profile 配置 */
export interface ProfileConfig {
  personalInfo: PersonalInfo
  aboutMe: AboutMe
  skills: Skills
  experience: Experience
  featuredProjects: FeaturedProjects
  pageConfig: PageConfig
}
