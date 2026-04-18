#!/bin/bash

# GitHub Pages 部署脚本
# 此脚本会将项目构建并部署到 GitHub Pages 的 gh-pages 分支

echo "🚀 开始部署到 GitHub Pages..."

# 1. 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf dist

# 2. 安装依赖
echo "📦 安装依赖..."
npm ci

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 创建 gh-pages 分支并推送
echo "📤 准备部署文件..."

# 检查是否存在 gh-pages 分支
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "✅ 检测到 gh-pages 分支"
else
    echo "📂 创建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
    touch README.md
    git add README.md
    git commit -m "Initial gh-pages branch"
    git checkout main
fi

# 切换到 gh-pages 分支
git checkout gh-pages

# 删除所有文件（除了 .git 目录）
rm -rf ./*
rm -rf .gitignore

# 从 main 分支复制构建文件
cp -r dist/* ./

# 创建 .nojekyll 文件（告诉 GitHub Pages 不使用 Jekyll）
touch .nojekyll

# 创建或更新 404.html（用于 SPA 路由）
echo '<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - 页面未找到</title>
  <script defer src="/index.js"></script>
  <link rel="stylesheet" href="/index.css">
</head>
<body>
  <div id="app"></div>
</body>
</html>' > 404.html

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到远程仓库
echo "🌐 推送到 GitHub..."
git push origin gh-pages --force

# 切换回 main 分支
git checkout main

echo "✅ 部署完成！"
echo ""
echo "🌐 部署地址: https://<username>.github.io/<reponame>/"
echo "⚠️  请将 <username> 和 <reponame> 替换为你的实际用户名和仓库名"