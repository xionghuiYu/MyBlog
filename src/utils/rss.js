import RSS from 'rss'
import { fetchPostsIndex } from './fetch.js'
import { formatDate } from './date.js'

export const generateRSS = async () => {
  const posts = await fetchPostsIndex()
  const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5177'
  const siteTitle = import.meta.env.VITE_SITE_TITLE || '我的博客'
  const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || '分享我的思考和发现'

  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'zh-CN',
    pubDate: new Date(),
    ttl: 60,
    custom_namespaces: {
      'dc': 'http://purl.org/dc/elements/1.1/',
      'content': 'http://purl.org/rss/1.0/modules/content/'
    }
  })

  // 添加文章到 RSS feed
  posts.slice(0, 10).forEach(post => {
    try {
      // 动态导入文章内容
      const postPath = `/posts/${post.slug}.md`
      const fullUrl = `${siteUrl}/blog/${post.slug}`

      feed.item({
        title: post.title,
        description: post.summary,
        url: fullUrl,
        guid: fullUrl,
        categories: post.tags,
        author: '博主', // 可以从环境变量配置
        date: formatDate(post.date),
        custom_elements: [
          {'content:encoded': post.summary}
        ]
      })
    } catch (error) {
      console.error(`Failed to add post ${post.slug} to RSS:`, error)
    }
  })

  return feed.xml({ indent: true })
}

// 生成 RSS feed 的 HTML 元素
export const generateRSSLink = () => {
  return `<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />`
}