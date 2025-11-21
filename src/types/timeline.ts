/**
 * 时间线模块类型定义
 */

/**
 * 时间线条目类型
 */
export type TimelineType = 'github' | 'learning' | 'life'

/**
 * GitHub 活动事件类型
 */
export type GitHubEventType = 'push' | 'pull_request' | 'issue' | 'release' | 'star' | 'fork'

/**
 * 时间线条目基础接口
 */
export interface TimelineItem {
  /** 唯一标识符 */
  id: string
  /** 条目类型 */
  type: TimelineType
  /** 日期 (ISO 8601 格式) */
  date: string
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 相关链接 */
  link?: string
  /** 标签 */
  tags?: string[]
  /** 图标 (可选) */
  icon?: string
}

/**
 * GitHub 活动条目
 */
export interface GitHubActivity extends TimelineItem {
  type: 'github'
  /** 事件类型 */
  eventType: GitHubEventType
  /** 仓库名称 */
  repo: string
  /** 提交数量 (对于 push 事件) */
  commitCount?: number
  /** 分支名称 */
  branch?: string
}

/**
 * 学习记录条目
 */
export interface LearningRecord extends TimelineItem {
  type: 'learning'
  /** 学习主题 */
  topic: string
  /** 来源 (书籍、课程、文档等) */
  source?: string
  /** 进度百分比 */
  progress?: number
}

/**
 * 生活动态条目
 */
export interface LifeUpdate extends TimelineItem {
  type: 'life'
  /** 心情 */
  mood?: string
  /** 图片 */
  images?: string[]
}

/**
 * 时间线条目联合类型
 */
export type TimelineEntry = GitHubActivity | LearningRecord | LifeUpdate

/**
 * GitHub API 返回的事件数据
 */
export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
    url: string
  }
  payload: {
    ref?: string
    size?: number
    commits?: Array<{ message: string; sha: string }>
    action?: string
    pull_request?: {
      title: string
      html_url: string
    }
    issue?: {
      title: string
      html_url: string
    }
  }
  created_at: string
}
