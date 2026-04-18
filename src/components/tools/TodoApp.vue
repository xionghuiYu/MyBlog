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