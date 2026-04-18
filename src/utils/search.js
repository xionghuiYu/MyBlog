import { createSearch } from 'flexsearch'
import index from '../posts/index.json'

let searchInstance = null

// 创建搜索索引
const createSearchIndex = async () => {
  if (searchInstance) return searchInstance

  searchInstance = createSearch({
    encode: 'icase',
    tokenize: 'forward',
    threshold: 3,
    cache: 100
  })

  // 获取所有文章内容
  for (const post of index) {
    try {
      // 动态导入文章内容
      const { default: mdContent } = await import(`../posts/${post.slug}.md`)

      // 提取正文内容（去掉 frontmatter）
      const contentMatch = mdContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
      const content = contentMatch ? contentMatch[1] : mdContent

      // 添加文档到索引
      searchInstance.add(post.slug, {
        title: post.title,
        description: post.summary,
        content: content,
        tags: post.tags
      })
    } catch (error) {
      console.error(`Failed to load content for ${post.slug}:`, error)
    }
  }

  return searchInstance
}

// 搜索函数
export const searchPosts = async (query) => {
  if (!query) return []

  const search = await createSearchIndex()
  const results = search.search(query)

  // 将搜索结果映射到完整的文章数据
  return results.map(result => {
    const post = index.find(p => p.slug === result.id)
    return {
      ...post,
      score: result.score,
      matchHighlights: result.matchHighlights || []
    }
  })
}

// 高亮匹配文本
export const highlightText = (text, query) => {
  if (!query || !text) return text

  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
}

// 获取搜索建议
export const getSuggestions = (query, limit = 5) => {
  if (!query) return []

  const results = searchPosts(query)
  return results.slice(0, limit).map(post => ({
    id: post.slug,
    title: post.title,
    type: 'post'
  }))
}