<template>
  <div class="max-w-md mx-auto">
    <div class="card p-8 text-center">
      <h2 class="font-display text-xl font-semibold text-primary mb-6">番茄钟</h2>

      <div class="mb-8">
        <div
          class="text-7xl font-mono font-bold text-primary mb-2 tabular-nums"
          :class="{ 'text-accent': isRunning && !isBreak, 'text-green-600': isBreak }"
        >
          {{ formattedTime }}
        </div>
        <p class="text-secondary">
          {{ isBreak ? '休息时间' : '专注时间' }}
        </p>
      </div>

      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="startTimer"
          :disabled="isRunning"
          class="btn bg-accent hover:bg-blue-600 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play class="w-5 h-5 inline mr-2" />
          开始
        </button>
        <button
          @click="pauseTimer"
          :disabled="!isRunning"
          class="btn bg-muted hover:bg-secondary text-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pause class="w-5 h-5 inline mr-2" />
          暂停
        </button>
        <button
          @click="resetTimer"
          class="btn bg-muted hover:bg-secondary text-primary px-8"
        >
          <RotateCcw class="w-5 h-5 inline mr-2" />
          重置
        </button>
      </div>

      <div class="flex justify-center gap-2 text-sm">
        <button
          @click="setWorkDuration"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            !isBreak && !isRunning ? 'bg-accent text-white' : 'bg-muted text-secondary'
          ]"
        >
          专注 25 分钟
        </button>
        <button
          @click="setBreakDuration"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            isBreak && !isRunning ? 'bg-green-600 text-white' : 'bg-muted text-secondary'
          ]"
        >
          休息 5 分钟
        </button>
      </div>

      <div v-if="completedPomodoros > 0" class="mt-6 pt-6 border-t border-border">
        <p class="text-secondary text-sm">
          已完成 <span class="text-accent font-bold">{{ completedPomodoros }}</span> 个番茄钟
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Play, Pause, RotateCcw } from 'lucide-vue-next'

const WORK_DURATION = 25 * 60 // 25 分钟
const BREAK_DURATION = 5 * 60 // 5 分钟

const timeLeft = ref(WORK_DURATION)
const isRunning = ref(false)
const isBreak = ref(false)
const completedPomodoros = ref(0)
let timer = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleTimerComplete()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const resetTimer = () => {
  pauseTimer()
  if (isBreak.value) {
    timeLeft.value = BREAK_DURATION
  } else {
    timeLeft.value = WORK_DURATION
  }
}

const setWorkDuration = () => {
  pauseTimer()
  isBreak.value = false
  timeLeft.value = WORK_DURATION
}

const setBreakDuration = () => {
  pauseTimer()
  isBreak.value = true
  timeLeft.value = BREAK_DURATION
}

const handleTimerComplete = () => {
  pauseTimer()

  if (isBreak.value) {
    // 休息结束，回到专注时间
    isBreak.value = false
    timeLeft.value = WORK_DURATION
  } else {
    // 专注结束，增加完成数
    completedPomodoros.value++
    isBreak.value = true
    timeLeft.value = BREAK_DURATION
  }

  // 播放提示音（可选）
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleAAAAAAAA//8=')
    audio.play().catch(() => {})
  } catch (error) {
    // 忽略音频播放错误
  }
}

onMounted(() => {
  // 加载完成数
  try {
    const saved = localStorage.getItem('blog-pomodoros')
    if (saved) {
      completedPomodoros.value = parseInt(saved, 10)
    }
  } catch (error) {
    console.error('Failed to load pomodoros:', error)
  }
})

onUnmounted(() => {
  pauseTimer()
})

// 监听完成数变化
import { watch } from 'vue'
watch(completedPomodoros, (newValue) => {
  try {
    localStorage.setItem('blog-pomodoros', String(newValue))
  } catch (error) {
    console.error('Failed to save pomodoros:', error)
  }
})
</script>