# 路由与主题系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 配置 Vue Router，创建导航组件（Header、Footer、NavMenu、ThemeToggle），实现深色/浅色主题切换和导航功能。

**Architecture:** 使用 Vue Router 4 管理单页应用路由，创建可复用的导航组件，通过组合式 API 管理主题状态。

**Tech Stack:** Vue Router 4, Vue 3 Composition API, Lucide Vue Icons

---

## 文件结构

| 文件 | 跌责 |
|------|------|
| `src/router/index.js` | Vue Router 配置 |
| `src/components/common/Header.vue` | 顶部导航栏 |
| `src/components/common/Footer.vue` | 页脚 |
| `src/components/common/ThemeToggle.vue` | 主题切换按钮 |
| `src/components/common/NavMenu.vue` | 导航菜单 |
| `src/pages/Home.vue` | 首页 |
| `src/pages/NotFound.vue` | 404 页面 |

---

### Task 1: 安装 Vue Router 和图标库

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 更新 package.json 添加依赖**

```json
{
  "name": "personal-blog",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.5",
    "lucide-vue-next": "^0.309.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: 运行 npm install**

Run: `npm install`
Expected: vue-router 和 lucide-vue-next 安装成功

- [ ] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "chore: 添加 Vue Router 和 Lucide Icons 依赖"
```

---

### Task 2: 配置 Vue Router

**Files:**
- Create: `src/router/index.js`

- [ ] **Step 1: 创建 router/index.js**

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
```

- [ ] **Step 2: 提交**

```bash
git add src/router/
git commit -m "chore: 配置 Vue Router"
```

---

### Task 3: 更新 main.js 使用 Router

**Files:**
- Modify: `src/main.js`

- [ ] **Step 1: 修改 main.js**

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 2: 提交**

```bash
git add src/main.js
git commit -m "chore: 在 Vue 应用中启用 Router"
```

---

### Task 4: 创建首页

**Files:**
- Create: `src/pages/Home.vue`

- [ ] **Step 1: 创建 Home.vue**

```vue
<template>
  <div class="min-h-screen">
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
          欢迎来到我的博客
        </h1>
        <p class="text-secondary text-lg mb-12">
          分享生活、记录点滴、收藏有用资源
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <router-link
            to="/blog"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <FileText class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">博客</h2>
            <p class="text-secondary text-sm">阅读我的文章和随笔</p>
          </router-link>

          <router-link
            to="/bookmarks"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Bookmark class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">收藏</h2>
            <p class="text-secondary text-sm">有用的网站和资源</p>
          </router-link>

          <router-link
            to="/tools"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Wrench class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">工具</h2>
            <p class="text-secondary text-sm">提高效率的小工具</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FileText, Bookmark, Wrench } from 'lucide-vue-next'
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/Home.vue
git commit -m "feat: 创建首页"
```

---

### Task 5: 创建 404 页面

**Files:**
- Create: `src/pages/NotFound.vue`

- [ ] **Step 1: 创建 NotFound.vue**

```vue
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="font-display text-6xl font-bold text-accent mb-4">404</h1>
      <p class="text-secondary text-lg mb-8">页面未找到</p>
      <router-link
        to="/"
        class="btn bg-accent hover:bg-blue-600 text-white"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/NotFound.vue
git commit -m "feat: 创建 404 页面"
```

---

### Task 6: 创建 ThemeToggle 组件

**Files:**
- Create: `src/components/common/ThemeToggle.vue`

- [ ] **Step 1: 创建 ThemeToggle.vue**

```vue
<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg hover:bg-muted transition-colors"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../../stores/theme'

const { isDark, toggleTheme } = useTheme()
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/common/ThemeToggle.vue
git commit -m "feat: 创建 ThemeToggle 组件"
```

---

### Task 7: 创建 NavMenu 组件

**Files:**
- Create: `src/components/common/NavMenu.vue`

- [ ] **Step 1: 创建 NavMenu.vue**

```vue
<template>
  <nav class="hidden md:flex items-center gap-6">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="text-secondary hover:text-accent transition-colors font-medium"
      active-class="text-accent"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
const navItems = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '博客' },
  { path: '/bookmarks', label: '收藏' },
  { path: '/tools', label: '工具' }
]
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/common/NavMenu.vue
git commit -m "feat: 创建 NavMenu 组件"
```

---

### Task 8: 创建 Header 组件

**Files:**
- Create: `src/components/common/Header.vue`

- [ ] **Step 1: 创建 Header.vue**

```vue
<template>
  <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <PenTool class="w-5 h-5 text-white" />
        </div>
        <span class="font-display text-xl font-bold text-primary">博客</span>
      </router-link>

      <div class="flex items-center gap-4">
        <NavMenu />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { PenTool } from 'lucide-vue-next'
import NavMenu from './NavMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/common/Header.vue
git commit -m "feat: 创建 Header 组件"
```

---

### Task 9: 创建 Footer 组件

**Files:**
- Create: `src/components/common/Footer.vue`

- [ ] **Step 1: 创建 Footer.vue**

```vue
<template>
  <footer class="border-t border-border mt-16">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-secondary text-sm">
          © {{ currentYear }} 个人博客. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-secondary hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github class="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@example.com"
            class="text-secondary hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Mail } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/common/Footer.vue
git commit -m "feat: 创建 Footer 组件"
```

---

### Task 10: 更新 App.vue 使用导航组件

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: 修改 App.vue**

```vue
<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/App.vue
git commit -m "refactor: 更新 App.vue 使用导航组件"
```

---

### Task 11: 验证路由和导航功能

**Files:**
- None

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器在 http://localhost:3000 启动

- [ ] **Step 2: 验证功能**

- [ ] 首页正常显示三个入口卡片
- [ ] 点击卡片跳转到对应路由（虽然路由还未创建，应显示 404）
- [ ] Header 显示 Logo、导航菜单、主题切换按钮
- [ ] 导航菜单链接正确
- [ ] 主题切换按钮正常工作
- [ ] Footer 显示版权信息和社交链接
- [ ] 访问不存在的路由显示 404 页面
- [ ] 404 页面的"返回首页"按钮正常工作

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "test: 验证路由和导航功能"
```

---

## 验收标准

- [ ] Vue Router 配置正确
- [ ] 首页三个入口卡片正常显示
- [ ] Header 显示 Logo、导航菜单、主题切换
- [ ] 导航菜单链接正确
- [ ] 主题切换按钮正常工作并持久化
- [ ] Footer 正确显示
- [ ] 404 页面正常显示和导航
- [ ] 响应式布局正常（移动端隐藏导航菜单）

---

## 下一步

完成本模块后，继续执行 **2026-04-17-03-blog-system.md**（博客系统）
