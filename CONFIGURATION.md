# 配置说明文档

本文档详细介绍了 Vue.js 个人作品集网站的所有配置选项，帮助您快速自定义网站内容和样式。

## 📋 目录

- [主题配置](#主题配置)
- [个人信息配置](#个人信息配置)
- [导航栏配置](#导航栏配置)
- [项目数据配置](#项目数据配置)
- [类型定义](#类型定义)

## 🎨 主题配置

主题配置文件位于：`src/config/theme.ts`

### 颜色配置

```typescript
// 主品牌色
colors.primary = {
  main: '#ed9a28', // 主色调
  light: '#f5b959', // 浅色调
  dark: '#d17d0a', // 深色调
  rgb: '237, 154, 40', // RGB 值
}

// 次要色彩
colors.secondary = {
  main: '#6dd0e0', // 次要色
  light: '#8ee5f3', // 浅色调
  dark: '#4abac9', // 深色调
  rgb: '109, 208, 224', // RGB 值
}
```

### 项目状态颜色

```typescript
colors.projectStatus = {
  active: '#10b981', // 活跃项目 - 绿色
  'in-development': '#f59e0b', // 开发中 - 黄色
  archived: '#6b7280', // 已归档 - 灰色
}
```

### 动画配置

```typescript
animations = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}
```

## 👤 个人信息配置

个人信息配置文件位于：`src/config/profile.ts`

### 基本信息

```typescript
personalInfo = {
  name: 'AptS-1547', // 姓名
  title: 'Full-Stack Developer', // 职位
  tagline: 'Building modern web...', // 标语
  email: 'AptS-1547@esaps.net', // 邮箱

  avatar: {
    url: 'https://example.com/avatar.jpg', // 头像链接
    alt: 'Avatar', // 头像描述
  },
}
```

### 社交链接

```typescript
personalInfo.socialLinks = [
  {
    name: 'Personal Blog', // 显示名称
    url: 'https://www.esaps.net/', // 链接地址
    icon: '📝', // 图标 (emoji)
    hoverColor: '#ed9a28', // 悬停颜色
  },
  // 可添加更多社交链接...
]
```

### About Me 部分

```typescript
aboutMe = {
  title: 'About Me', // 标题
  content: '详细的自我介绍内容...', // 内容
}
```

### 技能配置

```typescript
skills = {
  title: 'Skills & Expertise',
  categories: [
    {
      name: 'Backend', // 技能分类名
      hoverColor: '#ed9a28', // 悬停颜色
      borderColor: '#ed9a28', // 边框颜色
      technologies: [
        {
          name: 'Rust', // 技术名称
          hoverColor: '#ed9a28', // 悬停颜色
        },
        // 更多技术...
      ],
    },
    // 更多分类...
  ],
}
```

### 工作经历

```typescript
experience = {
  title: 'Experience',
  positions: [
    {
      title: 'Full-Stack Developer', // 职位
      company: 'Company Name', // 公司
      period: '2024 - Present', // 时间段
      hoverColor: '#ed9a28', // 悬停颜色
      description: '职位描述...', // 描述
    },
    // 更多经历...
  ],
}
```

### 特色项目

```typescript
featuredProjects = {
  title: 'Featured Projects',
  viewAllLink: {
    text: 'View All →',
    route: '/projects',
  },
  projects: [
    {
      id: 'project-id', // 项目 ID
      title: 'Project Title', // 项目标题
      description: '项目描述...', // 项目描述
      tags: ['Vue.js', 'TypeScript'], // 技术标签
      hoverColor: '#ed9a28', // 悬停颜色
      linkText: 'View Project', // 链接文字
    },
    // 更多项目...
  ],
}
```

## 🧭 导航栏配置

导航栏配置文件位于：`src/config/navigation.ts`

### Logo 配置

```typescript
logo = {
  icon: '🚀', // Logo 图标
  text: 'AptS-1547', // Logo 文字
  homeLink: '/', // 点击跳转链接
  hoverColor: '#ed9a28', // 悬停颜色
}
```

### 菜单配置

```typescript
navigationMenu = [
  {
    name: 'Home', // 菜单名称
    path: '/', // 链接路径
    type: 'internal', // 链接类型：internal | external
  },
  {
    name: 'Blog',
    path: 'https://blog.com',
    type: 'external',
    target: '_blank', // 外部链接打开方式
  },
]
```

### 样式配置

```typescript
navigationStyles = {
  background: 'bg-white/95', // 背景样式
  backdropBlur: 'backdrop-blur-md', // 背景模糊
  border: 'border-b border-gray-200', // 边框样式

  // Logo 样式
  logo: {
    base: 'flex items-center space-x-2...',
    hover: 'hover:scale-105',
    hoverColor: 'hover:text-[#ed9a28]',
  },

  // 桌面菜单样式
  desktopMenu: {
    // 详细样式配置...
  },

  // 移动菜单样式
  mobileMenu: {
    // 详细样式配置...
  },
}
```

### 响应式配置

```typescript
navigationResponsive = {
  breakpoints: {
    mobile: 768, // 移动端断点
  },
  mobile: {
    autoClose: true, // 路由切换时自动关闭
    closeOnOutsideClick: true, // 点击外部关闭
    closeOnEscape: true, // ESC 键关闭
    closeOnResize: true, // 窗口变化时关闭
  },
}
```

## 📂 项目数据配置

项目数据配置文件位于：`src/data/projects.ts`

### 项目结构

```typescript
{
  id: 'project-id',                    // 唯一标识符
  title: 'Project Title',             // 项目标题
  description: '简短描述',             // 简短描述
  longDescription: '详细描述...',      // 详细描述
  tags: ['Vue.js', 'TypeScript'],     // 技术标签
  githubUrl: 'https://github.com/...',// GitHub 链接
  liveUrl: 'https://demo.com',        // 演示链接（可选）
  language: 'TypeScript',             // 主要语言
  status: 'active',                   // 状态：active | in-development | archived
  license: 'MIT',                     // 许可证

  features: [                         // 主要特性（可选）
    '特性描述1',
    '特性描述2'
  ],

  techStack: {                        // 技术栈（可选）
    backend: [
      { name: 'Node.js', purpose: '后端运行时' }
    ],
    frontend: [
      { name: 'Vue.js', purpose: '前端框架' }
    ],
    tools: [
      { name: 'Docker', purpose: '容器化部署' }
    ]
  },

  performance: [                      // 性能指标（可选）
    { name: 'QPS', value: '1000+' },
    { name: 'Memory', value: '<100MB' }
  ]
}
```

## 🏗️ 类型定义

类型定义文件位于：`src/types/project.ts`

### 主要接口

```typescript
interface TechItem {
  name: string // 技术名称
  purpose: string // 用途说明
}

interface Project {
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
```

## 🚀 快速开始自定义

### 1. 修改个人信息

编辑 `src/config/profile.ts`，更新您的个人信息：

- 姓名、职位、邮箱
- 头像链接
- 社交链接
- 技能和经历

### 2. 添加项目

编辑 `src/data/projects.ts`，添加您的项目：

- 基本信息（标题、描述、链接）
- 技术栈详情
- 项目特性
- 性能指标

### 3. 自定义主题

编辑 `src/config/theme.ts`，调整：

- 主题色彩
- 动画效果
- 间距和阴影

### 4. 配置导航

编辑 `src/config/navigation.ts`，设置：

- Logo 和品牌信息
- 菜单项
- 样式和行为

## 💡 提示

1. **颜色一致性**：建议在整个网站中使用统一的颜色主题
2. **响应式设计**：所有配置都支持响应式，无需额外处理
3. **类型安全**：所有配置都有 TypeScript 类型检查
4. **动画性能**：可通过主题配置调整动画时长和缓动函数
5. **SEO 优化**：项目描述和标题会被搜索引擎索引

## 🔧 高级自定义

如需更深度的自定义，可以：

- 修改组件样式（`src/components/`）
- 调整页面布局（`src/views/`）
- 扩展工具函数（`src/utils/`）
- 添加新的配置选项

---

通过以上配置，您可以完全定制这个个人作品集网站，无需修改任何组件代码！
