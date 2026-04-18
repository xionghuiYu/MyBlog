# 个人博客项目

一个功能完整的个人博客和效率工具网站，使用 Vue 3 + Vite + Tailwind CSS 构建。

## 功能特性

### 📝 博客系统
- Markdown 文章渲染和语法高亮
- 文章搜索功能
- 标签分类筛选
- RSS 订阅支持

### 🔖 收藏系统
- 书签卡片展示
- 分类筛选（开发、效率、设计、学习、工具）
- 搜索功能
- 响应式布局

### 🛠️ 效率工具
- **待办清单** - 添加、完成、删除、清除已完成任务
- **番茄钟** - 25分钟专注，5分钟休息，带完成统计
- **快速笔记** - 自动保存、历史记录管理

### 🎨 用户体验
- 深色/浅色主题切换
- 响应式设计（移动端友好）
- 流畅的动画效果
- LocalStorage 数据持久化

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router 4
- **样式**: Tailwind CSS
- **Markdown**: marked
- **代码高亮**: highlight.js
- **图标**: Lucide Vue Next
- **测试**: Vitest + Playwright
- **搜索**: FlexSearch

## 快速开始

### 克隆项目

```bash
git clone <repository-url>
cd personal-blog
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/          # Vue 组件
│   ├── common/        # 通用组件（Header、Footer、NavMenu、ThemeToggle）
│   ├── blog/          # 博客相关组件
│   │   ├── BlogList.vue
│   │   ├── BlogDetail.vue
│   │   └── BlogCard.vue
│   └── tools/         # 效率工具组件
│       ├── TodoApp.vue
│       ├── PomodoroTimer.vue
│       ├── QuickNotes.vue
│       ├── ToolCard.vue
│       └── ToolList.vue
├── pages/             # 页面组件
├── router/            # 路由配置
├── utils/             # 工具函数
│   ├── markdown.js    # Markdown 渲染
│   ├── date.js        # 日期格式化
│   └── fetch.js       # 数据获取
├── data/              # 配置数据
│   └── config.js      # 工具配置
│   └── bookmarks.json # 书签数据
└── styles/            # 样式文件
public/
└── posts/             # 博客文章（Markdown）
```

## 部署

### 🚀 快速部署

#### Vercel 部署（推荐）

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
vercel
```

#### GitHub Pages 部署

1. 构建
```bash
npm run build
```

2. 部署到 gh-pages
```bash
npm install -g gh-pages
gh-pages -d dist
```

### 📦 预览

- **在线预览**: [查看部署版本](https://xionghuiyu.github.io/MyBlog/)
- **RSS 订阅**: [RSS Feed](./rss.xml)

### 📱 本地预览

查看本地预览版本：`deploy-preview.html`

## 开发状态

### ✅ 已完成模块

- [x] **项目基础与设计系统** - Vue 3 + Vite 项目架构，设计系统，主题切换
- [x] **路由与主题系统** - Vue Router 配置，深色/浅色主题
- [x] **博客系统** - Markdown 渲染，搜索，标签筛选，RSS 生成
- [x] **收藏系统** - 书签管理，分类筛选，搜索功能
- [x] **工具系统** - 待办清单、番茄钟、快速笔记
- [x] **测试系统** - Vitest + Playwright 配置

### 🗓️ 实现详情

项目按照计划文档逐步实现，每个模块都有详细的实现记录：
- `docs/superpowers/plans/` - 各模块的实现计划
- 包含完整的单元测试和 E2E 测试配置

## 脚本命令

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产版本

# 测试
npm test             # 运行单元测试
npm run test:run     # 运行测试一次
npm run test:ui      # 运行测试 UI
npm run test:e2e     # 运行 E2E 测试

# 其他
npm run generate:rss # 生成 RSS 订阅
```

## 项目地址

- **GitHub**: [xionghuiYu/MyBlog](https://github.com/xionghuiYu/MyBlog)
- **预览**: [https://xionghuiyu.github.io/MyBlog/](https://xionghuiyu.github.io/MyBlog/)

## 许可证

MIT License