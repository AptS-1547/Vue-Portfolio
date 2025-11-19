/**
 * 主题配置文件
 * 统一管理应用的颜色、动画、间距等主题相关配置
 */

// 主色调配置
export const colors = {
  // 主品牌色
  primary: {
    main: '#ed9a28',
    light: '#f5b959',
    dark: '#d17d0a',
    rgb: '237, 154, 40',
  },

  // 次要色彩
  secondary: {
    main: '#6dd0e0',
    light: '#8ee5f3',
    dark: '#4abac9',
    rgb: '109, 208, 224',
  },

  // 状态色彩
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // 项目状态色彩
  projectStatus: {
    active: '#10b981', // 绿色 - bg-green-400
    'in-development': '#f59e0b', // 黄色 - bg-yellow-400
    archived: '#6b7280', // 灰色 - bg-gray-400
  },

  // 灰度色彩
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // 渐变色配置
  gradients: {
    primary: `linear-gradient(135deg, #ed9a28, #6dd0e0)`,
    primaryReverse: `linear-gradient(135deg, #6dd0e0, #ed9a28)`,
    warm: `linear-gradient(135deg, #f59e0b, #ed9a28)`,
    cool: `linear-gradient(135deg, #3b82f6, #6dd0e0)`,
    soft: `linear-gradient(135deg, rgba(237, 154, 40, 0.1), rgba(109, 208, 224, 0.1))`,
  },
}

// 动画配置
export const animations = {
  // 过渡时间
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // 缓动函数
  easing: {
    linear: 'linear',
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    easeInOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // 变换配置
  transform: {
    scale: {
      hover: '1.05',
      active: '0.95',
    },
    translate: {
      hover: '-2px',
      small: '2px',
    },
  },

  // 动画延迟配置（用于错开动画）
  delay: {
    none: '0s',
    short: '0.05s',
    normal: '0.1s',
    long: '0.2s',
    section1: '0.1s',
    section2: '0.2s',
    section3: '0.3s',
    section4: '0.4s',
  },

  // 页面元素动画配置
  pageAnimations: {
    // 区块滑入动画
    sectionSlide: {
      duration: '300ms',
      easing: 'ease-out',
    },
    // 卡片入场动画
    cardEntrance: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    // 标签弹出动画
    tagPop: {
      duration: '200ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    // 文本淡入动画
    textFade: {
      duration: '300ms',
      easing: 'ease-out',
    },
    // 按钮跳动动画
    buttonBounce: {
      duration: '200ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
}

// 间距配置
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
}

// 阴影配置
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  hover: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
}

// 边框圆角配置
export const borderRadius = {
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
}

// 字体配置
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

// 响应式断点
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// 组件特定配置
export const components = {
  // 导航栏配置
  navigation: {
    height: '4rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropBlur: '12px',
    borderColor: colors.gray[200],
  },

  // 按钮配置
  button: {
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
    },
    borderRadius: borderRadius.lg,
  },

  // 卡片配置
  card: {
    background: '#ffffff',
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadow: shadows.md,
    hoverShadow: shadows.lg,
  },

  // 标签配置
  tag: {
    padding: '0.25rem 0.75rem',
    borderRadius: borderRadius.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
}

// CSS 变量生成器
export const generateCSSVariables = () => {
  return {
    // 颜色变量
    '--color-primary': colors.primary.main,
    '--color-primary-light': colors.primary.light,
    '--color-primary-dark': colors.primary.dark,
    '--color-secondary': colors.secondary.main,
    '--color-secondary-light': colors.secondary.light,
    '--color-secondary-dark': colors.secondary.dark,

    // 渐变变量
    '--gradient-primary': colors.gradients.primary,
    '--gradient-primary-reverse': colors.gradients.primaryReverse,

    // 动画时长变量
    '--animation-duration-fast': animations.duration.fast,
    '--animation-duration-normal': animations.duration.normal,
    '--animation-duration-slow': animations.duration.slow,

    // 动画缓动变量
    '--animation-easing-linear': animations.easing.linear,
    '--animation-easing-ease-out': animations.easing.easeOut,
    '--animation-easing-ease-in-out': animations.easing.easeInOut,
    '--animation-easing-bounce': animations.easing.bounce,

    // 动画延迟变量
    '--animation-delay-short': animations.delay.short,
    '--animation-delay-normal': animations.delay.normal,
    '--animation-delay-long': animations.delay.long,
    '--animation-delay-section-1': animations.delay.section1,
    '--animation-delay-section-2': animations.delay.section2,
    '--animation-delay-section-3': animations.delay.section3,
    '--animation-delay-section-4': animations.delay.section4,

    // 页面动画配置变量
    '--animation-section-slide-duration': animations.pageAnimations.sectionSlide.duration,
    '--animation-section-slide-easing': animations.pageAnimations.sectionSlide.easing,
    '--animation-card-entrance-duration': animations.pageAnimations.cardEntrance.duration,
    '--animation-card-entrance-easing': animations.pageAnimations.cardEntrance.easing,
    '--animation-tag-pop-duration': animations.pageAnimations.tagPop.duration,
    '--animation-tag-pop-easing': animations.pageAnimations.tagPop.easing,

    // 变换变量
    '--transform-scale-hover': animations.transform.scale.hover,
    '--transform-translate-hover': animations.transform.translate.hover,

    // 阴影变量
    '--shadow-card': components.card.shadow,
    '--shadow-card-hover': components.card.hoverShadow,

    // 其他变量
    '--border-radius-default': borderRadius.lg,
    '--spacing-default': spacing.md,
  }
}

// 主题工具函数
export const themeUtils = {
  // 获取颜色的 RGB 值
  getRgbColor: (colorPath: string) => {
    // 例如: getRgbColor('primary.rgb') => '237, 154, 40'
    const keys = colorPath.split('.')
    let value: unknown = colors
    for (const key of keys) {
      value = (value as Record<string, unknown>)[key]
    }
    return value as string
  },

  // 获取 RGBA 颜色
  getRgbaColor: (colorPath: string, alpha: number = 1) => {
    const rgb = themeUtils.getRgbColor(colorPath)
    return `rgba(${rgb}, ${alpha})`
  },

  // 获取渐变色
  getGradient: (gradientName: keyof typeof colors.gradients) => {
    return colors.gradients[gradientName]
  },

  // 获取状态颜色
  getStatusColor: (status: keyof typeof colors.projectStatus) => {
    return colors.projectStatus[status] || colors.projectStatus.archived
  },

  // 获取状态 CSS 类
  getStatusClass: (status: keyof typeof colors.projectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-400'
      case 'in-development':
        return 'bg-yellow-400'
      case 'archived':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  },
}

// 导出默认主题
export const defaultTheme = {
  colors,
  animations,
  spacing,
  shadows,
  borderRadius,
  typography,
  breakpoints,
  components,
  utils: themeUtils,
}
