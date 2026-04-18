<template>
  <router-link
    :to="tool.route"
    class="card p-6 hover:shadow-lg transition-all duration-300 ease-out-cubic hover:-translate-y-1 group"
  >
    <div class="flex items-start justify-between mb-4">
      <div :class="`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`">
        <component :is="iconComponent" class="w-6 h-6 text-white" />
      </div>
      <ArrowRight class="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
    </div>

    <h3 class="font-display text-xl font-semibold text-primary mb-2">
      {{ tool.name }}
    </h3>

    <p class="text-secondary text-sm">
      {{ tool.description }}
    </p>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import {
  CheckSquare,
  Timer,
  FileText,
  ArrowRight
} from 'lucide-vue-next'

const props = defineProps({
  tool: {
    type: Object,
    required: true
  }
})

const iconComponent = computed(() => {
  const icons = {
    'check-square': CheckSquare,
    'timer': Timer,
    'file-text': FileText
  }
  return icons[props.tool.icon] || FileText
})
</script>