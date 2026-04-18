<template>
  <a
    :href="bookmark.url"
    target="_blank"
    rel="noopener noreferrer"
    class="card p-5 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 group block"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
        <ExternalLink class="w-5 h-5 text-accent" />
      </div>
      <span class="text-xs px-2 py-1 bg-muted text-secondary rounded-full">
        {{ bookmark.category }}
      </span>
    </div>

    <h3 class="font-display text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
      {{ bookmark.title }}
    </h3>

    <p class="text-secondary text-sm mb-3 line-clamp-2">
      {{ bookmark.description }}
    </p>

    <div class="text-xs text-secondary/70 flex items-center">
      <Globe class="w-3 h-3 mr-1" />
      <span class="truncate">{{ bookmark.url }}</span>
    </div>
  </a>
</template>

<script setup>
import { ExternalLink, Globe } from 'lucide-vue-next'

const props = defineProps({
  bookmark: {
    type: Object,
    required: true
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