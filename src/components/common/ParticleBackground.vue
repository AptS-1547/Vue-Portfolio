<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []
let mouse = { x: 0, y: 0 }
let isPageVisible = true
let cachedColors: { primaryRgb: string; secondaryRgb: string } | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

// 检测移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
)

// 粒子配置（移动设备优化）
const config = {
  particleCount: isMobile ? 30 : 40, // 优化：从 80 降到 40，移动端降到 30
  maxSpeed: 0.5, // 最大速度
  connectionDistance: 120, // 连线距离
  mouseDistance: 150, // 鼠标交互距离
  particleRadius: 2, // 粒子半径
  enableConnections: !isMobile, // 移动设备禁用连线以提升性能
}

/**
 * 缓存 CSS 颜色变量，避免每帧都调用 getComputedStyle
 */
function getCachedColors() {
  if (!cachedColors) {
    const primaryRgb =
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim() ||
      '79, 70, 229'
    const secondaryRgb =
      getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-rgb').trim() ||
      '6, 182, 212'
    cachedColors = { primaryRgb, secondaryRgb }
  }
  return cachedColors
}

/**
 * 清除颜色缓存（主题切换时调用）
 */
function clearColorCache() {
  cachedColors = null
}

function createParticles(width: number, height: number) {
  particles = []
  for (let i = 0; i < config.particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.maxSpeed,
      vy: (Math.random() - 0.5) * config.maxSpeed,
      radius: config.particleRadius,
      opacity: Math.random() * 0.5 + 0.3,
    })
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)

  // 使用缓存的颜色
  const { primaryRgb, secondaryRgb } = getCachedColors()
  const color1 = `rgba(${primaryRgb}, ${particle.opacity})`
  const color2 = `rgba(${secondaryRgb}, ${particle.opacity})`

  const gradient = ctx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    particle.radius * 3,
  )
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  ctx.fillStyle = gradient
  ctx.fill()
}

function drawConnection(
  ctx: CanvasRenderingContext2D,
  p1: Particle,
  p2: Particle,
  distance: number,
) {
  const opacity = (1 - distance / config.connectionDistance) * 0.3
  const { secondaryRgb } = getCachedColors()

  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.strokeStyle = `rgba(${secondaryRgb}, ${opacity})`
  ctx.lineWidth = 1
  ctx.stroke()
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return

  // 优化：页面不可见时暂停动画
  if (!isPageVisible) {
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 更新和绘制粒子
  particles.forEach((particle) => {
    // 移动粒子
    particle.x += particle.vx
    particle.y += particle.vy

    // 边界反弹
    if (particle.x < 0 || particle.x > width) particle.vx *= -1
    if (particle.y < 0 || particle.y > height) particle.vy *= -1

    // 鼠标交互（仅在非移动设备上）
    if (!isMobile) {
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < config.mouseDistance) {
        const force = (config.mouseDistance - distance) / config.mouseDistance
        particle.vx -= (dx / distance) * force * 0.02
        particle.vy -= (dy / distance) * force * 0.02
      }
    }

    // 限制速度
    const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
    if (speed > config.maxSpeed) {
      particle.vx = (particle.vx / speed) * config.maxSpeed
      particle.vy = (particle.vy / speed) * config.maxSpeed
    }

    // 绘制粒子
    drawParticle(ctx, particle)
  })

  // 绘制连线（优化：移动设备禁用，添加提前退出）
  if (config.enableConnections) {
    const maxDistance = config.connectionDistance
    const maxDistanceSquared = maxDistance * maxDistance // 优化：避免重复计算平方根

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i]
        const p2 = particles[j]
        if (!p1 || !p2) continue

        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distanceSquared = dx * dx + dy * dy

        // 优化：使用平方距离比较，避免开平方根
        if (distanceSquared < maxDistanceSquared) {
          const distance = Math.sqrt(distanceSquared)
          drawConnection(ctx, p1, p2, distance)
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createParticles(canvas.width, canvas.height)
  clearColorCache() // 重新获取颜色
}

function handleMouseMove(event: MouseEvent) {
  mouse.x = event.clientX
  mouse.y = event.clientY
}

/**
 * 页面可见性变化处理
 * 优化：页面不可见时暂停动画，节省 CPU
 */
function handleVisibilityChange() {
  isPageVisible = document.visibilityState === 'visible'
  console.debug('[ParticleBackground] 页面可见性:', isPageVisible)
}

/**
 * 主题变化时清除颜色缓存
 */
function handleThemeChange() {
  clearColorCache()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  handleResize()
  animate()

  // 添加事件监听
  window.addEventListener('resize', handleResize)
  if (!isMobile) {
    window.addEventListener('mousemove', handleMouseMove)
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // 监听主题变化
  const unwatch = themeStore.$subscribe(() => {
    handleThemeChange()
  })

  // 清理函数会在 onUnmounted 中调用
  onUnmounted(() => {
    unwatch()
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0"
    :class="{ 'opacity-40': !themeStore.isDark, 'opacity-30': themeStore.isDark }"
  ></canvas>
</template>

<style scoped>
canvas {
  transition: opacity 0.3s ease;
}
</style>
