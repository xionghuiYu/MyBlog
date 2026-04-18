# RSS 订阅功能使用指南

## 功能说明

博客系统已集成 RSS 订阅功能，用户可以通过 RSS 阅读器订阅博客更新。

## 如何使用

### 1. 直接访问 RSS Feed

打开浏览器访问：`http://你的域名/rss.xml`

### 2. 在 RSS 阅读器中添加订阅

#### Feedly
1. 访问 [Feedly](https://feedly.com/)
2. 点击 "Add content"
3. 输入 RSS URL: `http://你的域名/rss.xml`
4. 点击搜索并添加

#### Inoreader
1. 访问 [Inoreader](https://inoreader.com/)
2. 点击 "Add feed"
3. 输入 RSS URL: `http://你的域名/rss.xml`

#### 其他阅读器
大多数 RSS 阅读器都支持直接输入 RSS URL。

## 技术实现

### RSS 生成方式

1. **静态文件方式**（推荐）
   - 位置：`/public/rss.xml`
   - 手动生成后静态托管

2. **动态服务器**（开发环境）
   ```bash
   npm run rss
   ```
   启动独立的服务器在端口 5178

### RSS 格式

- 版本：RSS 2.0
- 编码：UTF-8
- 包含最新 10 篇文章
- 每篇文章包含标题、描述、链接、发布日期和标签

### 自动更新

要自动更新 RSS，可以在以下场景触发：

1. **构建时生成**
   ```bash
   npm run generate:rss
   ```

2. **GitHub Actions 自动更新**
   - 在部署脚本中添加 RSS 生成步骤

## 部署建议

### Vercel 部署
Vercel 支持静态文件托管，`/public/rss.xml` 会自动被服务。

### GitHub Pages
确保将 `rss.xml` 包含在部署中。

### 自托管服务器
将 `rss.xml` 放置在网站的根目录下。

## 自定义配置

可以通过环境变量自定义 RSS 内容：

```env
VITE_SITE_URL=https://your-blog.com
VITE_SITE_TITLE=你的博客名称
VITE_SITE_DESCRIPTION=博客描述
```

## 注意事项

1. 确保 `rss.xml` 文件在 `public` 目录下
2. 更新文章后需要重新生成 RSS
3. URL 需要是完整的域名，不能使用 localhost（生产环境）
4. 确保服务器正确设置了 MIME type：`application/rss+xml`