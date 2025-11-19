/**
 * 统一的悬停效果处理 Composable
 * 用于替代各个组件中重复的悬停逻辑
 */

interface HoverColors {
  backgroundColor?: string
  textColor?: string
}

interface CompoundHoverOptions {
  changeBorder?: boolean
  changeChildColor?: boolean
}

export function useHoverEffect() {
  /**
   * 处理基本的背景色和文字颜色悬停效果
   * @param element - 目标元素
   * @param colors - 悬停时的颜色配置
   * @param isEnter - true 表示鼠标进入，false 表示离开
   */
  const handleColorHover = (
    element: HTMLElement,
    colors: HoverColors,
    isEnter: boolean
  ): void => {
    if (isEnter) {
      if (colors.backgroundColor) {
        element.style.backgroundColor = colors.backgroundColor
      }
      if (colors.textColor) {
        element.style.color = colors.textColor
      }
    } else {
      if (colors.backgroundColor !== undefined) {
        element.style.backgroundColor = ''
      }
      if (colors.textColor !== undefined) {
        element.style.color = ''
      }
    }
  }

  /**
   * 处理边框颜色悬停效果
   * @param element - 目标元素
   * @param borderColor - 悬停时的边框颜色
   * @param isEnter - true 表示鼠标进入，false 表示离开
   */
  const handleBorderHover = (
    element: HTMLElement,
    borderColor: string,
    isEnter: boolean
  ): void => {
    element.style.borderColor = isEnter ? borderColor : ''
  }

  /**
   * 处理复合悬停效果（边框 + 子元素颜色）
   * 常用于卡片悬停时同时改变边框和标题颜色
   * @param element - 目标元素
   * @param childSelector - 子元素选择器（如 'h3'）
   * @param color - 悬停时的颜色
   * @param isEnter - true 表示鼠标进入，false 表示离开
   * @param options - 可选配置
   */
  const handleCompoundHover = (
    element: HTMLElement,
    childSelector: string,
    color: string,
    isEnter: boolean,
    options: CompoundHoverOptions = {}
  ): void => {
    const { changeBorder = true, changeChildColor = true } = options

    if (changeBorder) {
      element.style.borderColor = isEnter ? color : ''
    }

    if (changeChildColor) {
      const child = element.querySelector(childSelector) as HTMLElement
      if (child) {
        child.style.color = isEnter ? color : ''
      }
    }
  }

  /**
   * 创建一个简化的事件处理器
   * @param handler - 悬停处理函数
   * @param args - 传递给处理函数的额外参数
   */
  const createHoverHandler = <T extends any[]>(
    handler: (element: HTMLElement, ...args: T) => void,
    ...args: T
  ) => {
    return {
      onMouseenter: (event: Event) => {
        const element = event.currentTarget as HTMLElement
        handler(element, ...args, true)
      },
      onMouseleave: (event: Event) => {
        const element = event.currentTarget as HTMLElement
        handler(element, ...args, false)
      }
    }
  }

  return {
    handleColorHover,
    handleBorderHover,
    handleCompoundHover,
    createHoverHandler
  }
}
