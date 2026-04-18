#!/bin/bash

# 博客系统部署脚本
# 此脚本会将项目构建并部署到 GitHub Pages

echo "🚀 开始部署博客系统..."

# 1. 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf dist

# 2. 安装依赖
echo "📦 安装依赖..."
npm install

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 复制构建文件到部署目录
echo "📋 准备部署文件..."
mkdir -p deploy
cp -r dist/* deploy/

# 5. 创建 GitHub Pages 配置
echo "⚙️ 创建 GitHub Pages 配置..."
cat > deploy/.nojekyll << EOF
# GitHub Pages 配置
EOF

# 6. 提交并推送（如果有git仓库）
if [ -d ".git" ]; then
    echo "📤 推送到远程仓库..."
    git add .
    git commit -m "部署博客系统 $(date '+%Y-%m-%d %H:%M:%S')"

    # 读取远程仓库名（需要用户提前配置）
    REMOTE_URL=$(git remote get-url origin 2>/dev/null)
    if [ -n "$REMOTE_URL" ]; then
        # 尝试推送到 main 分支
        git push origin main 2>/dev/null || git push origin master 2>/dev/null || {
            echo "❌ 自动推送失败，请手动推送："
            echo "   git push origin main"
            echo "   或"
            echo "   git push origin master"
        }
    else
        echo "⚠️ 未找到远程仓库，请手动配置："
        echo "   git remote add origin <你的GitHub仓库地址>"
        echo "   git push -u origin main"
    fi
else
    echo "⚠️ 未检测到git仓库，请手动部署到静态托管平台"
fi

echo "✅ 部署完成！"
echo ""
echo "📂 部署文件位置: ./deploy/"
echo "🌐 可通过以下方式访问："
echo "   - 直接打开 deploy/index.html"
echo "   - 部署到 GitHub Pages: https://<用户名>.github.io/<仓库名>/"