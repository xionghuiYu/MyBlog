# Giscus 评论系统配置指南

## 步骤 1: 启用 GitHub Discussions

1. 在您的 GitHub 仓库中，进入 **Settings** → **Features** → **Discussions**
2. 启用 **Discussions** 功能

## 步骤 2: 安装 Giscus 应用

1. 访问 [Giscus 官网](https://giscus.app/)
2. 点击 **Install Giscus** 按钮
3. 选择您的 GitHub 仓库
4. 配置以下设置：
   - **Title**: 博客评论
   - **Description**: 博客文章的评论和讨论
   - **Discussion category**: General
   - **Discussion category emoji**: 💬

## 步骤 3: 获取配置信息

在 Giscus 配置页面，您会看到以下信息：

```
repo: your-username/your-repo
repoId: ABC123xyz
categoryId: DIC_kwDOABC1234
```

## 步骤 4: 更新环境变量

编辑 `.env` 文件，填入您的实际配置：

```env
VITE_GISCUS_REPO=your-username/your-repo
VITE_GISCUS_REPO_ID=ABC123xyz
VITE_GISCUS_CATEGORY_ID=DIC_kwDOABC1234
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_STRICT=0
VITE_GISCUS_REACTIONS_ENABLED=1
VITE_GISCUS_EMIT_METADATA=0
```

## 步骤 5: 部署配置

1. 推送您的更改
2. 等待部署完成
3. 访问博客文章，您应该能看到评论组件

## 配置说明

- **VITE_GISCUS_REPO**: 您的 GitHub 仓库（格式：username/repo）
- **VITE_GISCUS_REPO_ID**: Giscus 分配的仓库 ID
- **VITE_GISCUS_CATEGORY_ID**: Giscus 分配的分类 ID
- **VITE_GISCUS_CATEGORY**: 讨论分类名称
- **VITE_GISCUS_STRICT**: 0 或 1，控制映射规则是否严格
- **VITE_GISCUS_REACTIONS_ENABLED**: 0 或 1，是否启用表情反应
- **VITE_GISCUS_EMIT_METADATA**: 0 或 1，是否发送元数据事件

## 注意事项

1. 确保您的仓库已启用 Discussions 功能
2. 评论将在每篇文章的 URL 下自动创建对应的讨论
3. 主题会自动跟随博客的主题切换（明/暗模式）
4. 第一次访问时可能需要等待几秒钟加载评论组件