<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('filter', category)"
      class="px-4 py-2 rounded-button text-sm font-medium transition-all duration-200"
      :class="selectedCategory === category
        ? 'bg-accent text-white'
        : 'bg-muted text-secondary hover:bg-secondary'"
    >
      {{ category === '' ? '全部' : category }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    default: ''
  }
})

defineEmits(['filter'])
</script>