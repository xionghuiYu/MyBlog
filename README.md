# 个人博客项目

一个简洁美丽的个人博客网站，使用 Vue 3 + Vite + Tailwind CSS 构建。

## 功能特性

- 📝 **博客系统** - Markdown 写作，代码高亮，标签分类
- 🔖 **收藏系统** - 收藏管理，分类筛选
- 🛠️ **工具系统** - 待办清单、番茄钟、快速笔记
- 🎨 **主题切换** - 深色/浅色模式
- 📱 **响应式设计** - 完美适配移动端

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router 4
- **样式**: Tailwind CSS
- **Markdown**: marked
- **代码高亮**: highlight.js
- **图标**: Lucide Vue Next

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
├── components/          # 组件
│   ├── common/        # 通用组件
│   └── blog/          # 博客组件
├── pages/             # 页面
├── router/            # 路由配置
├── stores/            # 状态管理
├── styles/            # 样式文件
└── utils/             # 工具函数
public/
└── posts/             # 博客文章（Markdown）
```

## 部署

### 预览版本

查看预览版本：`deploy-preview.html`

### Vercel 部署

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
vercel
```

### GitHub Pages 部署

1. 构建
```bash
npm run build
```

2. 部署到 gh-pages
```bash
npm install -g gh-pages
gh-pages -d dist
```

## 开发计划

- [x] 项目基础与设计系统
- [x] 路由与主题系统
- [x] 博客系统
- [ ] 收藏系统
- [ ] 工具系统
- [ ] 测试系统

## 许可证

MIT