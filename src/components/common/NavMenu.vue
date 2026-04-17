<template>
  <nav class="hidden md:flex items-center gap-6">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="text-secondary hover:text-accent transition-colors font-medium"
      active-class="text-accent"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
const navItems = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '博客' },
  { path: '/bookmarks', label: '收藏' },
  { path: '/tools', label: '工具' }
]
</script>
