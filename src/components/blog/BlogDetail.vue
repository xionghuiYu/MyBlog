<template>
  <article class="max-w-3xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
      <p class="text-secondary mt-4">加载中...</p>
    </div>

    <div v-else-if="!post" class="text-center py-12">
      <p class="text-secondary">文章未找到</p>
      <router-link to="/blog" class="btn bg-accent hover:bg-blue-600 text-white mt-4">
        返回博客列表
      </router-link>
    </div>

    <div v-else>
      <router-link
        to="/blog"
        class="inline-flex items-center text-secondary hover:text-accent mb-6 transition-colors"
      >
        ← 返回列表
      </router-link>

      <header class="mb-8">
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <h1 class="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
          {{ post.title }}
        </h1>

        <div class="flex items-center text-secondary text-sm">
          <Calendar class="w-4 h-4 mr-2" />
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
      </header>

      <div
        class="prose prose-lg dark:prose-invert max-w-none"
        v-html="post.html"
      ></div>

      <div class="mt-12 pt-8 border-t border-border">
        <router-link
          to="/blog"
          class="btn bg-muted hover:bg-secondary text-primary"
        >
          <ArrowLeft class="w-4 h-4 mr-2 inline" />
          返回博客列表
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPostBySlug } from '../../utils/fetch.js'
import { formatDate } from '../../utils/date.js'
import { ArrowLeft, Calendar } from 'lucide-vue-next'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

const loadPost = async (slug) => {
  loading.value = true
  try {
    post.value = await fetchPostBySlug(slug)
  } catch (error) {
    console.error('Failed to load post:', error)
    post.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadPost(route.params.slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadPost(newSlug)
  }
})
</script>