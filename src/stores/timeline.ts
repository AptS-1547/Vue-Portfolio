/**
 * Timeline Store - 管理时间线数据，防止重复请求
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TimelineEntry, GitHubActivity } from '@/types/timeline'
import { fetchGitHubActivity } from '@/utils/githubApi'

export const useTimelineStore = defineStore('timeline', () => {
  // 状态
  const githubActivities = ref<GitHubActivity[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const lastFetchTime = ref<number>(0)

  // 缓存时间：10 分钟（与 githubApi.ts 保持一致）
  const CACHE_DURATION = 10 * 60 * 1000

  // 计算属性：检查缓存是否有效
  const isCacheValid = computed(() => {
    if (githubActivities.value.length === 0) return false
    return Date.now() - lastFetchTime.value < CACHE_DURATION
  })

  /**
   * 获取 GitHub 活动数据
   * 如果缓存有效，直接返回缓存数据，否则发起请求
   */
  async function fetchActivities(username: string, limit: number = 10, forceRefresh = false) {
    // 如果缓存有效且不是强制刷新，直接返回
    if (isCacheValid.value && !forceRefresh) {
      console.debug('[TimelineStore] 使用缓存的时间线数据')
      return githubActivities.value
    }

    // 如果正在加载中，等待当前请求完成
    if (isLoading.value) {
      console.debug('[TimelineStore] 请求进行中，等待完成')
      // 等待加载完成
      return new Promise<GitHubActivity[]>((resolve) => {
        const checkInterval = setInterval(() => {
          if (!isLoading.value) {
            clearInterval(checkInterval)
            resolve(githubActivities.value)
          }
        }, 100)
      })
    }

    isLoading.value = true
    error.value = null

    try {
      console.debug('[TimelineStore] 发起新的 GitHub API 请求')
      const activities = await fetchGitHubActivity(username, limit)

      githubActivities.value = activities
      lastFetchTime.value = Date.now()

      return activities
    } catch (err) {
      error.value = err as Error
      console.error('[TimelineStore] 获取时间线数据失败:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 清除缓存数据
   */
  function clearCache() {
    githubActivities.value = []
    lastFetchTime.value = 0
    error.value = null
  }

  /**
   * 手动设置 GitHub 活动数据（用于测试或其他场景）
   */
  function setActivities(activities: GitHubActivity[]) {
    githubActivities.value = activities
    lastFetchTime.value = Date.now()
  }

  return {
    // 状态
    githubActivities,
    isLoading,
    error,
    lastFetchTime,

    // 计算属性
    isCacheValid,

    // 方法
    fetchActivities,
    clearCache,
    setActivities,
  }
})
