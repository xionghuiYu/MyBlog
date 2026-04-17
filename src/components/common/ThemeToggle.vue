<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg hover:bg-muted transition-colors"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../../stores/theme'

const { isDark, toggleTheme } = useTheme()
</script>
