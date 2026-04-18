# 收藏系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现收藏网站系统，包括书签列表、分类筛选、搜索功能，以卡片形式展示收藏的网站链接。

**Architecture:** 书签数据存储在 `src/data/bookmarks.json`，通过 import 直接读取（Vite 支持动态导入 JSON），组件负责展示和筛选。

**Tech Stack:** Vue 3 Composition API, JSON 数据文件, Lucide Vue Icons

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/data/bookmarks.json` | 书签数据配置 |
| `src/components/bookmarks/BookmarkCard.vue` | 书签卡片组件 |
| `src/components/bookmarks/CategoryFilter.vue` | 分类筛选组件 |
| `src/components/bookmarks/BookmarkList.vue` | 书签列表容器 |
| `src/pages/Bookmarks.vue` | 收藏页面 |

---

### Task 1: 创建书签数据配置

**Files:**
- Create: `src/data/bookmarks.json`

- [x] **Step 1: 创建 bookmarks.json**

```json
{
  "categories": ["开发", "效率", "设计", "学习", "工具"],
  "bookmarks": [
    {
      "id": "mdn",
      "title": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "category": "开发",
      "description": "Web 开发权威文档，涵盖 HTML、CSS、JavaScript 等"
    },
    {
      "id": "github",
      "title": "GitHub",
      "url": "https://github.com",
      "category": "开发",
      "description": "全球最大的代码托管平台"
    },
    {
      "id": "stackoverflow",
      "title": "Stack Overflow",
      "url": "https://stackoverflow.com",
      "category": "开发",
      "description": "开发者问答社区"
    },
    {
      "id": "notion",
      "title": "Notion",
      "url": "https://notion.so",
      "category": "效率",
      "description": "一体化工作空间，笔记、任务、文档管理"
    },
    {
      "id": "figma",
      "title": "Figma",
      "url": "https://figma.com",
      "category": "设计",
      "description": "在线协作设计工具"
    },
    {
      "id": "dribbble",
      "title": "Dribbble",
      "url": "https://dribbble.com",
      "category": "设计",
      "description": "设计师灵感社区"
    },
    {
      "id": "coursera",
      "title": "Coursera",
      "url": "https://coursera.org",
      "category": "学习",
      "description": "在线课程平台，与顶尖大学合作"
    },
    {
      "id": "khan-academy",
      "title": "Khan Academy",
      "url": "https://khanacademy.org",
      "category": "学习",
      "description": "免费在线教育平台"
    },
    {
      "id": "chatgpt",
      "title": "ChatGPT",
      "url": "https://chat.openai.com",
      "category": "工具",
      "description": "OpenAI 的 AI 聊天助手"
    },
    {
      "id": "canva",
      "title": "Canva",
      "url": "https://canva.com",
      "category": "设计",
      "description": "在线设计工具，简单易用"
    },
    {
      "id": "vercel",
      "title": "Vercel",
      "url": "https://vercel.com",
      "category": "开发",
      "description": "前端应用部署平台"
    },
    {
      "id": "youtube",
      "title": "YouTube",
      "url": "https://youtube.com",
      "category": "学习",
      "description": "视频分享平台，丰富的学习资源"
    }
  ]
}
```

- [x] **Step 2: 提交**

```bash
git add src/data/bookmarks.json
git commit -m "chore: 创建书签数据配置"
```

---

### Task 2: 创建 BookmarkCard 组件

**Files:**
- Create: `src/components/bookmarks/BookmarkCard.vue`

- [x] **Step 1: 创建 BookmarkCard.vue**

```vue
<template>
  <a
    :href="bookmark.url"
    target="_blank"
    rel="noopener noreferrer"
    class="card p-5 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 group block"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
        <ExternalLink class="w-5 h-5 text-accent" />
      </div>
      <span class="text-xs px-2 py-1 bg-muted text-secondary rounded-full">
        {{ bookmark.category }}
      </span>
    </div>

    <h3 class="font-display text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
      {{ bookmark.title }}
    </h3>

    <p class="text-secondary text-sm mb-3 line-clamp-2">
      {{ bookmark.description }}
    </p>

    <div class="text-xs text-secondary/70 flex items-center">
      <Globe class="w-3 h-3 mr-1" />
      <span class="truncate">{{ bookmark.url }}</span>
    </div>
  </a>
</template>

<script setup>
import { ExternalLink, Globe } from 'lucide-vue-next'

const props = defineProps({
  bookmark: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
```

- [x] **Step 2: 提交**

```bash
git add src/components/bookmarks/BookmarkCard.vue
git commit -m "feat: 创建 BookmarkCard 组件"
```

---

### Task 3: 创建 CategoryFilter 组件

**Files:**
- Create: `src/components/bookmarks/CategoryFilter.vue`

- [x] **Step 1: 创建 CategoryFilter.vue**

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('filter', category)"
      class="px-4 py-2 rounded-button text-sm font-medium transition-all duration-200"
      :class="selectedCategory === category
        ? 'bg-accent text-white'
        : 'bg-muted text-secondary hover:bg-secondary'"
    >
      {{ category === '' ? '全部' : category }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    default: ''
  }
})

defineEmits(['filter'])
</script>
```

- [x] **Step 2: 提交**

```bash
git add src/components/bookmarks/CategoryFilter.vue
git commit -m "feat: 创建 CategoryFilter 组件"
```

---

### Task 4: 创建 BookmarkList 组件

**Files:**
- Create: `src/components/bookmarks/BookmarkList.vue`

- [x] **Step 1: 创建 BookmarkList.vue**

```vue
<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold text-primary mb-2">收藏网站</h1>
      <p class="text-secondary mb-6">有用的资源和工具</p>

      <div class="mb-6">
        <CategoryFilter
          :categories="['', ...categories]"
          :selected-category="selectedCategory"
          @filter="selectedCategory = $event"
        />
      </div>

      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="搜索收藏..."
          class="w-full px-4 py-2 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>
    </div>

    <div v-if="filteredBookmarks.length === 0" class="text-center py-12">
      <Bookmark class="w-12 h-12 text-muted mx-auto mb-4" />
      <p class="text-secondary">没有找到相关收藏</p>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <BookmarkCard
        v-for="bookmark in filteredBookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
      />
    </div>

    <div v-if="filteredBookmarks.length > 0" class="mt-6 text-center text-sm text-secondary">
      共找到 {{ filteredBookmarks.length }} 个收藏
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import bookmarksData from '../../data/bookmarks.json'
import BookmarkCard from './BookmarkCard.vue'
import CategoryFilter from './CategoryFilter.vue'
import { Bookmark } from 'lucide-vue-next'

const categories = bookmarksData.categories
const bookmarks = bookmarksData.bookmarks

const selectedCategory = ref('')
const searchQuery = ref('')

const filteredBookmarks = computed(() => {
  let result = bookmarks

  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(b => b.category === selectedCategory.value)
  }

  // 按搜索词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.description.toLowerCase().includes(query) ||
      b.url.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query)
    )
  }

  return result
})
</script>
```

- [x] **Step 2: 提交**

```bash
git add src/components/bookmarks/BookmarkList.vue
git commit -m "feat: 创建 BookmarkList 组件"
```

---

### Task 5: 创建收藏页面

**Files:**
- Create: `src/pages/Bookmarks.vue`

- [x] **Step 1: 创建 Bookmarks.vue**

```vue
<template>
  <div class="min-h-screen">
    <section class="py-12">
      <BookmarkList />
    </section>
  </div>
</template>

<script setup>
import BookmarkList from '../components/bookmarks/BookmarkList.vue'
</script>
```

- [x] **Step 2: 提交**

```bash
git add src/pages/Bookmarks.vue
git commit -m "feat: 创建收藏页面"
```

---

### Task 6: 更新路由配置

**Files:**
- Modify: `src/router/index.js`

- [x] **Step 1: 修改 router/index.js 添加收藏路由**

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Blog from '../pages/Blog.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import Bookmarks from '../pages/Bookmarks.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetail
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: Bookmarks
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
```

- [x] **Step 2: 提交**

```bash
git add src/router/index.js
git commit -m "chore: 添加收藏路由"
```

---

### Task 7: 验证收藏功能

**Files:**
- None

- [x] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器在 http://localhost:3000 启动

- [x] **Step 2: 验证功能**

- [x] 访问 /bookmarks 显示所有收藏
- [x] 分类筛选按钮正常工作
- [x] 搜索功能正常工作
- [x] 点击书签卡片在新标签页打开链接
- [x] 悬停效果正常
- [x] 响应式布局正常
- [x] 显示收藏数量

- [x] **Step 3: 提交**

```bash
git add -A
git commit -m "test: 验证收藏功能"
```

---

## 验收标准

- [x] 收藏列表正确显示所有书签
- [x] 分类筛选功能正常
- [x] 搜索功能按标题、描述、URL、分类搜索
- [x] 点击书签在新标签页打开链接
- [x] 卡片悬停效果正常
- [x] 响应式布局正常（移动端单列，桌面端多列）
- [x] 显示筛选结果数量

---

## 下一步

完成本模块后，继续执行 **2026-04-17-05-tools-system.md**（工具系统）
