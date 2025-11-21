import { onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollAnimationOptions {
  /**
   * 触发动画的可见度阈值（0-1）
   * @default 0.1
   */
  threshold?: number
  /**
   * 根元素的外边距，用于提前或延迟触发
   * @default '0px'
   */
  rootMargin?: string
  /**
   * 是否只触发一次
   * @default true
   */
  once?: boolean
  /**
   * 进入视口时添加的 CSS 类名
   * @default 'is-visible'
   */
  visibleClass?: string
  /**
   * 是否启用动画（可用于调试或无障碍支持）
   * @default true
   */
  enabled?: boolean
  /**
   * 延迟触发动画的时间（毫秒）
   * @default 0
   */
  delay?: number
}

/**
 * 滚动触发动画 Composable
 * 使用 Intersection Observer 监听元素进入视口并触发动画
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useScrollAnimation } from '@/composables/useScrollAnimation'
 *
 * const cardRef = ref<HTMLElement>()
 * useScrollAnimation(cardRef, { threshold: 0.2, once: true })
 * </script>
 *
 * <template>
 *   <div ref="cardRef" class="opacity-0 translate-y-4 transition-all duration-500 data-[visible]:opacity-100 data-[visible]:translate-y-0">
 *     Content
 *   </div>
 * </template>
 * ```
 */
export function useScrollAnimation(
  targetRef: Ref<HTMLElement | null | undefined>,
  options: ScrollAnimationOptions = {},
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    visibleClass = 'is-visible',
    enabled = true,
    delay = 0,
  } = options

  let observer: IntersectionObserver | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement

        // 如果设置了延迟，使用 setTimeout
        if (delay > 0) {
          timeoutId = setTimeout(() => {
            target.classList.add(visibleClass)
            target.setAttribute('data-visible', 'true')
          }, delay)
        } else {
          target.classList.add(visibleClass)
          target.setAttribute('data-visible', 'true')
        }

        // 如果只触发一次，停止观察
        if (once && observer) {
          observer.unobserve(target)
        }
      } else {
        // 如果不是只触发一次，离开视口时移除类名
        if (!once) {
          const target = entry.target as HTMLElement
          target.classList.remove(visibleClass)
          target.removeAttribute('data-visible')
          // 清除可能存在的延迟定时器
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
        }
      }
    })
  }

  onMounted(() => {
    // 如果禁用或无障碍偏好设置为减少运动，直接显示元素
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (targetRef.value) {
        targetRef.value.classList.add(visibleClass)
        targetRef.value.setAttribute('data-visible', 'true')
      }
      return
    }

    if (!targetRef.value) return

    observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  })

  return {
    // 可以返回一些辅助方法
    forceShow: () => {
      if (targetRef.value) {
        targetRef.value.classList.add(visibleClass)
        targetRef.value.setAttribute('data-visible', 'true')
      }
    },
    forceHide: () => {
      if (targetRef.value) {
        targetRef.value.classList.remove(visibleClass)
        targetRef.value.removeAttribute('data-visible')
      }
    },
  }
}

/**
 * 为多个元素应用滚动动画（带 stagger 延迟效果）
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useScrollAnimationStagger } from '@/composables/useScrollAnimation'
 *
 * const itemsRef = ref<HTMLElement[]>([])
 * useScrollAnimationStagger(itemsRef, { staggerDelay: 50 })
 * </script>
 *
 * <template>
 *   <div v-for="(item, i) in items" :key="i" :ref="el => itemsRef[i] = el">
 *     {{ item }}
 *   </div>
 * </template>
 * ```
 */
export function useScrollAnimationStagger(
  targetsRef: Ref<HTMLElement[]>,
  options: ScrollAnimationOptions & { staggerDelay?: number } = {},
) {
  const { staggerDelay = 50, ...baseOptions } = options

  onMounted(() => {
    if (!targetsRef.value || targetsRef.value.length === 0) return

    targetsRef.value.forEach((el, index) => {
      if (!el) return

      const elementRef = { value: el } as Ref<HTMLElement>
      useScrollAnimation(elementRef, {
        ...baseOptions,
        delay: (baseOptions.delay || 0) + index * staggerDelay,
      })
    })
  })
}
