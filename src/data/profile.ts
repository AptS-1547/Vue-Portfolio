/**
 * 个人信息配置文件
 * 统一管理个人简介、技能、经历等信息
 */

import type {
  PersonalInfo,
  AboutMe,
  Skills,
  Experience,
  FeaturedProjects,
  PageConfig,
  ProfileConfig,
} from '@/types/profile'

// 基本个人信息
export const personalInfo: PersonalInfo = {
  name: 'AptS-1547',
  title: 'Full-Stack Developer',
  tagline: 'Building modern web applications with Rust, Node.js & Vue...',
  email: 'AptS-1547@esaps.net',

  // 头像配置
  avatar: {
    url: 'https://weavatar.com/avatar/a12172cc89e35b5c4482afdb1f76b98c8c6bf3aa6aa4b4001c401638c6780ab2?s=512&d=mm&r=g',
    alt: 'Avatar',
  },

  // 社交链接
  socialLinks: [
    {
      name: 'Personal Blog',
      url: 'https://me.esaps.net/',
      icon: 'DocumentTextIcon',
      hoverColor: '#ed9a28',
    },
    {
      name: 'RSS Feed',
      url: 'https://me.esaps.net/feed/',
      icon: 'RssIcon',
      hoverColor: '#6dd0e0',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/AptS-1547',
      icon: 'CodeBracketIcon',
      hoverColor: '#374151',
    },
  ],
}

// 关于我部分
export const aboutMe: AboutMe = {
  title: 'About Me',
  content: `I'm a passionate full-stack developer with 6 years of experience building robust web applications. I specialize in modern tech stacks including Rust for backend systems, Node.js for APIs, Python for data processing, and Vue.js/Next.js for frontend development. I love sharing knowledge through technical writing and contributing to open-source projects.`,
}

// 技能配置
export const skills: Skills = {
  title: 'Skills & Expertise',
  categories: [
    {
      name: 'Backend',
      hoverColor: '#ed9a28',
      borderColor: '#ed9a28',
      technologies: [
        { name: 'Rust', hoverColor: '#ed9a28' },
        { name: 'Node.js', hoverColor: '#ed9a28' },
        { name: 'Python', hoverColor: '#ed9a28' },
      ],
    },
    {
      name: 'Frontend',
      hoverColor: '#6dd0e0',
      borderColor: '#6dd0e0',
      technologies: [
        { name: 'Vue.js', hoverColor: '#6dd0e0' },
        { name: 'Next.js', hoverColor: '#6dd0e0' },
        { name: 'TypeScript', hoverColor: '#6dd0e0' },
      ],
    },
    {
      name: 'DevOps & Tools',
      hoverColor: '#6b7280',
      borderColor: '#6b7280',
      technologies: [
        { name: 'Docker', hoverColor: '#6b7280' },
        { name: 'Git', hoverColor: '#6b7280' },
        { name: 'Linux', hoverColor: '#6b7280' },
      ],
    },
  ],
}

// 工作经历配置
export const experience: Experience = {
  title: 'Experience',
  positions: [
    {
      title: 'Full-Stack Developer & DevOps Engineer',
      company: 'Aberdeen Institute Digital Infrastructure Projects',
      period: '2024 - Present',
      hoverColor: '#ed9a28',
      description: `Leading full-stack development for digital infrastructure projects using Node.js for backend APIs, Vue.js with Vite for modern frontend applications, and handling comprehensive DevOps operations including server management, CI/CD pipeline automation, container orchestration with Docker, infrastructure monitoring, and deployment automation. Responsible for maintaining high-availability systems and ensuring scalable infrastructure solutions.`,
    },
    {
      title: 'Full-Stack Developer & DevOps Engineer & Technical Writer',
      company: 'The ESAP Project',
      period: '2021 - Present',
      hoverColor: '#6dd0e0',
      description: `Evolved from backend development to full-stack engineering, building microservices architecture with Node.js and Python, implementing modern frontend solutions with Vue.js and Rust. Handling DevOps operations including server management, automated deployment pipelines, and infrastructure optimization. Additionally maintaining a technical blog with 100+ monthly readers covering full-stack development, DevOps practices, and infrastructure topics.`,
    },
    {
      title: 'Technical Advisor & Mini-Program Developer',
      company: 'Guangdong Western Style Practice Team',
      period: '2025/7/7 - 2025/7/22',
      hoverColor: '#10b981',
      description: `Served as technical advisor for Beijie Central Primary School, providing guidance on National Education Platform usage and training teachers on digital educational tools. Developed two comprehensive mini-programs for Jiepo Village: an external e-commerce platform for local product sales and an internal community service application to enhance village management and resident convenience.`,
    },
  ],
}

// 特色项目配置
export const featuredProjects: FeaturedProjects = {
  title: 'Featured Projects',
  viewAllLink: {
    text: 'View All →',
    route: '/projects',
  },
  projects: [
    {
      id: 'shortlinker',
      title: 'ShortLinker - High-Performance URL Shortener',
      description: `A minimalist URL shortener service built with Rust and Actix-web, supporting HTTP 307 redirection. Achieves 700k+ QPS with smart caching, Bloom filters, and supports both SQLite and JSON storage backends. Features admin API, expiration support, and cross-platform deployment.`,
      tags: ['Rust', 'Actix-web', 'SQLite', 'Docker'],
      hoverColor: '#ed9a28',
      linkText: 'View Project',
    },
    {
      id: 'onebot-github-webhook',
      title: 'OneBot GitHub Webhook - QQ 通知服务',
      description: `一个强大的服务，通过 OneBot 协议将 GitHub Webhook 推送到 QQ 群。支持安全验证、灵活的仓库分支匹配、自定义消息格式，以及推送、PR、Issues 和 Releases 等全面的事件处理。具备通配符匹配、多群支持等高级功能。`,
      tags: ['Python', 'FastAPI', 'OneBot', 'Docker'],
      hoverColor: '#6dd0e0',
      linkText: 'View Project',
    },
  ],
}

// 页面配置
export const pageConfig: PageConfig = {
  // 动画延迟配置
  animationDelays: {
    aboutMe: '0.3s',
    skills: '0.3s',
    experience: '0.6s',
    projects: '0.3s',
  },

  // 响应式配置
  layout: {
    leftPanelWidth: '33.333333%', // lg:w-1/3
    maxContentWidth: '4xl', // max-w-4xl
    spacing: {
      section: 'space-y-6 lg:space-y-8',
      card: 'gap-4 lg:gap-6',
      skillGrid: 'gap-3 lg:gap-4',
    },
  },
}

// 导出默认配置
export const profileConfig: ProfileConfig = {
  personalInfo,
  aboutMe,
  skills,
  experience,
  featuredProjects,
  pageConfig,
}
