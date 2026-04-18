import { parsePost } from './markdown.js'

const POSTS_INDEX = '/posts/index.json'

/**
 * 获取所有博客文章的索引
 */
export async function fetchPostsIndex() {
  try {
    const response = await fetch(POSTS_INDEX)
    if (!response.ok) throw new Error('Failed to fetch posts index')
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts index:', error)
    return []
  }
}

/**
 * 根据 slug 获取单篇文章
 */
export async function fetchPostBySlug(slug) {
  try {
    const response = await fetch(`/posts/${slug}.md`)
    if (!response.ok) throw new Error('Post not found')
    const content = await response.text()
    const { metadata, html } = parsePost(content)
    return {
      slug,
      ...metadata,
      html
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

/**
 * 搜索文章
 */
export function searchPosts(posts, query) {
  if (!query.trim()) return posts

  const lowerQuery = query.toLowerCase()
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    (post.summary && post.summary.toLowerCase().includes(lowerQuery)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  )
}

/**
 * 按标签筛选文章
 */
export function filterPostsByTag(posts, tag) {
  if (!tag) return posts
  return posts.filter(post =>
    post.tags && post.tags.includes(tag)
  )
}

/**
 * 获取所有标签
 */
export function getAllTags(posts) {
  const tags = new Set()
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
}