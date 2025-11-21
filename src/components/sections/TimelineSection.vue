<template>
  <section
    ref="sectionRef"
    class="opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible]:opacity-100 data-[visible]:translate-y-0"
  >
    <!-- Section Header -->
    <div class="mb-6 lg:mb-8">
      <h2
        class="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 border-b border-gray-200 dark:border-gray-700 pb-2 hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
      >
        {{ t('timeline.title') }}
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-[image:var(--gradient-primary)] transition-all duration-200 group-hover:w-full"
        ></span>
      </h2>
      <p class="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-2">
        {{ t('timeline.subtitle') }}
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="activeFilter = filter.value"
        :class="[
          'px-3 py-1.5 text-sm rounded-full transition-all duration-200',
          activeFilter === filter.value
            ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
        ]"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">{{ t('timeline.loading') }}</span>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center"
    >
      <p class="text-red-600 dark:text-red-400 mb-2">{{ t('timeline.loadError') }}</p>
      <button
        @click="handleRetry"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        {{ t('timeline.retry') }}
      </button>
    </div>

    <!-- Timeline Items -->
    <div v-else-if="filteredEntries.length > 0" class="relative">
      <!-- Vertical Line -->
      <div
        class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-transparent"
      ></div>

      <!-- Timeline Entries -->
      <div class="space-y-6">
        <div
          v-for="(entry, index) in displayedEntries"
          :key="entry.id"
          class="relative pl-12 group"
        >
          <!-- Timeline Dot -->
          <div
            :class="[
              'absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 transition-all duration-200',
              getTypeColor(entry.type),
              'group-hover:scale-150',
            ]"
          ></div>

          <!-- Entry Card -->
          <div
            :class="[
              'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border transition-all duration-200',
              'hover:shadow-md hover:-translate-y-0.5',
              getTypeBorderColor(entry.type),
            ]"
          >
            <!-- Entry Header -->
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-lg">{{ entry.icon || getTypeIcon(entry.type) }}</span>
                <span
                  :class="[
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    getTypeTagColor(entry.type),
                  ]"
                >
                  {{ t(`timeline.types.${entry.type}`) }}
                </span>
              </div>
              <time
                class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2"
                :datetime="entry.date"
              >
                {{ formatDate(entry.date) }}
              </time>
            </div>

            <!-- Entry Title -->
            <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
              <a
                v-if="entry.link"
                :href="entry.link"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-[var(--color-primary)] transition-colors"
              >
                {{ entry.title }}
                <span class="text-xs">↗</span>
              </a>
              <span v-else>{{ entry.title }}</span>
            </h3>

            <!-- Entry Description -->
            <p
              v-if="entry.description"
              class="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed"
            >
              {{ entry.description }}
            </p>

            <!-- GitHub Specific Info -->
            <div
              v-if="entry.type === 'github' && entry.repo"
              class="text-xs text-gray-500 dark:text-gray-400 mb-2"
            >
              <span class="font-mono">{{ entry.repo }}</span>
              <span v-if="entry.branch" class="ml-2">→ {{ entry.branch }}</span>
              <span v-if="entry.commitCount" class="ml-2">({{ entry.commitCount }} commits)</span>
            </div>

            <!-- Tags -->
            <div v-if="entry.tags && entry.tags.length > 0" class="flex flex-wrap gap-1.5">
              <Tag v-for="tag in entry.tags" :key="tag" variant="timeline" :label="tag" />
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="canLoadMore" class="mt-6 text-center">
        <button
          @click="loadMore"
          class="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {{ t('timeline.viewAll') }}
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg mb-2">{{ t('timeline.empty.title') }}</p>
      <p class="text-sm text-gray-400 dark:text-gray-500">{{ t('timeline.empty.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Tag from '@/components/ui/Tag.vue'
import type { TimelineType, TimelineEntry } from '@/types/timeline'
import { useTimeline } from '@/composables/useTimeline'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = withDefaults(
  defineProps<{
    githubUsername?: string
    initialLimit?: number
    maxDisplay?: number
  }>(),
  {
    githubUsername: 'AptS-1547',
    initialLimit: 10,
    maxDisplay: 5,
  },
)

const { t } = useI18n()
const sectionRef = ref<HTMLElement>()
useScrollAnimation(sectionRef, { threshold: 0.2, once: true })

// Timeline composable
const { loading, error, allEntries, loadGitHubActivity } = useTimeline()

// Filter state
type FilterValue = 'all' | TimelineType
const activeFilter = ref<FilterValue>('all')
const displayLimit = ref(props.maxDisplay)

// Filters
const filters = computed(() => [
  { value: 'all' as const, label: t('timeline.filters.all') },
  { value: 'github' as const, label: t('timeline.filters.github') },
  { value: 'learning' as const, label: t('timeline.filters.learning') },
  { value: 'life' as const, label: t('timeline.filters.life') },
])

// Filtered entries
const filteredEntries = computed(() => {
  if (activeFilter.value === 'all') {
    return allEntries.value
  }
  return allEntries.value.filter((entry) => entry.type === activeFilter.value)
})

// Displayed entries with limit
const displayedEntries = computed(() => {
  return filteredEntries.value.slice(0, displayLimit.value)
})

// Can load more
const canLoadMore = computed(() => {
  return filteredEntries.value.length > displayLimit.value
})

// Load more
const loadMore = () => {
  displayLimit.value = filteredEntries.value.length
}

// Retry loading
const handleRetry = () => {
  loadGitHubActivity(props.githubUsername, props.initialLimit)
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()

  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // 小于1分钟
  if (diffMinutes < 1) return t('common.time.justNow')

  // 小于1小时
  if (diffMinutes < 60) return t('common.time.minutesAgo', { count: diffMinutes })

  // 小于24小时
  if (diffHours < 24) return t('common.time.hoursAgo', { count: diffHours })

  // 1天
  if (diffDays === 1) return t('common.time.yesterday')

  // 小于7天
  if (diffDays < 7) return t('common.time.daysAgo', { count: diffDays })

  // 小于30天
  if (diffDays < 30) return t('common.time.weeksAgo', { count: Math.floor(diffDays / 7) })

  return date.toLocaleDateString()
}

// Type styling helpers
const getTypeColor = (type: TimelineType) => {
  const colors = {
    github: 'bg-purple-500 border-purple-500',
    learning: 'bg-blue-500 border-blue-500',
    life: 'bg-green-500 border-green-500',
  }
  return colors[type]
}

const getTypeBorderColor = (type: TimelineType) => {
  const colors = {
    github: 'border-purple-200 dark:border-purple-800',
    learning: 'border-blue-200 dark:border-blue-800',
    life: 'border-green-200 dark:border-green-800',
  }
  return colors[type]
}

const getTypeTagColor = (type: TimelineType) => {
  const colors = {
    github: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    learning: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    life: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  }
  return colors[type]
}

const getTypeIcon = (type: TimelineType) => {
  const icons = {
    github: '💻',
    learning: '📚',
    life: '💭',
  }
  return icons[type]
}

// Load GitHub activity on mount
onMounted(() => {
  loadGitHubActivity(props.githubUsername, props.initialLimit)
})
</script>

<style scoped>
/* 自定义样式（如果需要） */
</style>
