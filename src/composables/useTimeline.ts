import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TimelineEntry, LearningRecord, LifeUpdate, GitHubActivity } from '@/types/timeline'
import { sortTimelineEntries } from '@/utils/githubApi'
import { useTimelineStore } from '@/stores/timeline'

/**
 * 时间线数据组合式函数
 * 优化：使用全局 store 管理 GitHub 活动数据，避免重复请求
 */
export function useTimeline() {
  const { t, tm } = useI18n()
  const timelineStore = useTimelineStore()

  // 使用 store 的状态（GitHub 活动数据已在 store 中管理）
  const loading = computed(() => timelineStore.isLoading)
  const error = computed(() => timelineStore.error)
  const githubActivities = computed(() => timelineStore.githubActivities)

  // 学习记录（从 i18n 获取）
  const learningRecords = computed<LearningRecord[]>(() => {
    const learning = tm('timeline.learning') as any
    const records: LearningRecord[] = []

    if (!learning || !learning.records) {
      return records
    }

    const count = Number(learning.count) || 0

    for (let i = 0; i < count; i++) {
      try {
        const recordData = learning.records[i]
        if (!recordData) continue

        const record: LearningRecord = {
          id: `learning-${i}`,
          type: 'learning' as const,
          date: recordData.date,
          title: recordData.title,
          description: recordData.description,
          topic: recordData.topic,
          source: recordData.source,
          tags: Array.isArray(recordData.tags) ? recordData.tags : [],
          icon: '📚',
        }
        records.push(record)
      } catch (err) {
        console.error(`[Timeline] Error loading learning record ${i}:`, err)
      }
    }

    return records
  })

  // 生活动态（从 i18n 获取）
  const lifeUpdates = computed<LifeUpdate[]>(() => {
    const life = tm('timeline.life') as any
    const updates: LifeUpdate[] = []

    if (!life || !life.updates) {
      return updates
    }

    const count = Number(life.count) || 0

    for (let i = 0; i < count; i++) {
      try {
        const updateData = life.updates[i]
        if (!updateData) continue

        const update: LifeUpdate = {
          id: `life-${i}`,
          type: 'life' as const,
          date: updateData.date,
          title: updateData.title,
          description: updateData.description,
          mood: updateData.mood || '',
          tags: Array.isArray(updateData.tags) ? updateData.tags : [],
          icon: updateData.icon || '💭',
        }
        updates.push(update)
      } catch (err) {
        console.error(`[Timeline] Error loading life update ${i}:`, err)
      }
    }

    return updates
  })

  // 所有时间线条目（合并并排序）
  const allEntries = computed<TimelineEntry[]>(() => {
    const entries: TimelineEntry[] = [
      ...githubActivities.value,
      ...learningRecords.value,
      ...lifeUpdates.value,
    ]
    return sortTimelineEntries(entries)
  })

  // 按类型筛选的条目
  const entriesByType = computed(() => ({
    github: allEntries.value.filter((e) => e.type === 'github') as GitHubActivity[],
    learning: allEntries.value.filter((e) => e.type === 'learning') as LearningRecord[],
    life: allEntries.value.filter((e) => e.type === 'life') as LifeUpdate[],
  }))

  // 获取指定数量的最新条目
  const getRecentEntries = (limit: number = 10) => {
    return allEntries.value.slice(0, limit)
  }

  // 加载 GitHub 活动（使用 store，自动去重和缓存）
  const loadGitHubActivity = async (username: string, limit: number = 10) => {
    try {
      await timelineStore.fetchActivities(username, limit)
    } catch (err) {
      console.error('Error loading GitHub activity:', err)
    }
  }

  // 刷新数据（强制刷新）
  const refresh = async (username: string, limit: number = 10) => {
    await timelineStore.fetchActivities(username, limit, true)
  }

  // 组件挂载时自动加载（可选）
  const initializeTimeline = (username: string, autoLoad: boolean = true) => {
    if (autoLoad) {
      onMounted(() => {
        loadGitHubActivity(username)
      })
    }
  }

  return {
    // 状态
    loading,
    error,

    // 数据
    githubActivities,
    learningRecords,
    lifeUpdates,
    allEntries,
    entriesByType,

    // 方法
    getRecentEntries,
    loadGitHubActivity,
    refresh,
    initializeTimeline,
  }
}
