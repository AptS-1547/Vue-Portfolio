/**
 * 主题配置文件
 * 统一管理应用的颜色、动画、间距等主题相关配置
 */

// 亮色模式配色
export const lightColors = {
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
    active: '#10b981',
    'in-development': '#f59e0b',
    archived: '#6b7280',
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
    950: '#030712',
  },

  // 背景色
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },

  // 文本色
  text: {
    primary: '#111827',
    secondary: '#4b5563',
    tertiary: '#6b7280',
    inverse: '#ffffff',
  },

  // 边框色
  border: {
    light: '#f3f4f6',
    main: '#e5e7eb',
    dark: '#d1d5db',
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

// 暗色模式配色
export const darkColors = {
  // 主品牌色（暗色模式下稍微提亮）
  primary: {
    main: '#f5b959',
    light: '#ffd699',
    dark: '#ed9a28',
    rgb: '245, 185, 89',
  },

  // 次要色彩（暗色模式下稍微提亮）
  secondary: {
    main: '#8ee5f3',
    light: '#b3f0f7',
    dark: '#6dd0e0',
    rgb: '142, 229, 243',
  },

  // 状态色彩（暗色模式下调整为更柔和的版本）
  status: {
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },

  // 项目状态色彩
  projectStatus: {
    active: '#34d399',
    'in-development': '#fbbf24',
    archived: '#9ca3af',
  },

  // 灰度色彩（暗色模式下反转）
  gray: {
    50: '#030712',
    100: '#111827',
    200: '#1f2937',
    300: '#374151',
    400: '#4b5563',
    500: '#6b7280',
    600: '#9ca3af',
    700: '#d1d5db',
    800: '#e5e7eb',
    900: '#f3f4f6',
    950: '#f9fafb',
  },

  // 背景色
  background: {
    primary: '#030712',
    secondary: '#111827',
    tertiary: '#1f2937',
  },

  // 文本色
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
    inverse: '#111827',
  },

  // 边框色
  border: {
    light: '#1f2937',
    main: '#374151',
    dark: '#4b5563',
  },

  // 渐变色配置
  gradients: {
    primary: `linear-gradient(135deg, #f5b959, #8ee5f3)`,
    primaryReverse: `linear-gradient(135deg, #8ee5f3, #f5b959)`,
    warm: `linear-gradient(135deg, #fbbf24, #f5b959)`,
    cool: `linear-gradient(135deg, #60a5fa, #8ee5f3)`,
    soft: `linear-gradient(135deg, rgba(245, 185, 89, 0.1), rgba(142, 229, 243, 0.1))`,
  },
}

// 兼容性：保留 colors 导出（默认为亮色模式）
export const colors = lightColors

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
    backdropBlur: '12px',
    light: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderColor: lightColors.gray[200],
    },
    dark: {
      background: 'rgba(3, 7, 18, 0.95)',
      borderColor: darkColors.gray[300],
    },
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
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadow: shadows.md,
    hoverShadow: shadows.lg,
    light: {
      background: '#ffffff',
      borderColor: lightColors.gray[200],
    },
    dark: {
      background: darkColors.gray[100],
      borderColor: darkColors.gray[300],
    },
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
export const generateCSSVariables = (theme: 'light' | 'dark' = 'light') => {
  const themeColors = theme === 'dark' ? darkColors : lightColors

  return {
    // 颜色变量
    '--color-primary': themeColors.primary.main,
    '--color-primary-light': themeColors.primary.light,
    '--color-primary-dark': themeColors.primary.dark,
    '--color-primary-rgb': themeColors.primary.rgb,
    '--color-secondary': themeColors.secondary.main,
    '--color-secondary-light': themeColors.secondary.light,
    '--color-secondary-dark': themeColors.secondary.dark,
    '--color-secondary-rgb': themeColors.secondary.rgb,

    // 背景色变量
    '--color-background-primary': themeColors.background.primary,
    '--color-background-secondary': themeColors.background.secondary,
    '--color-background-tertiary': themeColors.background.tertiary,

    // 文本色变量
    '--color-text-primary': themeColors.text.primary,
    '--color-text-secondary': themeColors.text.secondary,
    '--color-text-tertiary': themeColors.text.tertiary,
    '--color-text-inverse': themeColors.text.inverse,

    // 边框色变量
    '--color-border-light': themeColors.border.light,
    '--color-border-main': themeColors.border.main,
    '--color-border-dark': themeColors.border.dark,

    // 渐变变量
    '--gradient-primary': themeColors.gradients.primary,
    '--gradient-primary-reverse': themeColors.gradients.primaryReverse,

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
