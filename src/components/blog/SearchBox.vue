<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="搜索文章标题、内容和标签..."
        class="w-full px-4 py-2 pr-10 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <div v-if="loading" class="absolute right-3 top-1/2 -translate-y-1/2">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
      </div>
    </div>

    <!-- 搜索建议下拉框 -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full mt-1 w-full bg-background border border-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto"
    >
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
        @click="selectSuggestion(suggestion)"
      >
        <div class="font-medium text-primary">{{ suggestion.title }}</div>
        <div class="text-sm text-secondary">
          {{ suggestion.type === 'post' ? '文章' : '标签' }}
        </div>
      </div>
    </div>

    <!-- 搜索结果提示 -->
    <div
      v-if="searchResults && searchResults.length > 0"
      class="mt-4 p-4 bg-muted rounded-lg"
    >
      <p class="text-sm text-secondary mb-2">
        找到 {{ searchResults.length }} 篇相关文章
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { searchPosts as performSearch, getSuggestions as getSuggestion } from '../../utils/search.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'suggestion-click'])

const searchQuery = ref(props.modelValue)

const emit = defineEmits(['update:modelValue', 'search', 'suggestion-click'])

const searchQuery = ref(props.initialQuery)
const loading = ref(false)
const showSuggestions = ref(false)
const suggestions = ref([])
const searchResults = ref([])

// 获取搜索建议
const handleSearch = async () => {
  if (!searchQuery.value) {
    suggestions.value = []
    return
  }

  loading.value = true
  try {
    // 使用防抖避免频繁搜索
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      suggestions.value = await getSuggestion(searchQuery.value, 5)
      showSuggestions.value = true
    }, 300)
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    loading.value = false
  }
}

// 选择建议
const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.title
  emit('suggestion-click', suggestion)
  showSuggestions.value = false
  hideSuggestions()
}

// 隐藏建议
const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// 执行搜索
const performFullSearch = async () => {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }

  loading.value = true
  try {
    searchResults.value = await performSearch(searchQuery.value)
    emit('search', searchResults.value)
  } catch (error) {
    console.error('Full search error:', error)
    emit('search', [])
  } finally {
    loading.value = false
  }
}

let debounceTimer

// 支持 v-model
watch(searchQuery, (newVal) => {
  emit('update:modelValue', newVal)
  handleSearch()
})

watch(() => props.modelValue, (newVal) => {
  if (searchQuery.value !== newVal) {
    searchQuery.value = newVal
  }
})

// 初始化时执行一次搜索
if (searchQuery.value) {
  performFullSearch()
}
</script>