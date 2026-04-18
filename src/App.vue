<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="font-display text-2xl font-bold text-primary">个人博客</h1>
        <button
          @click="toggleTheme"
          class="btn bg-muted hover:bg-secondary text-primary"
          aria-label="切换主题"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="card p-6 mb-6">
        <h2 class="font-display text-xl font-semibold mb-2">设计系统验证</h2>
        <p class="text-secondary mb-4">基础配置完成，测试颜色和主题切换</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-primary text-background p-3 rounded-sm text-sm">Primary</div>
          <div class="bg-secondary text-background p-3 rounded-sm text-sm">Secondary</div>
          <div class="bg-accent text-background p-3 rounded-sm text-sm">Accent</div>
          <div class="bg-muted text-primary p-3 rounded-sm text-sm">Muted</div>
        </div>

        <div class="space-y-2 text-sm">
          <p>当前主题: <strong>{{ isDark ? '深色' : '浅色' }}</strong></p>
          <p class="font-display">标题字体: Archivo</p>
          <p>正文字体: Space Grotesk</p>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="font-display text-xl font-semibold mb-2">待实现模块</h2>
        <ul class="list-disc list-inside text-secondary space-y-1">
          <li>路由与主题系统</li>
          <li>博客系统</li>
          <li>收藏系统</li>
          <li>工具系统</li>
          <li>测试系统</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useTheme } from './stores/theme'

const { isDark, toggleTheme } = useTheme()
</script>