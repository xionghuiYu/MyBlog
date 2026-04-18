<template>
  <div>
    <div class="mb-8">
      <h1 class="font-display text-3xl font-bold text-primary mb-2">效率工具</h1>
      <p class="text-secondary">提升你工作效率的小工具</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ToolCard
        v-for="tool in tools"
        :key="tool.id"
        :tool="tool"
      />
    </div>
  </div>
</template>

<script setup>
import { tools } from '../../data/config.js'
import ToolCard from './ToolCard.vue'
</script>