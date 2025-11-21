import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalInfo, AboutMe, Skills, Experience, FeaturedProjects } from '@/types/profile'

/**
 * 使用 i18n 的个人信息数据
 */
export function useProfileI18n() {
  const { t } = useI18n()

  // 个人信息
  const personalInfo = computed<PersonalInfo>(() => ({
    name: 'AptS-1547', // 名字通常不翻译
    title: t('profile.personalInfo.title'),
    tagline: t('profile.personalInfo.tagline'),
    email: 'AptS-1547@esaps.net', // 邮箱不翻译
    avatar: {
      url: 'https://weavatar.com/avatar/a12172cc89e35b5c4482afdb1f76b98c8c6bf3aa6aa4b4001c401638c6780ab2?s=512&d=mm&r=g',
      alt: 'Avatar',
    },
    socialLinks: [
      {
        name: t('profile.socialLinks.personalBlog'),
        url: 'https://www.esaps.net/',
        icon: 'DocumentTextIcon',
        hoverColor: '#ed9a28',
      },
      {
        name: t('profile.socialLinks.rssFeed'),
        url: 'https://www.esaps.net/feed/',
        icon: 'RssIcon',
        hoverColor: '#6dd0e0',
      },
      {
        name: t('profile.socialLinks.github'),
        url: 'https://github.com/AptS-1547',
        icon: 'CodeBracketIcon',
        hoverColor: '#374151',
      },
    ],
  }))

  // 关于我
  const aboutMe = computed<AboutMe>(() => ({
    title: t('profile.aboutMe.title'),
    content: t('profile.aboutMe.content'),
  }))

  // 技能
  const skills = computed<Skills>(() => ({
    title: t('profile.skills.title'),
    categories: [
      {
        name: t('profile.skills.categories.backend'),
        hoverColor: '#ed9a28',
        borderColor: '#ed9a28',
        technologies: [
          { name: 'Rust', hoverColor: '#ed9a28' },
          { name: 'Node.js', hoverColor: '#ed9a28' },
          { name: 'Python', hoverColor: '#ed9a28' },
        ],
      },
      {
        name: t('profile.skills.categories.frontend'),
        hoverColor: '#6dd0e0',
        borderColor: '#6dd0e0',
        technologies: [
          { name: 'Vue.js', hoverColor: '#6dd0e0' },
          { name: 'Next.js', hoverColor: '#6dd0e0' },
          { name: 'TypeScript', hoverColor: '#6dd0e0' },
        ],
      },
      {
        name: t('profile.skills.categories.devops'),
        hoverColor: '#6b7280',
        borderColor: '#6b7280',
        technologies: [
          { name: 'Docker', hoverColor: '#6b7280' },
          { name: 'Git', hoverColor: '#6b7280' },
          { name: 'Linux', hoverColor: '#6b7280' },
        ],
      },
    ],
  }))

  // 工作经历
  const experience = computed<Experience>(() => ({
    title: t('profile.experience.title'),
    positions: [
      {
        title: t('profile.experience.positions.0.title'),
        company: t('profile.experience.positions.0.company'),
        period: t('profile.experience.positions.0.period'),
        hoverColor: '#ed9a28',
        description: t('profile.experience.positions.0.description'),
      },
      {
        title: t('profile.experience.positions.1.title'),
        company: t('profile.experience.positions.1.company'),
        period: t('profile.experience.positions.1.period'),
        hoverColor: '#6dd0e0',
        description: t('profile.experience.positions.1.description'),
      },
      {
        title: t('profile.experience.positions.2.title'),
        company: t('profile.experience.positions.2.company'),
        period: t('profile.experience.positions.2.period'),
        hoverColor: '#10b981',
        description: t('profile.experience.positions.2.description'),
      },
    ],
  }))

  // 特色项目
  const featuredProjects = computed<FeaturedProjects>(() => ({
    title: t('profile.featuredProjects.title'),
    viewAllLink: {
      text: t('common.buttons.viewAll'),
      route: '/projects',
    },
    projects: [
      {
        id: 'shortlinker',
        title: t('projects.shortlinker.title'),
        description: t('projects.shortlinker.description'),
        tags: ['Rust', 'Actix-web', 'SQLite', 'Docker'],
        hoverColor: '#ed9a28',
        linkText: t('common.buttons.viewProject'),
      },
      {
        id: 'ferrus-gate',
        title: t('projects.ferrus-gate.title'),
        description: t('projects.ferrus-gate.description'),
        tags: ['Rust', 'OAuth2', 'OIDC', 'FIDO2'],
        hoverColor: '#8b5cf6',
        linkText: t('common.buttons.viewProject'),
      },
      {
        id: 'onebot-github-webhook',
        title: t('projects.onebot-github-webhook.title'),
        description: t('projects.onebot-github-webhook.description'),
        tags: ['Python', 'FastAPI', 'OneBot', 'Docker'],
        hoverColor: '#6dd0e0',
        linkText: t('common.buttons.viewProject'),
      },
      {
        id: 'vue-portfolio',
        title: t('projects.vue-portfolio.title'),
        description: t('projects.vue-portfolio.description'),
        tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
        hoverColor: '#10b981',
        linkText: t('common.buttons.viewProject'),
      },
      {
        id: 'wakatime-readme-updater',
        title: t('projects.wakatime-readme-updater.title'),
        description: t('projects.wakatime-readme-updater.description'),
        tags: ['Rust', 'GitHub Actions', 'Automation'],
        hoverColor: '#f59e0b',
        linkText: t('common.buttons.viewProject'),
      },
      {
        id: 'nginx-modsecurity',
        title: t('projects.nginx-modsecurity.title'),
        description: t('projects.nginx-modsecurity.description'),
        tags: ['Docker', 'Nginx', 'ModSecurity', 'WAF'],
        hoverColor: '#ef4444',
        linkText: t('common.buttons.viewProject'),
      },
    ],
  }))

  return {
    personalInfo,
    aboutMe,
    skills,
    experience,
    featuredProjects,
  }
}
