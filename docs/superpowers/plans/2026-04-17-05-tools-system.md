# 工具系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现工具系统，包括工具列表页和三个工具：待办清单、番茄钟、快速笔记。

**Architecture:** 工具配置存储在 `src/data/config.js`，每个工具是独立的 Vue 组件，通过 Vue Router 配置硬编码路由。

**Tech Stack:** Vue 3 Composition API, LocalStorage (数据持久化), Lucide Vue Icons

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/data/config.js` | 工具配置 |
| `src/components/tools/ToolCard.vue` | 工具卡片组件 |
| `src/components/tools/ToolList.vue` | 工具列表容器 |
| `src/components/tools/TodoApp.vue` | 待办清单工具 |
| `src/components/tools/PomodoroTimer.vue` | 番茄钟工具 |
| `src/components/tools/QuickNotes.vue` | 快速笔记工具 |
| `src/pages/Tools.vue` | 工具列表页 |
| `src/pages/TodoTool.vue` | 待办清单页面 |
| `src/pages/PomodoroTool.vue` | 番茄钟页面 |
| `src/pages/NotesTool.vue` | 快速笔记页面 |

---

### Task 1: 创建工具配置

**Files:**
- Create: `src/data/config.js`

- [x] **Step 1: 创建 config.js**

```javascript
export const tools = [
  {
    id: 'todo',
    name: '待办清单',
    description: '管理你的任务和待办事项',
    icon: 'check-square',
    route: '/tools/todo',
    color: 'bg-blue-500'
  },
  {
    id: 'pomodoro',
    name: '番茄钟',
    description: '专注工作 25 分钟，休息 5 分钟',
    icon: 'timer',
    route: '/tools/pomodoro',
    color: 'bg-red-500'
  },
  {
    id: 'notes',
    name: '快速笔记',
    description: '快速记录想法和灵感',
    icon: 'file-text',
    route: '/tools/notes',
    color: 'bg-green-500'
  }
]
```

- [x] **Step 2: 提交**

```bash
git add src/data/config.js
git commit -m "chore: 创建工具配置"
```

---

### Task 2: 创建 ToolCard 组件

**Files:**
- Create: `src/components/tools/ToolCard.vue`

- [x] **Step 1: 创建 ToolCard.vue**

```vue
<template>
  <router-link
    :to="tool.route"
    class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 group"
  >
    <div class="flex items-start justify-between mb-4">
      <div :class="`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`">
        <component :is="iconComponent" class="w-6 h-6 text-white" />
      </div>
      <ArrowRight class="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
    </div>

    <h3 class="font-display text-xl font-semibold text-primary mb-2">
      {{ tool.name }}
    </h3>

    <p class="text-secondary text-sm">
      {{ tool.description }}
    </p>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import {
  CheckSquare,
  Timer,
  FileText,
  ArrowRight
} from 'lucide-vue-next'

const props = defineProps({
  tool: {
    type: Object,
    required: true
  }
})

const iconComponent = computed(() => {
  const icons = {
    'check-square': CheckSquare,
    'timer': Timer,
    'file-text': FileText
  }
  return icons[props.tool.icon] || FileText
})
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/components/tools/ToolCard.vue
git commit -m "feat: 创建 ToolCard 组件"
```

---

### Task 3: 创建 ToolList 组件

**Files:**
- Create: `src/components/tools/ToolList.vue`

- [x] **Step 1: 创建 ToolList.vue**

```vue
<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold text-primary mb-2">效率工具</h1>
      <p class="text-secondary">提升你工作效率的小工具</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ToolCard
        v-for="tool in tools"
        :key="tool.id"
        :tool="tool"
      />
    </div>
  </div>
</template>

<script setup>
import { tools } from '../../data/config.js'
import ToolCard from './ToolCard.vue'
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/components/tools/ToolList.vue
git commit -m "feat: 创建 ToolList 组件"
```

---

### Task 4: 创建 TodoApp 组件

**Files:**
- Create: `src/components/tools/TodoApp.vue`

- [x] **Step 1: 创建 TodoApp.vue**

```vue
<template>
  <div class="max-w-2xl mx-auto">
    <div class="card p-6">
      <h2 class="font-display text-xl font-semibold text-primary mb-4">待办清单</h2>

      <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
        <input
          v-model="newTodo"
          type="text"
          placeholder="添加新任务..."
          class="flex-1 px-4 py-2 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          @keyup.enter="addTodo"
        />
        <button
          type="submit"
          class="btn bg-accent hover:bg-blue-600 text-white px-6"
        >
          添加
        </button>
      </form>

      <div v-if="todos.length === 0" class="text-center py-8 text-secondary">
        <CheckSquare class="w-12 h-12 text-muted mx-auto mb-4" />
        <p>还没有任务，添加一个吧！</p>
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="todo in sortedTodos"
          :key="todo.id"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
            class="w-5 h-5 rounded border-border accent-accent cursor-pointer"
          />
          <span
            class="flex-1"
            :class="{
              'line-through text-muted': todo.completed,
              'text-foreground': !todo.completed
            }"
          >
            {{ todo.text }}
          </span>
          <button
            @click="deleteTodo(todo.id)"
            class="opacity-0 group-hover:opacity-100 text-secondary hover:text-destructive transition-all"
            aria-label="删除任务"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </li>
      </ul>

      <div v-if="todos.length > 0" class="mt-4 pt-4 border-t border-border flex justify-between text-sm text-secondary">
        <span>{{ activeTodos }} 个任务待完成</span>
        <button
          v-if="completedTodos > 0"
          @click="clearCompleted"
          class="text-accent hover:underline"
        >
          清除已完成
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { CheckSquare, Trash2 } from 'lucide-vue-next'

const STORAGE_KEY = 'blog-todos'

const todos = ref([])
const newTodo = ref('')

const sortedTodos = computed(() => {
  return [...todos.value].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt - a.createdAt
    }
    return a.completed ? 1 : -1
  })
})

const activeTodos = computed(() => {
  return todos.value.filter(t => !t.completed).length
})

const completedTodos = computed(() => {
  return todos.value.filter(t => t.completed).length
})

const loadTodos = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      todos.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load todos:', error)
  }
}

const saveTodos = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  } catch (error) {
    console.error('Failed to save todos:', error)
  }
}

const addTodo = () => {
  if (!newTodo.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false,
    createdAt: Date.now()
  })

  newTodo.value = ''
  saveTodos()
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
  saveTodos()
}

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed)
  saveTodos()
}

watch(todos, saveTodos, { deep: true })

onMounted(() => {
  loadTodos()
})
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/components/tools/TodoApp.vue
git commit -m "feat: 创建 TodoApp 组件"
```

---

### Task 5: 创建 PomodoroTimer 组件

**Files:**
- Create: `src/components/tools/PomodoroTimer.vue`

- [x] **Step 1: 创建 PomodoroTimer.vue**

```vue
<template>
  <div class="max-w-md mx-auto">
    <div class="card p-8 text-center">
      <h2 class="font-display text-xl font-semibold text-primary mb-6">番茄钟</h2>

      <div class="mb-8">
        <div
          class="text-7xl font-mono font-bold text-primary mb-2 tabular-nums"
          :class="{ 'text-accent': isRunning && !isBreak, 'text-green-600': isBreak }"
        >
          {{ formattedTime }}
        </div>
        <p class="text-secondary">
          {{ isBreak ? '休息时间' : '专注时间' }}
        </p>
      </div>

      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="startTimer"
          :disabled="isRunning"
          class="btn bg-accent hover:bg-blue-600 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play class="w-5 h-5 inline mr-2" />
          开始
        </button>
        <button
          @click="pauseTimer"
          :disabled="!isRunning"
          class="btn bg-muted hover:bg-secondary text-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pause class="w-5 h-5 inline mr-2" />
          暂停
        </button>
        <button
          @click="resetTimer"
          class="btn bg-muted hover:bg-secondary text-primary px-8"
        >
          <RotateCcw class="w-5 h-5 inline mr-2" />
          重置
        </button>
      </div>

      <div class="flex justify-center gap-2 text-sm">
        <button
          @click="setWorkDuration"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            !isBreak && !isRunning ? 'bg-accent text-white' : 'bg-muted text-secondary'
          ]"
        >
          专注 25 分钟
        </button>
        <button
          @click="setBreakDuration"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            isBreak && !isRunning ? 'bg-green-600 text-white' : 'bg-muted text-secondary'
          ]"
        >
          休息 5 分钟
        </button>
      </div>

      <div v-if="completedPomodoros > 0" class="mt-6 pt-6 border-t border-border">
        <p class="text-secondary text-sm">
          已完成 <span class="text-accent font-bold">{{ completedPomodoros }}</span> 个番茄钟
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Play, Pause, RotateCcw } from 'lucide-vue-next'

const WORK_DURATION = 25 * 60 // 25 分钟
const BREAK_DURATION = 5 * 60 // 5 分钟

const timeLeft = ref(WORK_DURATION)
const isRunning = ref(false)
const isBreak = ref(false)
const completedPomodoros = ref(0)
let timer = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleTimerComplete()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const resetTimer = () => {
  pauseTimer()
  if (isBreak.value) {
    timeLeft.value = BREAK_DURATION
  } else {
    timeLeft.value = WORK_DURATION
  }
}

const setWorkDuration = () => {
  pauseTimer()
  isBreak.value = false
  timeLeft.value = WORK_DURATION
}

const setBreakDuration = () => {
  pauseTimer()
  isBreak.value = true
  timeLeft.value = BREAK_DURATION
}

const handleTimerComplete = () => {
  pauseTimer()

  if (isBreak.value) {
    // 休息结束，回到专注时间
    isBreak.value = false
    timeLeft.value = WORK_DURATION
  } else {
    // 专注结束，增加完成数
    completedPomodoros.value++
    isBreak.value = true
    timeLeft.value = BREAK_DURATION
  }

  // 播放提示音（可选）
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAAAAAAAA//8=')
    audio.play().catch(() => {})
  } catch (error) {
    // 忽略音频播放错误
  }
}

onMounted(() => {
  // 加载完成数
  try {
    const saved = localStorage.getItem('blog-pomodoros')
    if (saved) {
      completedPomodoros.value = parseInt(saved, 10)
    }
  } catch (error) {
    console.error('Failed to load pomodoros:', error)
  }
})

onUnmounted(() => {
  pauseTimer()
})

// 监听完成数变化
import { watch } from 'vue'
watch(completedPomodoros, (newValue) => {
  try {
    localStorage.setItem('blog-pomodoros', String(newValue))
  } catch (error) {
    console.error('Failed to save pomodoros:', error)
  }
})
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/components/tools/PomodoroTimer.vue
git commit -m "feat: 创建 PomodoroTimer 组件"
```

---

### Task 6: 创建 QuickNotes 组件

**Files:**
- Create: `src/components/tools/QuickNotes.vue`

- [x] **Step 1: 创建 QuickNotes.vue**

```vue
<template>
  <div class="max-w-3xl mx-auto">
    <div class="card p-6">
      <h2 class="font-display text-xl font-semibold text-primary mb-4">快速笔记</h2>

      <div class="mb-6">
        <textarea
          v-model="currentNote"
          placeholder="开始记笔记..."
          class="w-full h-64 px-4 py-3 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          @input="autoSave"
        ></textarea>
      </div>

      <div class="flex justify-between items-center text-sm text-secondary">
        <div class="flex items-center gap-4">
          <span v-if="lastSaved">
            上次保存: {{ lastSaved }}
          </span>
          <span v-else class="text-muted">
            等待输入...
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="saveNote"
            class="btn bg-accent hover:bg-blue-600 text-white"
          >
            <Save class="w-4 h-4 inline mr-2" />
            保存
          </button>
          <button
            @click="clearNote"
            class="btn bg-muted hover:bg-destructive hover:text-white text-primary"
          >
            <Trash2 class="w-4 h-4 inline mr-2" />
            清空
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="font-display text-lg font-semibold text-primary mb-4">历史笔记</h3>

      <div v-if="historyNotes.length === 0" class="card p-6 text-center text-secondary">
        <FileText class="w-12 h-12 text-muted mx-auto mb-4" />
        <p>还没有历史笔记</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="note in historyNotes"
          :key="note.id"
          class="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          @click="loadHistoryNote(note)"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm text-secondary">{{ formatDate(note.timestamp) }}</span>
            <button
              @click.stop="deleteHistoryNote(note.id)"
              class="text-secondary hover:text-destructive"
              aria-label="删除笔记"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
          <p class="text-sm text-foreground line-clamp-2">
            {{ note.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Save, Trash2, FileText, X } from 'lucide-vue-next'

const STORAGE_KEY = 'blog-notes'
const HISTORY_KEY = 'blog-notes-history'

const currentNote = ref('')
const lastSaved = ref('')
const historyNotes = ref([])
let saveTimeout = null

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const autoSave = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    saveNote()
  }, 1000) // 1 秒后自动保存
}

const saveNote = () => {
  try {
    localStorage.setItem(STORAGE_KEY, currentNote.value)
    lastSaved.value = formatDate(Date.now())
  } catch (error) {
    console.error('Failed to save note:', error)
  }
}

const clearNote = () => {
  if (currentNote.value.trim() && !confirm('确定要清空笔记吗？')) {
    return
  }
  currentNote.value = ''
  saveNote()
}

const loadHistoryNote = (note) => {
  if (currentNote.value.trim() && !confirm('当前笔记将被替换，确定吗？')) {
    return
  }
  currentNote.value = note.content
  saveNote()
}

const deleteHistoryNote = (id) => {
  if (!confirm('确定要删除这条笔记吗？')) {
    return
  }
  historyNotes.value = historyNotes.value.filter(n => n.id !== id)
  saveHistory()
}

const saveHistory = () => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyNotes.value))
  } catch (error) {
    console.error('Failed to save history:', error)
  }
}

const addToHistory = () => {
  if (!currentNote.value.trim()) return

  const note = {
    id: Date.now(),
    content: currentNote.value,
    timestamp: Date.now()
  }

  historyNotes.value.unshift(note)

  // 只保留最近 20 条
  if (historyNotes.value.length > 20) {
    historyNotes.value = historyNotes.value.slice(0, 20)
  }

  saveHistory()
}

// 每次保存时添加到历史记录
watch(currentNote, (newValue, oldValue) => {
  if (oldValue && newValue !== oldValue && newValue.trim()) {
    addToHistory()
  }
})

onMounted(() => {
  // 加载当前笔记
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      currentNote.value = saved
    }
  } catch (error) {
    console.error('Failed to load note:', error)
  }

  // 加载历史笔记
  try {
    const saved = localStorage.getItem(HISTORY_KEY)
    if (saved) {
      historyNotes.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load history:', error)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
```

- [x] **Step 2: 提交 ***

```bash
git add src/components/tools/QuickNotes.vue
git commit -m "feat: 创建 QuickNotes 组件"
```

---

### Task 7: 创建工具列表页面

**Files:**
- Create: `src/pages/Tools.vue`

- [x] **Step 1: 创建 Tools.vue**

```vue
<template>
  <div class="min-h-screen">
    <section class="py-12">
      <ToolList />
    </section>
  </div>
</template>

<script setup>
import ToolList from '../components/tools/ToolList.vue'
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/pages/Tools.vue
git commit -m "feat: 创建工具列表页面"
```

---

### Task 8: 创建待办清单页面

**Files:**
- Create: `src/pages/TodoTool.vue`

- [x] **Step 1: 创建 TodoTool.vue**

```vue
<template>
  <div class="min-h-screen py-12">
    <TodoApp />
  </div>
</template>

<script setup>
import TodoApp from '../components/tools/TodoApp.vue'
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/pages/TodoTool.vue
git commit -m "feat: 创建待办清单页面"
```

---

### Task 9: 创建番茄钟页面

**Files:**
- Create: `src/pages/PomodoroTool.vue`

- [x] **Step 1: 创建 PomodoroTool.vue**

```vue
<template>
  <div class="min-h-screen py-12">
    <PomodoroTimer />
  </div>
</template>

<script setup>
import PomodoroTimer from '../components/tools/PomodoroTimer.vue'
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/pages/PomodoroTool.vue
git commit -m "feat: 创建番茄钟页面"
```

---

### Task 10: 创建快速笔记页面

**Files:**
- Create: `src/pages/NotesTool.vue`

- [x] **Step 1: 创建 NotesTool.vue**

```vue
<template>
  <div class="min-h-screen py-12">
    <QuickNotes />
  </div>
</template>

<script setup>
import QuickNotes from '../components/tools/QuickNotes.vue'
</script>
```

- [x] **Step 2: 提交 ***

```bash
git add src/pages/NotesTool.vue
git commit -m "feat: 创建快速笔记页面"
```

---

### Task 11: 更新路由配置

**Files:**
- Modify: `src/router/index.js`

- [x] **Step 1: 修改 router/index.js 添加工具路由**

```javascript
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

export default router
```

- [x] **Step 2: 提交 ***

```bash
git add src/router/index.js
git commit -m "chore: 添加工具路由"
```

---

### Task 12: 验证工具功能

**Files:**
- None

- [x] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器在 http://localhost:3000 启动

- [x] **Step 2: 验证工具列表**

- [x] 访问 /tools 显示所有工具
- [ ] 工具卡片正确显示
- [ ] 点击卡片跳转到对应工具

- [x] **Step 3: 验证待办清单**

- [x] 可以添加新任务
- [x] 可以勾选完成/取消完成
- [x] 可以删除任务
- [x] 可以清除已完成任务
- [ ] 数据持久化到 LocalStorage

- [x] **Step 4: 验证番茄钟**

- [x] 倒计时正常工作
- [ ] 开始/暂停/重置按钮正常
- [ ] 专注时间/休息时间切换正常
- [ ] 完成数正确统计
- [ ] 完成数持久化到 LocalStorage

- [x] **Step 5: 验证快速笔记**

- [x] 可以输入笔记
- [ ] 自动保存功能正常
- [x] 可以手动保存
- [x] 可以清空笔记
- [ ] 历史笔记显示正常
- [x] 可以加载历史笔记
- [x] 可以删除历史笔记
- [ ] 数据持久化到 LocalStorage

- [x] **Step 6: 提交**

```bash
git add -A
git commit -m "test: 验证工具功能"
```

---

## 验收标准

- [x] 工具列表正确显示所有工具
- [x] 待办清单：添加、完成、删除、清除功能正常
- [x] 番茄钟：倒计时、开始/暂停/重置、切换功能正常
- [x] 快速笔记：输入、保存、加载、删除功能正常
- [x] 所有工具数据正确持久化到 LocalStorage
- [ ] 响应式布局正常

---

## 下一步

完成本模块后，继续执行 **2026-04-17-06-testing-system.md**（测试系统）
