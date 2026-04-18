import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Blog from '../pages/Blog.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import Bookmarks from '../pages/Bookmarks.vue'
import Tools from '../pages/Tools.vue'
import TodoTool from '../pages/TodoTool.vue'
import PomodoroTool from '../pages/PomodoroTool.vue'
import NotesTool from '../pages/NotesTool.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetail
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: Bookmarks
  },
  {
    path: '/tools',
    name: 'tools',
    component: Tools
  },
  {
    path: '/tools/todo',
    name: 'todo-tool',
    component: TodoTool
  },
  {
    path: '/tools/pomodoro',
    name: 'pomodoro-tool',
    component: PomodoroTool
  },
  {
    path: '/tools/notes',
    name: 'notes-tool',
    component: NotesTool
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

// GitHub Pages 部署时的路由处理
if (import.meta.env.MODE === 'production') {
  // 修复 GitHub Pages 路由问题
  if (typeof window !== 'undefined') {
    const originalPush = router.push
    router.push = function (to) {
      if (typeof to === 'string') {
        // 确保路径正确处理
        to = to.replace(/^\//, '/')
      }
      return originalPush.call(this, to)
    }
  }
}

export default router
