#!/bin/bash

# GitHub Pages 部署脚本
# 此脚本会将项目构建并部署到 GitHub Pages

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

# 4. 创建部署目录结构
echo "📋 准备部署文件..."
mkdir -p deploy

# 5. 复制构建文件到部署目录
cp -r dist/* deploy/

# 6. 创建 .nojekyll 文件
touch deploy/.nojekyll

# 7. 创建 404.html
cat > deploy/404.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - 页面未找到</title>
  <script defer src="/MyBlog/assets/index.js"></script>
  <link rel="stylesheet" href="/MyBlog/assets/index.css">
</head>
<body>
  <div id="app"></div>
</body>
</html>
EOF

# 8. 提交更改（如果需要）
echo "📤 推送到远程仓库..."

# 如果是在 GitHub Actions 中运行
if [ -n "$GITHUB_ACTIONS" ]; then
    echo "🔄 在 GitHub Actions 中运行，准备上传构建产物"
    # Actions 会自动处理部署
else
    # 手动部署
    if [ -d ".git" ]; then
        echo "🔄 创建临时分支进行部署..."

        # 创建临时分支
        git checkout -b gh-pages

        # 清理分支（除了 .git 目录）
        rm -rf ./*
        rm -rf .gitignore

        # 复制部署文件
        cp -r dist/* ./
        touch .nojekyll

        # 提交
        git add .
        git commit -m "Deploy to GitHub Pages: $(date '+%Y-%m-%d %H:%M:%S')"

        # 推送
        git push origin gh-pages --force

        # 切换回 main
        git checkout main

        echo "✅ 部署完成！"
    else
        echo "⚠️ 未检测到 git 仓库，部署文件已准备在 ./deploy/ 目录"
        echo "请手动将这些文件部署到 GitHub Pages"
    fi
fi

echo "✅ 部署准备完成！"
echo ""
echo "🌐 预览地址: https://xionghuiyu.github.io/MyBlog/"
echo "📂 部署文件位置: ./deploy/"