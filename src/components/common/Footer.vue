<template>
  <footer class="border-t border-border mt-16">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-secondary text-sm">
          © {{ currentYear }} 个人博客. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-secondary hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github class="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@example.com"
            class="text-secondary hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Mail } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>
