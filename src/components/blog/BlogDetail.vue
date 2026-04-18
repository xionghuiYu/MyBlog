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
        <h3 class="text-xl font-semibold mb-4">评论</h3>
        <Giscus
          id="comments"
          :repo="repo"
          :repo-id="repoId"
          :category="category"
          :category-id="categoryId"
          :mapping="mapping"
          :strict="strict"
          :reactions-enabled="reactionsEnabled"
          :emit-metadata="emitMetadata"
          :input-position="inputPosition"
          :theme="theme"
          :lang="lang"
          :loading="lazyLoad"
        />
      </div>

      <div class="mt-12 pt-8 border-t border-border">
        <router-link
          to="/blog"
          class="btn bg-muted hover:bg-secondary text-primary"
        >
          ← 返回博客列表
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPostBySlug } from '../../utils/fetch.js'
import { formatDate } from '../../utils/date.js'
import { Calendar } from 'lucide-vue-next'
import Giscus from '@giscus/vue'
import { useTheme } from '../../stores/theme'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const { isDark } = useTheme()

// Giscus 配置
const repo = import.meta.env.VITE_GISCUS_REPO || 'your-username/your-repo'
const repoId = import.meta.env.VITE_GISCUS_REPO_ID || 'ABC123xyz'
const category = 'General'
const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID || 'DIC_kwDOABC1234'
const mapping = computed(() => `specific:${route.params.slug}`)
const strict = import.meta.env.VITE_GISCUS_STRICT || '0'
const reactionsEnabled = import.meta.env.VITE_GISCUS_REACTIONS_ENABLED || '1'
const emitMetadata = import.meta.env.VITE_GISCUS_EMIT_METADATA || '0'
const inputPosition = 'bottom'
const theme = computed(() => isDark.value ? 'dark_dimmed' : 'light')
const lang = 'zh-CN'
const lazyLoad = true

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