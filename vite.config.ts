import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),

    // 打包分析插件（仅在分析模式下启用）
    process.env.ANALYZE
      ? visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        })
      : undefined,

    // Gzip 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10KB 以上才压缩
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // Brotli 压缩（更高压缩率）
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 构建优化
  build: {
    // 块大小警告限制（KB）
    chunkSizeWarningLimit: 1000,

    // Rollup 选项
    rollupOptions: {
      output: {
        // 手动分割代码
        manualChunks(id) {
          // 将 node_modules 中的包分组
          if (id.includes('node_modules')) {
            // Vue 相关库单独打包
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vendor-vue'
            }

            // UI 相关库单独打包
            if (id.includes('@heroicons') || id.includes('class-variance-authority')) {
              return 'vendor-ui'
            }

            // i18n 相关库单独打包
            if (id.includes('vue-i18n')) {
              return 'vendor-i18n'
            }

            // 其他第三方库
            return 'vendor-others'
          }

          // 将 i18n 语言文件单独分割
          if (id.includes('/i18n/locales/')) {
            const locale = id.match(/locales\/([^/]+)/)?.[1]
            if (locale) {
              return `locale-${locale}`
            }
          }
        },

        // 优化输出文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // 启用 CSS 代码分割
    cssCodeSplit: true,

    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境移除 console 和 debugger
        drop_console: true,
        drop_debugger: true,
        // 移除无用代码
        pure_funcs: ['console.log', 'console.debug'],
      },
    },

    // 生成 sourcemap（可选，用于调试）
    sourcemap: false,
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
    exclude: ['@vueuse/core'], // 按需引入的库不需要预构建
  },
})
