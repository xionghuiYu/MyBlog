<template>
  <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <PenTool class="w-5 h-5 text-white" />
        </div>
        <span class="font-display text-xl font-bold text-primary">博客</span>
      </router-link>

      <div class="flex items-center gap-4">
        <NavMenu />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { PenTool } from 'lucide-vue-next'
import NavMenu from './NavMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>
