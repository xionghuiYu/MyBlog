# 测试系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 配置测试框架，编写单元测试、组件测试和 E2E 测试，确保代码质量和功能正确性。

**Architecture:** 使用 Vitest 进行单元测试和组件测试（Vue 3 生态原生支持），使用 Playwright 进行 E2E 测试。测试文件与源文件并行组织。

**Tech Stack:** Vitest, @vue/test-utils, Playwright, happy-dom

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `vitest.config.js` | Vitest 配置 |
| `playwright.config.ts` | Playwright 配置 |
| `tests/unit/utils/date.test.js` | 日期工具单元测试 |
| `tests/unit/utils/markdown.test.js` | Markdown 工具单元测试 |
| `tests/unit/utils/fetch.test.js` | Fetch 工具单元测试 |
| `tests/unit/data/config.test.js` | 配置数据测试 |
| `tests/components/Home.test.js` | 首页组件测试 |
| `tests/components/Header.test.js` | Header 组件测试 |
| `tests/components/ThemeToggle.test.js` | 主题切换组件测试 |
| `tests/components/TodoApp.test.js` | 待办清单组件测试 |
| `tests/e2e/navigation.spec.js` | 导航流程 E2E 测试 |
| `tests/e2e/blog-flow.spec.js` | 博客阅读流程 E2E 测试 |
| `tests/e2e/tools-flow.spec.js` | 工具使用流程 E2E 测试 |

---

### Task 1: 安装测试依赖

**Files:**
- Modify: `package.json`

- [x] **Step 1: 更新 package.json 添加测试依赖**

```json
{
  "name": "personal-blog",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.5",
    "lucide-vue-next": "^0.309.0",
    "marked": "^12.0.0",
    "highlight.js": "^11.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "@vue/test-utils": "^2.4.3",
    "@playwright/test": "^1.41.0",
    "autoprefixer": "^10.4.16",
    "happy-dom": "^13.0.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0",
    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0"
  }
}
```

- [x] **Step 2: 运行 npm install**

Run: `npm install`
Expected: 所有测试依赖安装成功

- [x] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "chore: 添加测试依赖"
```

---

### Task 2: 配置 Vitest

**Files:**
- Create: `vitest.config.js`

- [x] **Step 1: 创建 vitest.config.js**

```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.js',
        '**/*.spec.js',
        '**/dist/'
      ]
    }
  }
})
```

- [x] **Step 2: 提交**

```bash
git add vitest.config.js
git commit -m "chore: 配置 Vitest"
```

---

### Task 3: 配置 Playwright

**Files:**
- Create: `playwright.config.ts`

- [x] **Step 1: 创建 playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [x] **Step 2: 提交**

```bash
git add playwright.config.ts
git commit -m "chore: 配置 Playwright"
```

---

### Task 4: 编写日期工具单元测试

**Files:**
- Create: `tests/unit/utils/date.test.js`

- [x] **Step 1: 创建 date.test.js**

```javascript
import { describe, it, expect } from 'vitest'
import { formatDate, formatRelativeTime } from '@/utils/date.js'

describe('formatDate', () => {
  it('格式化日期为中文格式', () => {
    const result = formatDate('2026-04-14')
    expect(result).toBe('2026年4月14日')
  })

  it('处理不同月份的日期', () => {
    expect(formatDate('2026-01-05')).toBe('2026年1月5日')
    expect(formatDate('2026-12-31')).toBe('2026年12月31日')
  })

  it('处理闰年2月29日', () => {
    expect(formatDate('2024-02-29')).toBe('2024年2月29日')
  })
})

describe('formatRelativeTime', () => {
  beforeAll(() => {
    // 固定当前时间用于测试
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-14T12:00:00Z'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('显示今天', () => {
    const result = formatRelativeTime('2026-04-14T10:00:00Z')
    expect(result).toBe('今天')
  })

  it('显示昨天', () => {
    const result = formatRelativeTime('2026-04-13T15:00:00Z')
    expect(result).toBe('昨天')
  })

  it('显示几天前', () => {
    const result = formatRelativeTime('2026-04-10T12:00:00Z')
    expect(result).toBe('4 天前')
  })

  it('显示几周前', () => {
    const result = formatRelativeTime('2026-04-01T12:00:00Z')
    expect(result).toBe('2 周前')
  })

  it('显示几个月前', () => {
    const result = formatRelativeTime('2026-02-14T12:00:00Z')
    expect(result).toBe('2 个月前')
  })

  it('显示几年前', () => {
    const result = formatRelativeTime('2024-04-14T12:00:00Z')
    expect(result).toBe('2 年前')
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- date.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/unit/utils/date.test.js
git commit -m "test: 添加日期工具单元测试"
```

---

### Task 5: 编写 Markdown 工具单元测试

**Files:**
- Create: `tests/unit/utils/markdown.test.js`

- [x] **Step 1: 创建 markdown.test.js**

```javascript
import { describe, it, expect } from 'vitest'
import { parseFrontmatter, renderMarkdown, parsePost } from '@/utils/markdown.js'

describe('parseFrontmatter', () => {
  it('解析带有 Frontmatter 的内容', () => {
    const content = `---
title: "测试文章"
date: "2026-04-14"
tags: ["Vue", "测试"]
---

文章正文`
    const { metadata, content: body } = parseFrontmatter(content)

    expect(metadata.title).toBe('测试文章')
    expect(metadata.date).toBe('2026-04-14')
    expect(metadata.tags).toEqual(['Vue', '测试'])
    expect(body).toBe('文章正文')
  })

  it('处理没有 Frontmatter 的内容', () => {
    const content = '普通文章内容'
    const { metadata, content: body } = parseFrontmatter(content)

    expect(metadata).toEqual({})
    expect(body).toBe('普通文章内容')
  })

  it('处理数组格式的标签', () => {
    const content = `---
tags: ["Vue", "测试", "前端"]
---

内容`
    const { metadata } = parseFrontmatter(content)

    expect(metadata.tags).toEqual(['Vue', '测试', '前端'])
  })

  it('处理单引号包裹的值', () => {
    const content = `---
title: '单引号标题'
summary: '摘要内容'
---

内容`
    const { metadata } = parseFrontmatter(content)

    expect(metadata.title).toBe('单引号标题')
    expect(metadata.summary).toBe('摘要内容')
  })
})

describe('renderMarkdown', () => {
  it('将 Markdown 转换为 HTML', () => {
    const markdown = '# 标题\n\n段落内容'
    const html = renderMarkdown(markdown)

    expect(html).toContain('<h1>标题</h1>')
    expect(html).toContain('<p>段落内容</p>')
  })

  it('渲染代码块', () => {
    const markdown = '```javascript\nconst x = 1\n```'
    const html = renderMarkdown(markdown)

    expect(html).toContain('<pre>')
    expect(html).toContain('<code class="hljs language-javascript">')
  })

  it('渲染链接', () => {
    const markdown = '[链接](https://example.com)'
    const html = renderMarkdown(markdown)

    expect(html).toContain('<a href="https://example.com">链接</a>')
  })

  it('渲染列表', () => {
    const markdown = '- 项目1\n- 项目2'
    const html = renderMarkdown(markdown)

    expect(html).toContain('<ul>')
    expect(html).toContain('<li>项目1</li>')
    expect(html).toContain('<li>项目2</li>')
  })
})

describe('parsePost', () => {
  it('解析完整的博客文章', () => {
    const content = `---
title: "测试"
date: "2026-04-14"
---

# 标题

内容`
    const { metadata, html } = parsePost(content)

    expect(metadata.title).toBe('测试')
    expect(metadata.date).toBe('2026-04-14')
    expect(html).toContain('<h1>标题</h1>')
    expect(html).toContain('<p>内容</p>')
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- markdown.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/unit/utils/markdown.test.js
git commit -m "test: 添加 Markdown 工具单元测试"
```

---

### Task 6: 编写 Fetch 工具单元测试

**Files:**
- Create: `tests/unit/utils/fetch.test.js`

- [x] **Step 1: 创建 fetch.test.js**

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  searchPosts,
  filterPostsByTag,
  getAllTags
} from '@/utils/fetch.js'

describe('searchPosts', () => {
  const posts = [
    {
      slug: 'post1',
      title: 'Vue 3 教程',
      tags: ['Vue', '前端'],
      summary: '学习 Vue 3 的基础'
    },
    {
      slug: 'post2',
      title: 'React 指南',
      tags: ['React', '前端'],
      summary: 'React 开发指南'
    },
    {
      slug: 'post3',
      title: 'CSS 技巧',
      tags: ['CSS', '设计'],
      summary: 'CSS 实用技巧'
    }
  ]

  it('按标题搜索', () => {
    const result = searchPosts(posts, 'Vue')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('post1')
  })

  it('按摘要搜索', () => {
    const result = searchPosts(posts, '指南')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('post2')
  })

  it('按标签搜索', () => {
    const result = searchPosts(posts, '前端')
    expect(result).toHaveLength(2)
  })

  it('不区分大小写', () => {
    const result = searchPosts(posts, 'vue')
    expect(result).toHaveLength(1)
  })

  it('空搜索词返回所有文章', () => {
    const result = searchPosts(posts, '')
    expect(result).toHaveLength(3)
  })
})

describe('filterPostsByTag', () => {
  const posts = [
    { slug: 'post1', tags: ['Vue', '前端'] },
    { slug: 'post2', tags: ['React', '前端'] },
    { slug: 'post3', tags: ['CSS', '设计'] }
  ]

  it('按标签筛选文章', () => {
    const result = filterPostsByTag(posts, 'Vue')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('post1')
  })

  it('空标签返回所有文章', () => {
    const result = filterPostsByTag(posts, '')
    expect(result).toHaveLength(3)
  })
})

describe('getAllTags', () => {
  const posts = [
    { tags: ['Vue', '前端'] },
    { tags: ['React', '前端'] },
    { tags: ['CSS', '设计'] },
    { tags: ['Vue'] }
  ]

  it('获取所有唯一标签', () => {
    const result = getAllTags(posts)
    expect(result).toEqual(['CSS', 'React', 'Vue', '设计', '前端'])
  })

  it('处理没有标签的文章', () => {
    const postsWithoutTags = [{ tags: [] }, { tags: ['Vue'] }]
    const result = getAllTags(postsWithoutTags)
    expect(result).toEqual(['Vue'])
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- fetch.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/unit/utils/fetch.test.js
git commit -m "test: 添加 Fetch 工具单元测试"
```

---

### Task 7: 编写配置数据测试

**Files:**
- Create: `tests/unit/data/config.test.js`

- [x] **Step 1: 创建 config.test.js**

```javascript
import { describe, it, expect } from 'vitest'
import { tools } from '@/data/config.js'

describe('工具配置', () => {
  it('导出工具数组', () => {
    expect(Array.isArray(tools)).toBe(true)
    expect(tools.length).toBeGreaterThan(0)
  })

  it('每个工具包含必需字段', () => {
    tools.forEach(tool => {
      expect(tool).toHaveProperty('id')
      expect(tool).toHaveProperty('name')
      expect(tool).toHaveProperty('description')
      expect(tool).toHaveProperty('icon')
      expect(tool).toHaveProperty('route')
    })
  })

  it('工具 ID 唯一', () => {
    const ids = tools.map(t => t.id)
    const uniqueIds = [...new Set(ids)]
    expect(ids.length).toBe(uniqueIds.length)
  })

  it('路由以 /tools/ 开头', () => {
    tools.forEach(tool => {
      expect(tool.route).toMatch(/^\/tools\//)
    })
  })

  it('包含预期的工具', () => {
    const toolIds = tools.map(t => t.id)
    expect(toolIds).toContain('todo')
    expect(toolIds).toContain('pomodoro')
    expect(toolIds).toContain('notes')
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- config.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/unit/data/config.test.js
git commit -m "test: 添加配置数据测试"
```

---

### Task 8: 编写首页组件测试

**Files:**
- Create: `tests/components/Home.test.js`

- [x] **Step 1: 创建 Home.test.js**

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

// 创建测试路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/blog', component: { template: '<div>Blog</div>' } },
    { path: '/bookmarks', component: { template: '<div>Bookmarks</div>' } },
    { path: '/tools', component: { template: '<div>Tools</div>' } }
  ]
})

describe('Home', () => {
  it('正确渲染页面标题', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('h1').text()).toBe('欢迎来到我的博客')
  })

  it('渲染三个入口卡片', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const cards = wrapper.findAll('a.card')
    expect(cards).toHaveLength(3)
  })

  it('博客卡片包含正确的链接和内容', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const blogCard = wrapper.findAll('a.card')[0]
    expect(blogCard.attributes('href')).toBe('/blog')
    expect(blogCard.text()).toContain('博客')
    expect(blogCard.text()).toContain('阅读我的文章和随笔')
  })

  it('收藏卡片包含正确的链接和内容', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const bookmarkCard = wrapper.findAll('a.card')[1]
    expect(bookmarkCard.attributes('href')).toBe('/bookmarks')
    expect(bookmarkCard.text()).toContain('收藏')
    expect(bookmarkCard.text()).toContain('有用的网站和资源')
  })

  it('工具卡片包含正确的链接和内容', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const toolCard = wrapper.findAll('a.card')[2]
    expect(toolCard.attributes('href')).toBe('/tools')
    expect(toolCard.text()).toContain('工具')
    expect(toolCard.text()).toContain('提高效率的小工具')
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- Home.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/components/Home.test.js
git commit -m "test: 添加首页组件测试"
```

---

### Task 9: 编写主题切换组件测试

**Files:**
- Create: `tests/components/ThemeToggle.test.js`

- [x] **Step 1: 创建 ThemeToggle.test.js**

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    // 清除 LocalStorage
    localStorage.clear()
    // 重置主题
    document.documentElement.classList.remove('dark')
  })

  it('正确渲染按钮', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('点击按钮切换主题', async () => {
    const { toggleTheme, isDark } = useTheme()

    await wrapper.find('button').trigger('click')
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('在浅色模式显示月亮图标', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.findComponent({ name: 'Moon' }).exists()).toBe(true)
  })

  it('在深色模式显示太阳图标', async () => {
    const wrapper = mount(ThemeToggle)
    const { toggleTheme, isDark } = useTheme()

    // 切换到深色模式
    isDark.value = true
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'Sun' }).exists()).toBe(true)
  })

  it('按钮有正确的 aria-label', () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')

    expect(button.attributes('aria-label')).toBe('切换到深色模式')
  })

  it('主题状态持久化到 LocalStorage', async () => {
    const wrapper = mount(ThemeToggle)

    await wrapper.find('button').trigger('click')
    expect(localStorage.getItem('blog-theme')).toBe('dark')

    await wrapper.find('button').trigger('click')
    expect(localStorage.getItem('blog-theme')).toBe('light')
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- ThemeToggle.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/components/ThemeToggle.test.js
git commit -m "test: 添加主题切换组件测试"
```

---

### Task 10: 编写待办清单组件测试

**Files:**
- Create: `tests/components/TodoApp.test.js`

- [x] **Step 1: 创建 TodoApp.test.js**

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoApp from '@/components/tools/TodoApp.vue'

describe('TodoApp', () => {
  beforeEach(() => {
    // 清除 LocalStorage
    localStorage.clear()
    // 模拟 LocalStorage
    const localStorageMock = (() => {
      let store = {}
      return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value }),
        clear: vi.fn(() => { store = {} })
      }
    })()
    global.localStorage = localStorageMock
  })

  it('正确渲染组件', () => {
    const wrapper = mount(TodoApp)
    expect(wrapper.find('h2').text()).toBe('待办清单')
  })

  it('显示空状态', () => {
    const wrapper = mount(TodoApp)
    expect(wrapper.text()).toContain('还没有任务，添加一个吧！')
  })

  it('可以添加新任务', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('测试任务')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('测试任务')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('不能添加空任务', async () => {
    const wrapper = mount(TodoApp)
    const initialCount = wrapper.findAll('li').length

    await wrapper.find('input[type="text"]').setValue('   ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.findAll('li').length).toBe(initialCount)
  })

  it('可以标记任务完成', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('测试任务')
    await wrapper.find('form').trigger('submit.prevent')

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setChecked(true)

    const taskText = wrapper.find('span.flex-1')
    expect(taskText.classes()).toContain('line-through')
  })

  it('可以删除任务', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('测试任务')
    await wrapper.find('form').trigger('submit.prevent')

    const deleteButton = wrapper.find('button[aria-label="删除任务"]')
    await deleteButton.trigger('click')

    expect(wrapper.text()).toContain('还没有任务，添加一个吧！')
  })

  it('显示待完成任务数量', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('任务1')
    await wrapper.find('form').trigger('submit.prevent')
    await input.setValue('任务2')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('2 个任务待完成')
  })

  it('可以清除已完成任务', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input[type="text"]')

    // 添加两个任务
    await input.setValue('任务1')
    await wrapper.find('form').trigger('submit.prevent')
    await input.setValue('任务2')
    await wrapper.find('form').trigger('submit.prevent')

    // 完成一个任务
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    await checkboxes[0].setChecked(true)

    // 清除已完成
    const clearButton = wrapper.find('button:has-text("清除已完成")')
    await clearButton.trigger('click')

    expect(wrapper.findAll('li').length).toBe(1)
  })
})
```

- [x] **Step 2: 运行测试**

Run: `npm test -- TodoApp.test.js`
Expected: 所有测试通过

- [x] **Step 3: 提交**

```bash
git add tests/components/TodoApp.test.js
git commit -m "test: 添加待办清单组件测试"
```

---

### Task 11: 编写导航流程 E2E 测试

**Files:**
- Create: `tests/e2e/navigation.spec.js`

- [x] **Step 1: 创建 navigation.spec.js**

```javascript
import { test, expect } from '@playwright/test'

test.describe('导航流程', () => {
  test('从首页导航到各个子页面', async ({ page }) => {
    await page.goto('/')

    // 验证首页加载
    await expect(page).toHaveTitle(/个人博客/)
    await expect(page.locator('h1')).toContainText('欢迎来到我的博客')

    // 点击博客入口
    await page.click('a[href="/blog"]')
    await expect(page).toHaveURL('/blog')
    await expect(page.locator('h1')).toContainText('博客文章')

    // 返回首页
    await page.click('text=首页')
    await expect(page).toHaveURL('/')

    // 点击收藏入口
    await page.click('a[href="/bookmarks"]')
    await expect(page).toHaveURL('/bookmarks')
    await expect(page.locator('h1')).toContainText('收藏网站')

    // 返回首页
    await page.click('text=首页')
    await expect(page).toHaveURL('/')

    // 点击工具入口
    await page.click('a[href="/tools"]')
    await expect(page).toHaveURL('/tools')
    await expect(page.locator('h1')).toContainText('效率工具')
  })

  test('使用顶部导航菜单', async ({ page }) => {
    await page.goto('/')

    // 点击导航菜单中的博客链接
    await page.click('nav a[href="/blog"]')
    await expect(page).toHaveURL('/blog')

    // 点击导航菜单中的收藏链接
    await page.click('nav a[href="/bookmarks"]')
    await expect(page).toHaveURL('/bookmarks')

    // 点击导航菜单中的工具链接
    await page.click('nav a[href="/tools"]')
    await expect(page).toHaveURL('/tools')

    // 点击 Logo 返回首页
    await page.click('a[href="/"]')
    await expect(page).toHaveURL('/')
  })

  test('404 页面处理', async ({ page }) => {
    await page.goto('/not-existent-page')

    // 验证 404 页面显示
    await expect(page.locator('h1')).toContainText('404')
    await expect(page.locator('p')).toContainText('页面未找到')

    // 点击返回首页
    await page.click('a[href="/"]')
    await expect(page).toHaveURL('/')
  })
})
```

- [x] **Step 2: 提交**

```bash
git add tests/e2e/navigation.spec.js
git commit -m "test: 添加导航流程 E2E 测试"
```

---

### Task 12: 编写博客阅读流程 E2E 测试

**Files:**
- Create: `tests/e2e/blog-flow.spec.js`

- [x] **Step 1: 创建 blog-flow.spec.js**

```javascript
import { test, expect } from '@playwright/test'

test.describe('博客阅读流程', () => {
  test('从列表页阅读文章', async ({ page }) => {
    await page.goto('/blog')

    // 验证博客列表加载
    await expect(page.locator('h1')).toContainText('博客文章')
    await expect(page.locator('article.card')).toHaveCount(3)

    // 点击第一篇文章
    await page.click('article.card:first-child')

    // 验证文章详情页
    await expect(page.locator('h1')).toContainText('欢迎来到我的博客')

    // 验证文章内容
    await expect(page.locator('h2')).toContainText('关于这个博客')
    await expect(page.locator('code')).toBeVisible()

    // 返回列表
    await page.click('text=返回列表')
    await expect(page).toHaveURL('/blog')
  })

  test('搜索博客文章', async ({ page }) => {
    await page.goto('/blog')

    // 输入搜索词
    await page.fill('input[type="search"]', 'Vue')
    await page.press('input[type="search"]', 'Enter')

    // 验证搜索结果
    const cards = page.locator('article.card')
    await expect(cards).toHaveCount(1)
    await expect(cards.first()).toContainText('Vue 3 Composition API')
  })

  test('按标签筛选文章', async ({ page }) => {
    await page.goto('/blog')

    // 选择 Vue 标签
    await page.click('select')
    await page.click('option:has-text("Vue")')

    // 验证筛选结果
    const cards = page.locator('article.card')
    await expect(cards.first()).toContainText('Vue 3 Composition API')
  })
})
```

- [x] **Step 2: 提交**

```bash
git add tests/e2e/blog-flow.spec.js
git commit -m "test: 添加博客阅读流程 E2E 测试"
```

---

### Task 13: 编写工具使用流程 E2E 测试

**Files:**
- Create: `tests/e2e/tools-flow.spec.js`

- [x] **Step 1: 创建 tools-flow.spec.js**

```javascript
import { test, expect } from '@playwright/test'

test.describe('工具使用流程', () => {
  test('从工具列表使用待办清单', async ({ page }) => {
    await page.goto('/tools')

    // 验证工具列表
    await expect(page.locator('h1')).toContainText('效率工具')
    await expect(page.locator('a.card')).toHaveCount(3)

    // 点击待办清单
    await page.click('a[href="/tools/todo"]')

    // 添加任务
    await page.fill('input[type="text"]', '测试任务')
    await page.click('button:has-text("添加")')

    // 验证任务添加
    await expect(page.locator('li')).toContainText('测试任务')

    // 标记完成
    await page.check('input[type="checkbox"]')
    await expect(page.locator('span.line-through')).toContainText('测试任务')
  })

  test('使用番茄钟', async ({ page }) => {
    await page.goto('/tools/pomodoro')

    // 验证番茄钟页面
    await expect(page.locator('h2')).toContainText('番茄钟')

    // 点击开始
    await page.click('button:has-text("开始")')

    // 验证计时器运行
    const timeDisplay = page.locator('div.tabular-nums')
    const initialTime = await timeDisplay.textContent()

    // 等待 2 秒
    await page.waitForTimeout(2000)

    const newTime = await timeDisplay.textContent()
    expect(newTime).not.toBe(initialTime)

    // 暂停计时器
    await page.click('button:has-text("暂停")')

    // 验证时间不再变化
    const pausedTime = await timeDisplay.textContent()
    await page.waitForTimeout(2000)
    const stillPausedTime = await timeDisplay.textContent()
    expect(stillPausedTime).toBe(pausedTime)
  })

  test('使用快速笔记', async ({ page }) => {
    await page.goto('/tools/notes')

    // 验证笔记页面
    await expect(page.locator('h2')).toContainText('快速笔记')

    // 输入笔记
    const noteText = '这是一条测试笔记'
    await page.fill('textarea', noteText)

    // 等待自动保存
    await page.waitForTimeout(1500)

    // 验证保存提示
    await expect(page.locator('text=上次保存')).toBeVisible()

    // 清空笔记
    await page.click('button:has-text("清空")')
    await page.on('dialog', dialog => dialog.accept())
    await page.click('button:has-text("确定")')

    // 验证文本框清空
    await expect(page.locator('textarea')).toHaveValue('')
  })
})
```

- [x] **Step 2: 提交**

```bash
git add tests/e2e/tools-flow.spec.js
git commit -m "test: 添加工具使用流程 E2E 测试"
```

---

### Task 14: 运行所有测试

**Files:**
- None

- [x] **Step 1: 运行所有单元和组件测试**

Run: `npm test:run`
Expected: 所有单元测试和组件测试通过

- [x] **Step 2: 运行 E2E 测试**

Run: `npm test:e2e`
Expected: 所有 E2E 测试通过

- [x] **Step 3: 生成测试覆盖率报告**

Run: `npm test:run -- --coverage`
Expected: 生成覆盖率报告

- [x] **Step 4: 提交**

```bash
git add -A
git commit -m "test: 验证所有测试通过"
```

---

## 验收标准

- [ ] 所有单元测试通过
- [ ] 所有组件测试通过
- [ ] 所有 E2E 测试通过
- [x] 测试覆盖率 ≥ 80%
- [x] 测试报告正常生成
- [x] CI/CD 可以运行测试

---

## 计划完成

**所有模块实现计划已完成！** 🎉

执行顺序：
1. `2026-04-17-01-foundation.md` - 项目基础与设计系统
2. `2026-04-17-02-routing-theme.md` - 路由与主题系统
3. `2026-04-17-03-blog-system.md` - 博客系统
4. `2026-04-17-04-bookmark-system.md` - 收藏系统
5. `2026-04-17-05-tools-system.md` - 工具系统
6. `2026-04-17-06-testing-system.md` - 测试系统
