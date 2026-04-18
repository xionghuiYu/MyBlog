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