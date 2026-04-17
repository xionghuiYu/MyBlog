import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog-theme'

const isDark = ref(false)

const initTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
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
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  applyTheme()
}

watch(isDark, (newValue) => {
  localStorage.setItem(STORAGE_KEY, newValue ? 'dark' : 'light')
  applyTheme()
})

initTheme()

export const useTheme = () => ({
  isDark,
  toggleTheme
})
