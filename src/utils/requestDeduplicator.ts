/**
 * 请求去重器 - 防止相同的请求并发执行
 *
 * 功能：
 * 1. 对于相同的请求（URL + method + body），如果已经在进行中，则复用同一个 Promise
 * 2. 请求完成后自动清理缓存
 * 3. 支持自定义缓存 key 生成策略
 */

interface PendingRequest {
  promise: Promise<any>
  timestamp: number
}

class RequestDeduplicator {
  private pendingRequests: Map<string, PendingRequest> = new Map()

  /**
   * 生成请求的唯一标识
   */
  private generateKey(url: string, options?: RequestInit): string {
    const method = options?.method || 'GET'
    const body = options?.body ? JSON.stringify(options.body) : ''
    const headers = options?.headers ? JSON.stringify(options.headers) : ''
    return `${method}:${url}:${body}:${headers}`
  }

  /**
   * 包装 fetch 请求，自动去重
   */
  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const key = this.generateKey(url, options)

    // 如果已经有相同的请求在进行中，直接返回该 Promise
    const pending = this.pendingRequests.get(key)
    if (pending) {
      console.debug(`[RequestDeduplicator] 复用进行中的请求: ${url}`)
      return pending.promise
    }

    // 创建新的请求
    const promise = fetch(url, options)
      .then(async (response) => {
        // 克隆 response，因为 response.body 只能读取一次
        // 这样可以让多个等待者都能正常读取
        const clonedResponse = response.clone()

        // 请求完成后清理缓存
        this.pendingRequests.delete(key)

        return clonedResponse
      })
      .catch((error) => {
        // 请求失败也要清理缓存
        this.pendingRequests.delete(key)
        throw error
      })

    // 存储到待处理请求映射中
    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now(),
    })

    return promise
  }

  /**
   * 清理所有待处理的请求
   */
  clear(): void {
    this.pendingRequests.clear()
  }

  /**
   * 清理超时的待处理请求（可选，用于防止内存泄漏）
   */
  clearStale(maxAge: number = 60000): void {
    const now = Date.now()
    for (const [key, request] of this.pendingRequests.entries()) {
      if (now - request.timestamp > maxAge) {
        this.pendingRequests.delete(key)
      }
    }
  }

  /**
   * 获取当前待处理请求数量
   */
  get size(): number {
    return this.pendingRequests.size
  }
}

// 导出单例
export const requestDeduplicator = new RequestDeduplicator()

// 导出包装后的 fetch 函数，可以直接替代原生 fetch
export const deduplicatedFetch = (url: string, options?: RequestInit) => {
  return requestDeduplicator.fetch(url, options)
}
