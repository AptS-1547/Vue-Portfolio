<template>
  <div class="animate-pulse">
    <!-- 项目头部骨架 -->
    <div v-if="type === 'project-detail'" class="space-y-8">
      <!-- 返回按钮 -->
      <div class="h-4 w-32 bg-gray-200 rounded"></div>

      <!-- 项目头部卡片 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
        <!-- 状态栏 -->
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
          <div class="h-3 w-16 bg-gray-200 rounded"></div>
          <div class="h-3 w-12 bg-gray-200 rounded"></div>
        </div>

        <!-- 标题 -->
        <div class="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>

        <!-- 描述 -->
        <div class="space-y-2 mb-6">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        <!-- 标签 -->
        <div class="flex flex-wrap gap-2 mb-6">
          <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div class="h-6 w-14 bg-gray-200 rounded-full"></div>
        </div>

        <!-- 按钮 -->
        <div class="flex gap-3">
          <div class="h-10 w-32 bg-gray-200 rounded-lg"></div>
          <div class="h-10 w-28 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <!-- 内容区块 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
        <div class="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- 项目列表骨架 -->
    <div v-else-if="type === 'project-list'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div v-for="i in 4" :key="i" class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div class="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
          <div class="h-3 w-12 bg-gray-200 rounded"></div>
        </div>
        <div class="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
        <div class="space-y-2 mb-4">
          <div class="h-3 bg-gray-200 rounded"></div>
          <div class="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div class="flex gap-1">
          <div class="h-5 w-12 bg-gray-200 rounded"></div>
          <div class="h-5 w-14 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- 默认骨架 -->
    <div v-else class="space-y-4">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'project-detail' | 'project-list' | 'default'
}>()
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
