<template>
  <article class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1">
    <router-link :to="`/blog/${post.slug}`" class="block">
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <h2 class="font-display text-xl font-semibold text-primary mb-2 hover:text-accent transition-colors">
        {{ post.title }}
      </h2>

      <p class="text-secondary text-sm mb-4 line-clamp-2">
        {{ post.summary }}
      </p>

      <div class="flex items-center justify-between text-sm text-secondary">
        <time :datetime="post.date">
          {{ formatDate(post.date) }}
        </time>
        <span class="text-accent">阅读更多 →</span>
      </div>
    </router-link>
  </article>
</template>

<script setup>
import { formatDate } from '../../utils/date.js'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>