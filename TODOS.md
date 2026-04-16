# TODO List

## 评论系统集成
- **What:** 集成第三方评论服务（如 Giscus/Utterances）
- **Why:** 博客需要用户互动功能，自建评论系统成本高
- **Pros:** 免费托管、GitHub 集成、无需维护后端
- **Cons:** 依赖第三方服务、需要 GitHub OAuth 配置
- **Context:** 在博客详情页添加评论组件，需要配置 GitHub repo 讨论功能
- **Depends on:** —
- **Priority:** Medium（用户互动增强）

## 全文搜索增强
- **What:** 实现博客文章内容的全文搜索索引
- **Why:** 当前搜索仅限于标题和描述，无法搜索文章正文
- **Pros:** 提升用户体验，快速找到相关内容
- **Cons:** 需要搜索索引库（如 FlexSearch/Lunr.js），增加包体积
- **Context:** 在构建时生成搜索索引，客户端实现搜索功能
- **Depends on:** 博客内容稳定后
- **Priority:** Low（当前基础搜索已够用）

## RSS 订阅生成
- **What:** 自动生成 RSS Feed 供订阅器使用
- **Why:** 博客用户习惯通过 RSS 订阅更新
- **Pros:** 标准化协议、大多数阅读器支持、自动发现
- **Cons:** 需要构建时生成 XML 文件
- **Context:** 在 Vite 构建流程中添加 RSS 生成插件
- **Depends on:** 博客内容稳定后
- **Priority:** Medium（标准博客功能）
