import { marked } from 'marked'
import hljs from 'highlight.js'

// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error(err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
})

/**
 * 渲染 Markdown 为 HTML
 * @param {string} markdown - Markdown 内容
 * @returns {string} HTML
 */
export function renderMarkdown(markdown) {
  return marked.parse(markdown)
}

/**
 * 解析 Frontmatter
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, content }
  }

  const frontmatter = match[1]
  const body = match[2]
  const metadata = {}

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim()

      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      // 解析数组
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''))
      }

      metadata[key.trim()] = value
    }
  })

  return { metadata, content: body }
}

export function parsePost(content) {
  const { metadata, content: body } = parseFrontmatter(content)
  const html = renderMarkdown(body)
  return { metadata, html }
}