<template>
  <div class="min-h-screen">
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
          欢迎来到我的博客
        </h1>
        <p class="text-secondary text-lg mb-12">
          分享生活、记录点滴、收藏有用资源
        </p>

        <div class="grid md:grid-cols-3 gap-6">
          <router-link
            to="/blog"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <FileText class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">博客</h2>
            <p class="text-secondary text-sm">阅读我的文章和随笔</p>
          </router-link>

          <router-link
            to="/bookmarks"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Bookmark class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">收藏</h2>
            <p class="text-secondary text-sm">有用的网站和资源</p>
          </router-link>

          <router-link
            to="/tools"
            class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 cursor-pointer group"
          >
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Wrench class="w-6 h-6 text-accent" />
            </div>
            <h2 class="font-display text-xl font-semibold text-primary mb-2">工具</h2>
            <p class="text-secondary text-sm">提高效率的小工具</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FileText, Bookmark, Wrench } from 'lucide-vue-next'
</script>
