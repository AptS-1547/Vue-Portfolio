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
 * 根据字符串生成颜色
 */
export function generateTagColor(tag: string): {
  backgroundColor: string
  textColor: string
  hoverBackgroundColor: string
  selectedBackgroundColor: string
  selectedTextColor: string
} {
  const hash = hashCode(tag)
  const { h, s, l } = hashToHSL(hash)

  // 背景色（带透明度）
  const backgroundColor = `hsla(${h}, ${s}%, ${l}%, 0.15)`

  // 悬停背景色（更深一些，透明度更高）
  const hoverBackgroundColor = `hsla(${h}, ${s + 10}%, ${l - 15}%, 0.8)`

  // 选中背景色（半透明，确保文字可读性）
  const selectedBackgroundColor = `hsla(${h}, ${s + 15}%, ${l - 10}%, 0.25)`

  // 文字颜色（更深，不透明）
  const textColor = `hsl(${h}, ${s + 20}%, ${Math.max(l - 40, 25)}%)`

  // 选中状态文字颜色（更深以确保对比度）
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
 * 预定义的一些常用标签颜色（可选）
 */
export const predefinedColors: Record<
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
 * 获取标签颜色（优先使用预定义，否则生成）
 */
export function getTagColor(tag: string) {
  return predefinedColors[tag] || generateTagColor(tag)
}
