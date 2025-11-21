/**
 * GitHub API 工具函数
 */

import type { GitHubEvent, GitHubActivity, GitHubEventType, TimelineEntry } from '@/types/timeline'
import { deduplicatedFetch } from './requestDeduplicator'

/**
 * GitHub API 基础配置
 */
const GITHUB_API_BASE = 'https://api.github.com'
const CACHE_KEY = 'github_events_cache'
const ETAG_KEY = 'github_events_etag'
const CACHE_DURATION = 10 * 60 * 1000 // 10分钟缓存（优化：从5分钟提升到10分钟）

interface CacheData {
  timestamp: number
  data: GitHubActivity[]
  etag?: string
}

/**
 * 指数退避重试机制
 * @param fn 要执行的函数
 * @param maxRetries 最大重试次数
 * @param delay 初始延迟时间（毫秒）
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        const waitTime = delay * Math.pow(2, i) // 指数退避: 1s, 2s, 4s
        console.debug(`[GitHub API] 重试 ${i + 1}/${maxRetries}，等待 ${waitTime}ms`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
      }
    }
  }

  throw lastError
}

/**
 * 获取用户 GitHub 活动
 * @param username GitHub 用户名
 * @param limit 获取数量限制
 * @returns Promise<GitHubActivity[]>
 */
export async function fetchGitHubActivity(
  username: string,
  limit: number = 10,
): Promise<GitHubActivity[]> {
  // 检查缓存
  const cached = getCachedData()
  if (cached) {
    return cached.slice(0, limit)
  }

  try {
    // 使用重试机制和请求去重
    const activities = await retryWithBackoff(async () => {
      // 获取存储的 ETag
      const etag = getETag()
      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      }

      // 如果有 ETag，使用条件请求
      if (etag) {
        headers['If-None-Match'] = etag
      }

      // 使用去重的 fetch
      const response = await deduplicatedFetch(
        `${GITHUB_API_BASE}/users/${username}/events/public`,
        { headers },
      )

      // 304 Not Modified - 使用缓存数据
      if (response.status === 304) {
        console.debug('[GitHub API] 使用 ETag 缓存（304）')
        const cachedData = getCachedData(true)
        if (cachedData) {
          return cachedData.slice(0, limit)
        }
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      // 保存新的 ETag
      const newETag = response.headers.get('etag')
      if (newETag) {
        setETag(newETag)
      }

      const events: GitHubEvent[] = await response.json()
      const activities = events
        .map((event) => convertGitHubEventToActivity(event))
        .filter((activity): activity is GitHubActivity => activity !== null)
        .slice(0, limit)

      // 缓存数据
      setCachedData(activities, newETag || undefined)

      return activities
    })

    return activities
  } catch (error) {
    console.error('Failed to fetch GitHub activity:', error)
    // 发生错误时返回缓存数据（如果有）
    const cached = getCachedData(true)
    return cached ? cached.slice(0, limit) : []
  }
}

/**
 * 将 GitHub 事件转换为时间线活动
 * @param event GitHub 事件对象
 * @returns GitHubActivity | null
 */
function convertGitHubEventToActivity(event: GitHubEvent): GitHubActivity | null {
  const eventTypeMap: Record<string, GitHubEventType> = {
    PushEvent: 'push',
    PullRequestEvent: 'pull_request',
    IssuesEvent: 'issue',
    ReleaseEvent: 'release',
    WatchEvent: 'star',
    ForkEvent: 'fork',
  }

  const eventType = eventTypeMap[event.type]
  if (!eventType) {
    return null
  }

  // 过滤掉空提交事件
  if (event.type === 'PushEvent') {
    const size = event.payload.size || 0
    const hasCommits = event.payload.commits && event.payload.commits.length > 0
    if (size === 0 || !hasCommits) {
      return null
    }
  }

  const repoOwner = event.repo.name.split('/')[0] || 'unknown'
  const description = generateDescription(event)

  const activity: GitHubActivity = {
    id: event.id,
    type: 'github',
    eventType,
    date: event.created_at,
    repo: event.repo.name,
    title: generateTitle(event),
    link: `https://github.com/${event.repo.name}`,
    tags: [repoOwner],
  }

  // 添加可选的 description
  if (description) {
    activity.description = description
  }

  // 添加特定事件的额外信息
  if (eventType === 'push' && event.payload.commits) {
    activity.commitCount = event.payload.size || event.payload.commits.length
    activity.branch = event.payload.ref?.replace('refs/heads/', '')
  }

  return activity
}

/**
 * 生成活动标题
 */
function generateTitle(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent': {
      const branch = event.payload.ref?.replace('refs/heads/', '') || 'master'
      const count = event.payload.size || 0
      if (count === 1) {
        return `推送到 ${branch}`
      }
      return `推送了 ${count} 个提交到 ${branch}`
    }
    case 'PullRequestEvent':
      return event.payload.pull_request?.title || 'Pull Request'
    case 'IssuesEvent':
      return event.payload.issue?.title || 'Issue'
    case 'ReleaseEvent':
      return '发布了新版本'
    case 'WatchEvent':
      return 'Star 了仓库'
    case 'ForkEvent':
      return 'Fork 了仓库'
    default:
      return event.type
  }
}

/**
 * 生成活动描述
 */
function generateDescription(event: GitHubEvent): string | undefined {
  switch (event.type) {
    case 'PushEvent':
      if (event.payload.commits && event.payload.commits.length > 0) {
        const firstCommit = event.payload.commits[0]
        return firstCommit?.message
      }
      return undefined
    case 'PullRequestEvent': {
      const action = event.payload.action
      const actionMap: Record<string, string> = {
        opened: '创建了',
        closed: '关闭了',
        reopened: '重新打开了',
        merged: '合并了',
        assigned: '分配了',
        labeled: '添加标签',
      }
      return actionMap[action || ''] || action
    }
    case 'IssuesEvent': {
      const action = event.payload.action
      const actionMap: Record<string, string> = {
        opened: '创建了',
        closed: '关闭了',
        reopened: '重新打开了',
        assigned: '分配了',
        labeled: '添加标签',
      }
      return actionMap[action || ''] || action
    }
    default:
      return undefined
  }
}

/**
 * 获取缓存数据
 */
function getCachedData(ignoreExpiry = false): GitHubActivity[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const cacheData: CacheData = JSON.parse(cached)
    const now = Date.now()

    if (!ignoreExpiry && now - cacheData.timestamp > CACHE_DURATION) {
      return null
    }

    return cacheData.data
  } catch {
    return null
  }
}

/**
 * 设置缓存数据
 */
function setCachedData(data: GitHubActivity[], etag?: string): void {
  try {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data,
      etag,
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Failed to cache GitHub data:', error)
  }
}

/**
 * 获取 ETag
 */
function getETag(): string | null {
  try {
    return localStorage.getItem(ETAG_KEY)
  } catch {
    return null
  }
}

/**
 * 设置 ETag
 */
function setETag(etag: string): void {
  try {
    localStorage.setItem(ETAG_KEY, etag)
  } catch (error) {
    console.error('Failed to save ETag:', error)
  }
}

/**
 * 清除缓存
 */
export function clearGitHubCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(ETAG_KEY)
  } catch (error) {
    console.error('Failed to clear GitHub cache:', error)
  }
}

/**
 * 合并并排序所有时间线条目
 * @param entries 时间线条目数组
 * @returns 排序后的时间线条目
 */
export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // 降序排列（最新的在前）
  })
}
