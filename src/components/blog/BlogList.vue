<template>
  <div>
    <div class="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div>
        <h1 class="font-display text-3xl font-bold text-primary mb-2">博客文章</h1>
        <p class="text-secondary">分享我的思考和发现</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="搜索文章..."
          class="px-4 py-2 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />

        <select
          v-model="selectedTag"
          class="px-4 py-2 rounded-input border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <option value="">所有标签</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
      <p class="text-secondary mt-4">加载中...</p>
    </div>

    <div v-else-if="filteredPosts.length === 0" class="text-center py-12">
      <p class="text-secondary">没有找到相关文章</p>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.slug"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchPostsIndex, searchPosts, filterPostsByTag, getAllTags } from '../../utils/fetch.js'
import BlogCard from './BlogCard.vue'

const posts = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedTag = ref('')

const allTags = computed(() => getAllTags(posts.value))

const filteredPosts = computed(() => {
  let result = posts.value

  if (searchQuery.value) {
    result = searchPosts(result, searchQuery.value)
  }

  if (selectedTag.value) {
    result = filterPostsByTag(result, selectedTag.value)
  }

  return result
})

onMounted(async () => {
  try {
    posts.value = await fetchPostsIndex()
  } catch (error) {
    console.error('Failed to load posts:', error)
  } finally {
    loading.value = false
  }
})
</script>