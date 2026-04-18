<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold text-primary mb-2">收藏网站</h1>
      <p class="text-secondary mb-6">有用的资源和工具</p>

      <div class="mb-6">
        <CategoryFilter
          :categories="['', ...categories]"
          :selected-category="selectedCategory"
          @filter="selectedCategory = $event"
        />
      </div>

      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="搜索收藏..."
          class="w-full px-4 py-2 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>
    </div>

    <div v-if="filteredBookmarks.length === 0" class="text-center py-12">
      <Bookmark class="w-12 h-12 text-muted mx-auto mb-4" />
      <p class="text-secondary">没有找到相关收藏</p>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <BookmarkCard
        v-for="bookmark in filteredBookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
      />
    </div>

    <div v-if="filteredBookmarks.length > 0" class="mt-6 text-center text-sm text-secondary">
      共找到 {{ filteredBookmarks.length }} 个收藏
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import bookmarksData from '../../data/bookmarks.json'
import BookmarkCard from './BookmarkCard.vue'
import CategoryFilter from './CategoryFilter.vue'
import { Bookmark } from 'lucide-vue-next'

const categories = bookmarksData.categories
const bookmarks = bookmarksData.bookmarks

const selectedCategory = ref('')
const searchQuery = ref('')

const filteredBookmarks = computed(() => {
  let result = bookmarks

  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(b => b.category === selectedCategory.value)
  }

  // 按搜索词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.description.toLowerCase().includes(query) ||
      b.url.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query)
    )
  }

  return result
})
</script>
