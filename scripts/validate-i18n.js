#!/usr/bin/env node
/**
 * i18n 验证脚本：确保所有语言的项目数据结构一致
 *
 * 验证规则：
 * 1. 所有语言文件必须包含相同的项目 ID 列表
 * 2. 元数据字段（tags、githubUrl、language、status、license）在所有语言中必须完全相同
 * 3. 数组字段（features、techStack、performance）的长度必须一致
 * 4. 技术栈的结构（分类和每个分类的技术数量）必须一致
 */

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createJiti } from 'jiti'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const jiti = createJiti(__filename)

const LOCALES = ['zh-CN', 'en', 'ja']
const METADATA_FIELDS = ['id', 'tags', 'githubUrl', 'language', 'status', 'license']

let hasErrors = false

/**
 * 动态导入并解析项目数据
 */
async function loadProjectsData() {
  const data = {}

  for (const locale of LOCALES) {
    const filePath = join(projectRoot, `src/i18n/locales/${locale}/projects.ts`)
    try {
      // 使用 jiti 加载 TypeScript 文件
      const module = jiti(filePath)
      data[locale] = module.default
    } catch (error) {
      console.error(`❌ 无法加载 ${locale} 的项目数据:`, error.message)
      process.exit(1)
    }
  }

  return data
}

/**
 * 比较两个值是否相等（深度比较）
 */
function deepEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((val, index) => deepEqual(val, b[index]))
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a).sort()
    const keysB = Object.keys(b).sort()
    if (!deepEqual(keysA, keysB)) return false
    return keysA.every(key => deepEqual(a[key], b[key]))
  }

  return false
}

/**
 * 验证项目 ID 列表一致性
 */
function validateProjectIds(data) {
  console.log('\n📋 验证项目 ID 列表...')

  const projectIdsByLocale = {}
  for (const locale of LOCALES) {
    projectIdsByLocale[locale] = Object.keys(data[locale]).sort()
  }

  const baseLocale = LOCALES[0]
  const baseIds = projectIdsByLocale[baseLocale]

  for (const locale of LOCALES.slice(1)) {
    const currentIds = projectIdsByLocale[locale]

    if (!deepEqual(baseIds, currentIds)) {
      console.error(`❌ 项目 ID 列表不一致:`)
      console.error(`  ${baseLocale}: ${baseIds.join(', ')}`)
      console.error(`  ${locale}: ${currentIds.join(', ')}`)

      const missing = baseIds.filter(id => !currentIds.includes(id))
      const extra = currentIds.filter(id => !baseIds.includes(id))

      if (missing.length > 0) {
        console.error(`  ${locale} 缺少: ${missing.join(', ')}`)
      }
      if (extra.length > 0) {
        console.error(`  ${locale} 多余: ${extra.join(', ')}`)
      }

      hasErrors = true
    }
  }

  if (!hasErrors) {
    console.log(`✓ 所有语言包含相同的 ${baseIds.length} 个项目`)
  }

  return baseIds
}

/**
 * 验证元数据字段一致性
 */
function validateMetadata(data, projectIds) {
  console.log('\n🔍 验证元数据字段...')

  for (const projectId of projectIds) {
    const baseLocale = LOCALES[0]
    const baseProject = data[baseLocale][projectId]

    for (const locale of LOCALES.slice(1)) {
      const currentProject = data[locale][projectId]

      for (const field of METADATA_FIELDS) {
        const baseValue = baseProject[field]
        const currentValue = currentProject[field]

        if (!deepEqual(baseValue, currentValue)) {
          console.error(`❌ 项目 "${projectId}" 的 ${field} 字段不一致:`)
          console.error(`  ${baseLocale}: ${JSON.stringify(baseValue)}`)
          console.error(`  ${locale}: ${JSON.stringify(currentValue)}`)
          hasErrors = true
        }
      }
    }
  }

  if (!hasErrors) {
    console.log(`✓ 所有项目的元数据字段一致`)
  }
}

/**
 * 验证数组字段长度一致性
 */
function validateArrayFields(data, projectIds) {
  console.log('\n📊 验证数组字段长度...')

  const arrayFields = ['features', 'techStack', 'performance']

  for (const projectId of projectIds) {
    const baseLocale = LOCALES[0]
    const baseProject = data[baseLocale][projectId]

    for (const locale of LOCALES.slice(1)) {
      const currentProject = data[locale][projectId]

      for (const field of arrayFields) {
        const baseArray = baseProject[field]
        const currentArray = currentProject[field]

        // 如果某个语言没有这个字段，检查其他语言是否也没有
        if (!baseArray && !currentArray) continue

        if (!baseArray || !currentArray) {
          console.error(`❌ 项目 "${projectId}" 的 ${field} 字段存在性不一致:`)
          console.error(`  ${baseLocale}: ${baseArray ? '存在' : '不存在'}`)
          console.error(`  ${locale}: ${currentArray ? '存在' : '不存在'}`)
          hasErrors = true
          continue
        }

        if (baseArray.length !== currentArray.length) {
          console.error(`❌ 项目 "${projectId}" 的 ${field} 数组长度不一致:`)
          console.error(`  ${baseLocale}: ${baseArray.length} 项`)
          console.error(`  ${locale}: ${currentArray.length} 项`)
          hasErrors = true
        }

        // 对于 techStack，还需要验证每个分类的结构
        if (field === 'techStack') {
          for (let i = 0; i < Math.min(baseArray.length, currentArray.length); i++) {
            const baseCategory = baseArray[i]
            const currentCategory = currentArray[i]

            if (baseCategory.name !== currentCategory.name) {
              console.error(
                `❌ 项目 "${projectId}" 的 techStack[${i}] 分类名称不一致:`
              )
              console.error(`  ${baseLocale}: ${baseCategory.name}`)
              console.error(`  ${locale}: ${currentCategory.name}`)
              hasErrors = true
            }

            if (baseCategory.items.length !== currentCategory.items.length) {
              console.error(
                `❌ 项目 "${projectId}" 的 techStack[${i}].items 数量不一致:`
              )
              console.error(`  ${baseLocale}: ${baseCategory.items.length} 项`)
              console.error(`  ${locale}: ${currentCategory.items.length} 项`)
              hasErrors = true
            }

            // 验证技术栈项的 name 字段是否一致（技术名称不应该翻译）
            for (let j = 0; j < Math.min(baseCategory.items.length, currentCategory.items.length); j++) {
              const baseTech = baseCategory.items[j]
              const currentTech = currentCategory.items[j]

              if (baseTech.name !== currentTech.name) {
                console.error(
                  `❌ 项目 "${projectId}" 的 techStack[${i}].items[${j}].name 不一致:`
                )
                console.error(`  ${baseLocale}: ${baseTech.name}`)
                console.error(`  ${locale}: ${currentTech.name}`)
                hasErrors = true
              }
            }
          }
        }
      }
    }
  }

  if (!hasErrors) {
    console.log(`✓ 所有项目的数组字段长度一致`)
  }
}

/**
 * 主验证函数
 */
async function main() {
  console.log('🔎 开始验证 i18n 项目数据一致性...')
  console.log(`📚 语言: ${LOCALES.join(', ')}`)

  const data = await loadProjectsData()
  const projectIds = validateProjectIds(data)

  if (hasErrors) {
    console.log('\n❌ 验证失败：项目 ID 列表不一致')
    process.exit(1)
  }

  validateMetadata(data, projectIds)
  validateArrayFields(data, projectIds)

  if (hasErrors) {
    console.log('\n❌ 验证失败：发现数据不一致')
    console.log('请修复上述错误后重试')
    process.exit(1)
  }

  console.log('\n✅ 所有验证通过！i18n 数据结构一致')
  process.exit(0)
}

main().catch(error => {
  console.error('❌ 验证过程中发生错误:', error)
  process.exit(1)
})
