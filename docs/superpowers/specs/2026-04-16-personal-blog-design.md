# 个人博客网站设计文档

## 项目概述

构建一个简洁美丽的个人博客网站，用于分享生活日常、记录点滴，同时展示收藏的有用网站。网站采用卡片式布局，现代感强，且易于扩展以支持未来的效率小工具。

**项目路径：** `/Blog`

**创建日期：** 2026-04-16

---

## 1. 技术栈

| 技术 | 用途 | 理由 |
|------|------|------|
| Vite | 构建工具 | 开发体验好，启动快，热更新快 |
| Vue 3 (Composition API) | 前端框架 | 组件化开发，易于扩展小工具 |
| Vue Router | 路由管理 | 单页应用路由 |
| Tailwind CSS | 样式框架 | 快速开发，内置响应式，支持深色模式 |
| Lucide Vue | 图标库 | SVG 图标，风格统一，支持主题 |
| Markdown | 博客格式 | 易于编写，广泛支持 |
| marked | Markdown 解析器 | 轻量、快速、广泛支持 |
| highlight.js | 代码高亮 | 多语言支持、主题丰富 |
| Vitest | 单元/组件测试 | Vue 3 生态原生支持，速度快 |
| Playwright | E2E 测试 | 跨浏览器、API 稳定 |
| Vercel / GitHub Pages | 部署平台 | 自动部署，免费托管，全球 CDN |

---

## 2. 项目结构

```
Blog/
├── public/                    # 静态资源
│   ├── favicon.ico
│   ├── images/               # 图片资源
│   └── posts/                # Markdown 博客文件（静态资源）
│       └── *.md
├── src/
│   ├── components/            # Vue 组件
│   │   ├── common/           # 通用组件
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   ├── ThemeToggle.vue
│   │   │   └── NavMenu.vue
│   │   ├── blog/             # 博客相关组件
│   │   │   ├── BlogCard.vue
│   │   │   ├── BlogList.vue
│   │   │   └── BlogDetail.vue
│   │   ├── bookmarks/        # 收藏相关组件
│   │   │   ├── BookmarkCard.vue
│   │   │   ├── BookmarkList.vue
│   │   │   └── CategoryFilter.vue
│   │   ├── tools/            # 工具相关组件
│   │   │   ├── ToolCard.vue
│   │   │   ├── ToolList.vue
│   │   │   ├── TodoApp.vue   # 待办清单工具
│   │   │   ├── PomodoroTimer.vue  # 番茄钟工具
│   │   │   └── QuickNotes.vue     # 快速笔记工具
│   │   └── ui/               # UI 基础组件
│   │       ├── Button.vue
│   │       ├── Input.vue
│   │       ├── Card.vue
│   │       └── Loading.vue
│   ├── data/                 # 数据文件（配置，热更新）
│   │   ├── bookmarks.json    # 收藏网站数据
│   │   └── config.js         # 工具配置（硬编码）
│   ├── pages/                # 页面组件
│   │   ├── Home.vue
│   │   ├── Blog.vue
│   │   ├── BlogDetail.vue
│   │   ├── Bookmarks.vue
│   │   ├── Tools.vue
│   │   ├── TodoTool.vue      # 待办清单页面
│   │   ├── PomodoroTool.vue  # 番茄钟页面
│   │   └── NotesTool.vue     # 快速笔记页面
│   ├── router/               # 路由配置
│   │   └── index.js
│   ├── stores/               # 状态管理
│   │   └── theme.js
│   ├── utils/                # 工具函数
│   │   ├── markdown.js
│   │   ├── date.js
│   │   └── fetch.js
│   ├── App.vue
│   └── main.js
├── tests/
│   ├── unit/                 # 单元测试
│   ├── components/           # 组件测试
│   └── e2e/                  # E2E 测试
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vitest.config.js          # Vitest 配置
├── playwright.config.ts      # Playwright 配置
└── README.md
```

---

## 3. 页面结构与路由

| 路径 | 页面 | 功能 | 说明 |
|------|------|------|------|
| `/` | 首页 | 分类入口卡片 | 三个主要入口：博客、收藏、工具 |
| `/blog` | 博客列表 | 文章列表展示 | 按时间倒序，支持标签筛选 |
| `/blog/:slug` | 博客详情 | 单篇文章渲染 | Markdown 渲染，返回列表 |
| `/bookmarks` | 收藏网站 | 链接卡片展示 | 按分类筛选，搜索功能 |
| `/tools` | 效率工具 | 工具列表 | 网格布局展示所有可用工具 |
| `/tools/todo` | 待办清单 | 任务管理工具 | 硬编码路由，TodoApp 组件 |
| `/tools/pomodoro` | 番茄钟 | 专注计时器 | 硬编码路由，PomodoroTimer 组件 |
| `/tools/notes` | 快速笔记 | 轻量笔记工具 | 硬编码路由，QuickNotes 组件 |

---

## 4. 数据结构

### 4.1 博客文章 (Markdown)

文件位置：`public/posts/*.md`（静态资源，可直接通过 fetch 读取）

```markdown
---
title: "文章标题"
date: "2026-04-14"
tags: ["生活", "户外"]
summary: "文章摘要，用于列表展示"
---

文章正文内容，支持标准 Markdown 语法。
```

### 4.2 收藏网站 (bookmarks.json)

文件位置：`src/data/bookmarks.json`

```json
{
  "bookmarks": [
    {
      "id": "b1",
      "title": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "category": "开发",
      "description": "Web 开发权威文档"
    }
  ],
  "categories": ["开发", "效率", "设计", "学习"]
}
```

### 4.3 工具配置 (config.js)

文件位置：`src/data/config.js`

```javascript
export const tools = [
  {
    id: 'todo',
    name: '待办清单',
    description: '简单的任务管理工具',
    icon: 'check-square',
    route: '/tools/todo'
  },
  {
    id: 'pomodoro',
    name: '番茄钟',
    description: '专注计时器',
    icon: 'timer',
    route: '/tools/pomodoro'
  },
  {
    id: 'notes',
    name: '快速笔记',
    description: '轻量笔记工具',
    icon: 'file-text',
    route: '/tools/notes'
  }
]
```

---

## 5. 设计系统

### 5.1 色彩

基于 UI UX Pro Max 生成的设计系统：

| 角色 | Hex | CSS 变量 | 用途 |
|------|-----|----------|------|
| Primary | `#18181B` | `--color-primary` | 主要文字、按钮 |
| Secondary | `#3F3F46` | `--color-secondary` | 次要文字 |
| Accent | `#2563EB` | `--color-accent` | 强调色、链接、交互 |
| Background | `#FAFAFA` | `--color-background` | 页面背景（浅色） |
| Foreground | `#09090B` | `--color-foreground` | 前景色（浅色） |
| Muted | `#E8ECF0` | `--color-muted` | 卡片背景、占位 |
| Border | `#E4E4E7` | `--color-border` | 边框、分隔线 |
| Destructive | `#DC2626` | `--color-destructive` | 危险操作 |

**深色模式覆盖：**
- Background: `#09090B`
- Foreground: `#FAFAFA`
- Muted: `#27272A`
- Border: `#27272A`
- Accent: `#3B82F6`

### 5.2 排版

- **标题字体：** Archivo (Google Fonts)
- **正文字体：** Space Grotesk (Google Fonts)
- **字重：** 300, 400, 500, 600, 700
- **行高：** 正文 1.6
- **字号比例：** 12 / 14 / 16 / 18 / 24 / 32 / 48px

**字体加载优化：**
- 使用 Google Fonts 子集化 API（subset=latin,latin-ext）
- 预加载关键字体（wght@400;600 用于标题和正文）
- `font-display: swap` 防止阻塞渲染

```css
/* 在 index.html 中预加载关键字体 */
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Space+Grotesk:wght@400;500&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&subset=latin,latin-ext&display=swap" rel="stylesheet">
```

### 5.3 间距系统

基于 4px 基准：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px

### 5.4 圆角

- 卡片：12px
- 按钮：8px
- 输入框：8px
- 小元素：4px

### 5.5 动画

- 微交互：150-300ms
- 页面过渡：300-400ms
- 缓动函数：`cubic-bezier(0.4, 0, 0.2, 1)`
- 支持 `prefers-reduced-motion`

---

## 6. 核心功能

### 6.1 首页（分类入口）

- 三个大卡片：博客、收藏、工具
- 每个卡片显示：图标、名称、描述、数量
- 悬停效果：上移 + 阴影
- 响应式：移动端单列，桌面端三列

### 6.2 博客系统

- **列表页：** 卡片式展示，按时间倒序
- **详情页：** Markdown 渲染，支持代码高亮
- **标签系统：** 文章标签展示和筛选
- **搜索：** 按标题和内容搜索

### 6.3 收藏系统

- 卡片式展示链接
- 按分类筛选
- 搜索功能
- 悬停显示完整 URL

### 6.4 工具系统

- **硬编码路由：** 每个工具有独立路由和页面组件
- **工具扩展：** 添加新工具需要：1) 创建工具组件，2) 在 router 中添加路由，3) 在 config.js 中注册
- **工具列表：** 从 config.js 读取工具配置，网格布局展示

---

## 7. 扩展性设计

### 7.1 工具扩展流程

添加新工具需要四步：

1. **创建组件：** 在 `src/components/tools/` 创建 Vue 组件
2. **创建页面：** 在 `src/pages/` 创建工具页面组件
3. **添加路由：** 在 `src/router/index.js` 添加路由
4. **注册配置：** 在 `src/data/config.js` 添加工具配置

### 7.2 组件化架构

- 通用组件可复用（Button、Input、Card、Loading）
- 工具组件独立封装
- 通过 props 和 emit 通信
- 支持组合式 API 逻辑复用

### 7.3 数据驱动

- 博客内容与展示分离（Markdown 文件）
- 收藏和工具配置集中管理（config.js）
- 数据文件版本控制
- 易于迁移和备份

---

## 8. 错误处理

### 8.1 数据加载失败

- 显示友好的错误信息
- 提供重试按钮
- 降级显示占位内容

### 8.2 路由未找到

- 404 页面
- 提供返回首页的链接
- 建议相关内容

### 8.3 边界情况

- **空状态：** 引导性提示
- **网络慢：** Skeleton 加载
- **图片失败：** 占位图

---

## 9. 性能优化

### 9.1 代码分割

- 路由级别懒加载
- 非关键库按需加载（highlight.js 按语言）

### 9.2 资源优化

- 图片：WebP 格式 + srcset（使用 vite-plugin-imagemin）
- 字体：font-display: swap，预加载关键字体
- CSS：关键样式内联，Tailwind CSS 按需生成

### 9.3 缓存策略

- 静态资源：强缓存（1年）
- Markdown 文件：协商缓存（内容版本控制）
- HTML：短缓存（1小时）

### 9.4 Core Web Vitals 目标

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## 10. 测试策略

**测试框架：**
- 单元/组件测试：Vitest（Vue 3 生态原生支持）
- E2E 测试：Playwright（跨浏览器、API 稳定）

### 10.1 单元测试

**测试文件位置：** `tests/unit/`

**测试覆盖：**
- `utils/markdown.test.js` — Frontmatter 解析、Markdown 渲染（marked）、代码高亮（highlight.js）
- `utils/date.test.js` — 日期格式转换（ISO → 显示格式）
- `utils/fetch.test.js` — fetch Posts API、错误处理
- `data/config.test.js` — 工具配置数据验证

### 10.2 组件测试

**测试文件位置：** `tests/components/`

**测试覆盖：**
- `Home.test.js` — 首页三个入口卡片渲染、点击跳转
- `BlogList.test.js` — 博客列表渲染、时间排序、标签筛选
- `BlogDetail.test.js` — 博客详情渲染、Markdown 内容、返回导航
- `Bookmarks.test.js` — 收藏列表渲染、分类筛选、搜索功能
- `Tools.test.js` — 工具列表渲染、工具卡片点击
- `ThemeToggle.test.js` — 深色模式切换、主题持久化（LocalStorage）
- `TodoTool.test.js` — 待办清单工具核心逻辑
- `PomodoroTool.test.js` — 番茄钟计时器逻辑
- `NotesTool.test.js` — 快速笔记保存/加载逻辑

### 10.3 E2E 测试

**测试文件位置：** `tests/e2e/`

**测试覆盖：**
- `navigation.spec.js` — 完整导航流程（首页 → 各子页面 → 返回）
- `blog-flow.spec.js` — 阅读博客完整流程（列表 → 详情 → 返回）
- `tools-flow.spec.js` — 工具使用流程（列表 → 工具页 → 功能验证）
- `responsive.spec.js` — 移动端/平板/桌面响应式布局验证

---

## 11. 部署方案

### 11.1 推荐方案：Vercel

- 连接 GitHub 仓库自动部署
- 每次提交自动构建
- 免费 SSL 证书
- 全球 CDN 加速

### 11.2 备选方案：GitHub Pages

- 完全免费
- 静态站点托管
- 通过 GitHub Actions 自动部署

---

## 12. 开发工作流

### 12.1 Git 分支策略

- `main` - 主分支（单分支策略，个人博客无需复杂分支）

### 12.2 内容更新流程

1. 本地编辑 Markdown 文件（`public/posts/`）
2. 提交并推送到 GitHub
3. 自动触发部署
4. 几分钟后线上更新

### 12.3 工具开发流程

1. 在 `main` 分支上创建工具组件和页面
2. 在 `src/router/index.js` 添加路由
3. 在 `src/data/config.js` 注册工具
4. 本地测试
5. 提交并推送
6. 自动部署到线上

---

## 13. 无障碍与响应式

### 13.1 无障碍

- 键盘导航支持
- ARIA 标签
- 对比度 ≥ 4.5:1
- 焦点指示器
- 屏幕阅读器友好

### 13.2 响应式断点

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 13.3 设备支持

- iOS Safari
- Android Chrome
- Desktop Chrome/Firefox/Safari/Edge

---

## 14. 安全考虑

- 不存储敏感信息
- 输入验证和转义（XSS 防护）
- HTTPS 强制（Vercel/GitHub Pages 自动提供）
- 依赖定期更新
- **注意：** 如果配置 CSP，需要允许 Google Fonts：`font-src https://fonts.gstatic.com`

---

## 15. 未来扩展方向

1. **评论系统：** 集成第三方评论服务（如 Giscus）
2. **搜索增强：** 全文搜索索引
3. **RSS 订阅：** 自动生成 RSS Feed
4. **多语言：** i18n 国际化支持
5. **PWA：** 离线支持和安装到桌面
6. **分析统计：** 集成隐私友好的分析工具

---

## 16. 验收标准

### 16.1 功能验收

- [ ] 首页三个入口卡片正常显示
- [ ] 博客列表和详情页正常工作（Markdown 渲染、代码高亮）
- [ ] 收藏列表按分类筛选、搜索功能正常
- [ ] 工具列表和三个工具页面（待办清单、番茄钟、快速笔记）正常
- [ ] 深色模式切换正常
- [ ] 响应式布局在所有断点正常

### 16.2 性能验收

- [ ] Lighthouse 性能分数 ≥ 90
- [ ] 首次内容绘制 < 1.5s
- [ ] 交互时间 < 100ms
- [ ] 累积布局偏移 < 0.1

### 16.3 质量验收

- [ ] 无控制台错误
- [ ] 无 ESLint 警告
- [ ] 通过所有测试
- [ ] 代码审查通过

---

## 附录

### A. 相关文档

- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Vue Router 文档](https://router.vuejs.org/)
- [marked 文档](https://marked.js.org/)
- [highlight.js 文档](https://highlightjs.org/)
- [Vitest 文档](https://vitest.dev/)
- [Playwright 文档](https://playwright.dev/)

### B. 设计资源

- 设计系统：基于 UI UX Pro Max 生成
- 图标库：Lucide Vue
- 字体：Archivo + Space Grotesk (Google Fonts)

---

**文档版本：** 1.1
**最后更新：** 2026-04-16（根据外部审查更新：简化工具系统、指定技术栈、单分支策略）
