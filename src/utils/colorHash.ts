/**
 * 计算字符串的哈希值
 */
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 转换为32位整数
  }
  return hash
}

/**
 * 将哈希值转换为HSL颜色
 */
function hashToHSL(hash: number): { h: number; s: number; l: number } {
  const h = Math.abs(hash) % 360
  const s = 45 + (Math.abs(hash) % 30) // 45-75% 饱和度
  const l = 55 + (Math.abs(hash) % 25) // 55-80% 亮度
  return { h, s, l }
}

/**
 * 根据字符串生成颜色（支持亮色和暗色模式）
 */
export function generateTagColor(
  tag: string,
  isDark: boolean = false,
): {
  backgroundColor: string
  textColor: string
  hoverBackgroundColor: string
  selectedBackgroundColor: string
  selectedTextColor: string
} {
  const hash = hashCode(tag)
  const { h, s, l } = hashToHSL(hash)

  if (isDark) {
    // 暗色模式：文字更亮，背景更暗但保持透明度
    const backgroundColor = `hsla(${h}, ${s}%, ${Math.max(l - 20, 35)}%, 0.2)`
    const hoverBackgroundColor = `hsla(${h}, ${s + 10}%, ${Math.max(l - 10, 45)}%, 0.9)`
    const selectedBackgroundColor = `hsla(${h}, ${s + 15}%, ${Math.max(l - 15, 40)}%, 0.35)`

    // 文字颜色要亮很多，确保在深色背景上可读
    const textColor = `hsl(${h}, ${Math.min(s + 10, 85)}%, ${Math.min(l + 20, 80)}%)`
    const selectedTextColor = `hsl(${h}, ${Math.min(s + 15, 90)}%, ${Math.min(l + 25, 85)}%)`

    return {
      backgroundColor,
      textColor,
      hoverBackgroundColor,
      selectedBackgroundColor,
      selectedTextColor,
    }
  }

  // 亮色模式：保持原有逻辑
  const backgroundColor = `hsla(${h}, ${s}%, ${l}%, 0.15)`
  const hoverBackgroundColor = `hsla(${h}, ${s + 10}%, ${l - 15}%, 0.8)`
  const selectedBackgroundColor = `hsla(${h}, ${s + 15}%, ${l - 10}%, 0.25)`
  const textColor = `hsl(${h}, ${s + 20}%, ${Math.max(l - 40, 25)}%)`
  const selectedTextColor = `hsl(${h}, ${s + 25}%, ${Math.max(l - 50, 20)}%)`

  return {
    backgroundColor,
    textColor,
    hoverBackgroundColor,
    selectedBackgroundColor,
    selectedTextColor,
  }
}

/**
 * 预定义的一些常用标签颜色（亮色模式）
 */
export const predefinedColorsLight: Record<
  string,
  {
    backgroundColor: string
    textColor: string
    hoverBackgroundColor: string
    selectedBackgroundColor: string
    selectedTextColor: string
  }
> = {
  'Vue.js': {
    backgroundColor: 'hsla(153, 47%, 49%, 0.15)',
    textColor: 'hsl(153, 47%, 29%)',
    hoverBackgroundColor: 'hsla(153, 47%, 49%, 0.8)',
    selectedBackgroundColor: 'hsla(153, 47%, 49%, 0.25)',
    selectedTextColor: 'hsl(153, 47%, 20%)',
  },
  React: {
    backgroundColor: 'hsla(193, 95%, 68%, 0.15)',
    textColor: 'hsl(193, 95%, 28%)',
    hoverBackgroundColor: 'hsla(193, 95%, 68%, 0.8)',
    selectedBackgroundColor: 'hsla(193, 95%, 68%, 0.25)',
    selectedTextColor: 'hsl(193, 95%, 20%)',
  },
  TypeScript: {
    backgroundColor: 'hsla(211, 60%, 44%, 0.15)',
    textColor: 'hsl(211, 60%, 24%)',
    hoverBackgroundColor: 'hsla(211, 60%, 44%, 0.8)',
    selectedBackgroundColor: 'hsla(211, 60%, 44%, 0.25)',
    selectedTextColor: 'hsl(211, 60%, 15%)',
  },
  Rust: {
    backgroundColor: 'hsla(27, 100%, 35%, 0.15)',
    textColor: 'hsl(27, 100%, 15%)',
    hoverBackgroundColor: 'hsla(27, 100%, 35%, 0.8)',
    selectedBackgroundColor: 'hsla(27, 100%, 35%, 0.25)',
    selectedTextColor: 'hsl(27, 100%, 10%)',
  },
  Python: {
    backgroundColor: 'hsla(56, 91%, 37%, 0.15)',
    textColor: 'hsl(56, 91%, 17%)',
    hoverBackgroundColor: 'hsla(56, 91%, 37%, 0.8)',
    selectedBackgroundColor: 'hsla(56, 91%, 37%, 0.25)',
    selectedTextColor: 'hsl(56, 91%, 12%)',
  },
  Docker: {
    backgroundColor: 'hsla(199, 89%, 48%, 0.15)',
    textColor: 'hsl(199, 89%, 28%)',
    hoverBackgroundColor: 'hsla(199, 89%, 48%, 0.8)',
    selectedBackgroundColor: 'hsla(199, 89%, 48%, 0.25)',
    selectedTextColor: 'hsl(199, 89%, 20%)',
  },
}

/**
 * 预定义的一些常用标签颜色（暗色模式）
 */
export const predefinedColorsDark: Record<
  string,
  {
    backgroundColor: string
    textColor: string
    hoverBackgroundColor: string
    selectedBackgroundColor: string
    selectedTextColor: string
  }
> = {
  'Vue.js': {
    backgroundColor: 'hsla(153, 47%, 35%, 0.2)',
    textColor: 'hsl(153, 57%, 75%)',
    hoverBackgroundColor: 'hsla(153, 47%, 49%, 0.9)',
    selectedBackgroundColor: 'hsla(153, 47%, 40%, 0.35)',
    selectedTextColor: 'hsl(153, 57%, 80%)',
  },
  React: {
    backgroundColor: 'hsla(193, 95%, 48%, 0.2)',
    textColor: 'hsl(193, 95%, 78%)',
    hoverBackgroundColor: 'hsla(193, 95%, 68%, 0.9)',
    selectedBackgroundColor: 'hsla(193, 95%, 53%, 0.35)',
    selectedTextColor: 'hsl(193, 95%, 83%)',
  },
  TypeScript: {
    backgroundColor: 'hsla(211, 60%, 30%, 0.2)',
    textColor: 'hsl(211, 70%, 70%)',
    hoverBackgroundColor: 'hsla(211, 60%, 44%, 0.9)',
    selectedBackgroundColor: 'hsla(211, 60%, 35%, 0.35)',
    selectedTextColor: 'hsl(211, 70%, 75%)',
  },
  Rust: {
    backgroundColor: 'hsla(27, 100%, 25%, 0.2)',
    textColor: 'hsl(27, 100%, 70%)',
    hoverBackgroundColor: 'hsla(27, 100%, 35%, 0.9)',
    selectedBackgroundColor: 'hsla(27, 100%, 30%, 0.35)',
    selectedTextColor: 'hsl(27, 100%, 75%)',
  },
  Python: {
    backgroundColor: 'hsla(56, 91%, 27%, 0.2)',
    textColor: 'hsl(56, 91%, 72%)',
    hoverBackgroundColor: 'hsla(56, 91%, 37%, 0.9)',
    selectedBackgroundColor: 'hsla(56, 91%, 32%, 0.35)',
    selectedTextColor: 'hsl(56, 91%, 77%)',
  },
  Docker: {
    backgroundColor: 'hsla(199, 89%, 35%, 0.2)',
    textColor: 'hsl(199, 89%, 75%)',
    hoverBackgroundColor: 'hsla(199, 89%, 48%, 0.9)',
    selectedBackgroundColor: 'hsla(199, 89%, 40%, 0.35)',
    selectedTextColor: 'hsl(199, 89%, 80%)',
  },
}

// 兼容性：保留旧的导出名
export const predefinedColors = predefinedColorsLight

/**
 * 获取标签颜色（优先使用预定义，否则生成）
 */
export function getTagColor(tag: string, isDark: boolean = false) {
  const predefined = isDark ? predefinedColorsDark : predefinedColorsLight
  return predefined[tag] || generateTagColor(tag, isDark)
}
