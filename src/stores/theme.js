import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog-theme'

const isDark = ref(false)

const initTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch (error) {
    console.error('Failed to initialize theme:', error)
    isDark.value = false
  }
  applyTheme()
}

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  // watch 会自动处理 localStorage 和应用主题
}

watch(isDark, (newValue) => {
  try {
    localStorage.setItem(STORAGE_KEY, newValue ? 'dark' : 'light')
    applyTheme()
  } catch (error) {
    console.error('Failed to persist theme:', error)
  }
})

initTheme()

export const useTheme = () => ({
  isDark,
  toggleTheme
})
