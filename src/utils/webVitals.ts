/**
 * Web Vitals 性能监控工具
 * 收集并报告关键性能指标
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

// 性能指标类型
export interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

// 性能指标阈值配置
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
}

/**
 * 计算性能指标的评级
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * 处理性能指标
 */
function handleMetric(metric: Metric, callback?: (metric: WebVitalsMetric) => void) {
  const vitalsMetric: WebVitalsMetric = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType || 'unknown',
  }

  // 控制台输出（仅开发环境）
  if (import.meta.env.DEV) {
    const emoji =
      vitalsMetric.rating === 'good'
        ? '✅'
        : vitalsMetric.rating === 'needs-improvement'
          ? '⚠️'
          : '❌'
    console.log(
      `${emoji} [Web Vitals] ${vitalsMetric.name}:`,
      `${vitalsMetric.value.toFixed(2)}ms`,
      `(${vitalsMetric.rating})`,
    )
  }

  // 执行自定义回调
  if (callback) {
    callback(vitalsMetric)
  }

  // 发送到分析服务（如果配置）
  sendToAnalytics(vitalsMetric)
}

/**
 * 发送指标到分析服务
 * 这里可以集成 Google Analytics, Amplitude 等
 */
function sendToAnalytics(metric: WebVitalsMetric) {
  // 示例：发送到 Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // 示例：使用 Navigator.sendBeacon 发送到自定义端点
  // if (navigator.sendBeacon) {
  //   const body = JSON.stringify(metric)
  //   navigator.sendBeacon('/api/analytics/web-vitals', body)
  // }
}

/**
 * 初始化 Web Vitals 监控
 * @param callback 可选的回调函数，用于处理每个指标
 */
export function initWebVitals(callback?: (metric: WebVitalsMetric) => void) {
  // 累积布局偏移 (Cumulative Layout Shift)
  // 衡量视觉稳定性
  onCLS((metric) => handleMetric(metric, callback))

  // 首次内容绘制 (First Contentful Paint)
  // 衡量加载性能
  onFCP((metric) => handleMetric(metric, callback))

  // 交互到下一次绘制 (Interaction to Next Paint)
  // 衡量响应性能
  onINP((metric) => handleMetric(metric, callback))

  // 最大内容绘制 (Largest Contentful Paint)
  // 衡量加载性能
  onLCP((metric) => handleMetric(metric, callback))

  // 首字节时间 (Time to First Byte)
  // 衡量服务器响应时间
  onTTFB((metric) => handleMetric(metric, callback))
}

/**
 * 获取性能摘要
 */
export function getPerformanceSummary() {
  if (typeof window === 'undefined' || !window.performance) {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')

  return {
    // 导航时间
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domParse: navigation.domInteractive - navigation.responseEnd,
    domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,

    // 绘制时间
    fcp: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,
    lcp: 0, // 需要从 LCP observer 获取

    // 总时间
    total: navigation.loadEventEnd - navigation.fetchStart,
  }
}

/**
 * 性能标记工具
 */
export function mark(name: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(name)
  }
}

/**
 * 性能测量工具
 */
export function measure(name: string, startMark: string, endMark?: string) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name, 'measure')[0]
      if (import.meta.env.DEV && measure) {
        console.log(`⏱️ [Performance] ${name}: ${measure.duration.toFixed(2)}ms`)
      }
      return measure
    } catch (error) {
      console.warn(`Failed to measure ${name}:`, error)
    }
  }
}

/**
 * 清除性能标记
 */
export function clearMarks(name?: string) {
  if (typeof window !== 'undefined' && window.performance) {
    if (name) {
      performance.clearMarks(name)
    } else {
      performance.clearMarks()
    }
  }
}

/**
 * 清除性能测量
 */
export function clearMeasures(name?: string) {
  if (typeof window !== 'undefined' && window.performance) {
    if (name) {
      performance.clearMeasures(name)
    } else {
      performance.clearMeasures()
    }
  }
}
