<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []
let mouse = { x: 0, y: 0 }

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

// 粒子配置
const config = {
  particleCount: 80, // 粒子数量
  maxSpeed: 0.5, // 最大速度
  connectionDistance: 120, // 连线距离
  mouseDistance: 150, // 鼠标交互距离
  particleRadius: 2, // 粒子半径
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
  // 使用主题色：从 CSS 变量获取 RGB 值
  const primaryRgb =
    getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim() ||
    '79, 70, 229'
  const secondaryRgb =
    getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-rgb').trim() ||
    '6, 182, 212'
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
  const secondaryRgb =
    getComputedStyle(document.documentElement).getPropertyValue('--color-secondary-rgb').trim() ||
    '6, 182, 212'
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  // 连线使用次要色
  ctx.strokeStyle = `rgba(${secondaryRgb}, ${opacity})`
  ctx.lineWidth = 1
  ctx.stroke()
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return

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

    // 鼠标交互
    const dx = mouse.x - particle.x
    const dy = mouse.y - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < config.mouseDistance) {
      const force = (config.mouseDistance - distance) / config.mouseDistance
      particle.vx -= (dx / distance) * force * 0.02
      particle.vy -= (dy / distance) * force * 0.02
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

  // 绘制连线
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i]
      const p2 = particles[j]
      if (!p1 || !p2) continue

      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < config.connectionDistance) {
        drawConnection(ctx, p1, p2, distance)
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
}

function handleMouseMove(event: MouseEvent) {
  mouse.x = event.clientX
  mouse.y = event.clientY
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  handleResize()
  animate()

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
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
