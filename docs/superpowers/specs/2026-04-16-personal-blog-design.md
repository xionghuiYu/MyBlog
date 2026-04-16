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
| Vue Router | 路由管理 | 单页应用路由，支持动态导入 |
| Tailwind CSS | 样式框架 | 快速开发，内置响应式，支持深色模式 |
| Lucide Vue | 图标库 | SVG 图标，风格统一，支持主题 |
| Markdown | 博客格式 | 易于编写，广泛支持 |
| Vercel / GitHub Pages | 部署平台 | 自动部署，免费托管，全球 CDN |

---

## 2. 项目结构

```
Blog/
├── public/                    # 静态资源
│   ├── favicon.ico
│   └── images/
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
│   │   │   ├── ToolContainer.vue  # 工具容器
│   │   │   └── [tool-name]/      # 各个工具组件
│   │   └── ui/               # UI 基础组件
│   │       ├── Button.vue
│   │       ├── Input.vue
│   │       ├── Card.vue
│   │       └── Loading.vue
│   ├── data/                 # 数据文件
│   │   ├── bookmarks.json    # 收藏网站数据
│   │   └── tools.json        # 工具元数据
│   ├── posts/                # Markdown 博客文件
│   │   └── *.md
│   ├── pages/                # 页面组件
│   │   ├── Home.vue
│   │   ├── Blog.vue
│   │   ├── BlogDetail.vue
│   │   ├── Bookmarks.vue
│   │   └── Tools.vue
│   ├── router/               # 路由配置
│   │   └── index.js
│   ├── stores/               # 状态管理
│   │   ├── theme.js
│   │   └── bookmarks.js
│   ├── utils/                # 工具函数
│   │   ├── markdown.js
│   │   ├── date.js
│   │   └── validation.js
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
├── tailwind.config.js
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
| `/tools` | 效率工具 | 工具列表 | 网格布局展示所有工具 |
| `/tools/:toolName` | 单个工具 | 独立工具页面 | 动态加载工具组件 |

---

## 4. 数据结构

### 4.1 博客文章 (Markdown)

文件位置：`src/posts/*.md`

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

### 4.3 效率工具 (tools.json)

```json
{
  "tools": [
    {
      "id": "t1",
      "name": "待办清单",
      "component": "TodoApp",
      "description": "简单的任务管理工具",
      "icon": "check-square",
      "route": "todo"
    },
    {
      "id": "t2",
      "name": "番茄钟",
      "component": "PomodoroTimer",
      "description": "专注计时器",
      "icon": "timer",
      "route": "pomodoro"
    }
  ]
}
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

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
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

- **工具扩展机制：**
  1. 在 `tools.json` 注册工具信息
  2. 在 `src/components/tools/` 创建 Vue 组件
  3. 动态导入自动加载

- **工具容器：** 提供统一的工具页面框架
- **工具列表：** 网格布局展示所有可用工具

---

## 7. 扩展性设计

### 7.1 工具扩展流程

添加新工具只需三步：

1. **注册工具：** 在 `src/data/tools.json` 添加条目
2. **创建组件：** 在 `src/components/tools/[tool-name]/` 创建 Vue 组件
3. **自动发现：** 工具自动出现在工具列表页

### 7.2 组件化架构

- 通用组件可复用
- 工具组件独立封装
- 通过 props 和 emit 通信
- 支持组合式 API 逻辑复用

### 7.3 数据驱动

- 内容与展示分离
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

### 8.3 工具组件加载失败

- 降级显示工具信息卡片
- 不影响其他功能
- 错误边界捕获

### 8.4 边界情况

- **空状态：** 引导性提示
- **大数据量：** 虚拟滚动
- **网络慢：** Skeleton 加载
- **图片失败：** 占位图

---

## 9. 性能优化

### 9.1 代码分割

- 路由级别懒加载
- 工具组件动态导入
- 非关键库按需加载

### 9.2 资源优化

- 图片：WebP 格式 + srcset
- 字体：font-display: swap
- CSS：关键样式内联

### 9.3 缓存策略

- 静态资源：强缓存（1年）
- 数据文件：协商缓存
- HTML：短缓存（1小时）

### 9.4 Core Web Vitals 目标

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## 10. 测试策略

### 10.1 单元测试

- 数据解析函数
- 工具函数（日期、URL、验证）
- 工具组件核心逻辑

### 10.2 组件测试

- 主要页面组件渲染
- 交互行为（点击、输入、导航）
- 深色模式切换

### 10.3 E2E 测试

- 用户核心流程
- 跨浏览器兼容性
- 移动端响应式

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

- `main` - 生产环境
- `develop` - 开发分支
- `feature/*` - 功能分支

### 12.2 内容更新流程

1. 本地编辑 Markdown/JSON 文件
2. 提交并推送到 GitHub
3. 自动触发部署
4. 几分钟后线上更新

### 12.3 工具开发流程

1. 创建功能分支
2. 开发工具组件
3. 更新 tools.json
4. 本地测试
5. 提交 PR
6. 代码审查
7. 合并到 main

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
- 输入验证和转义
- CSP 头配置
- HTTPS 强制
- 依赖定期更新

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
- [ ] 博客列表和详情页正常工作
- [ ] 收藏列表按分类筛选
- [ ] 工具列表和工具页面正常
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

### B. 设计资源

- 设计系统：基于 UI UX Pro Max 生成
- 图标库：Lucide Vue
- 字体：Archivo + Space Grotesk (Google Fonts)

---

**文档版本：** 1.0
**最后更新：** 2026-04-16
