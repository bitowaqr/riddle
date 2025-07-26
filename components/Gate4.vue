<template>
  <div class="fixed inset-0 z-10">
    <!-- Content wrapper -->
    <div v-if="!isSplitting" class="absolute inset-0 bg-stone-600 text-white flex flex-col items-center justify-center">
      <div class="text-8xl font-mono font-thin">{{ timer }}</div>
      <div class="w-5 h-5 bg-red-600 rounded-full mt-10 heartbeat"></div>
    </div>
    
    <!-- Split panels -->
    <div class="split-panel-top" :class="{ active: isSplitting }"></div>
    <div class="split-panel-bottom" :class="{ active: isSplitting }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['complete'])
const isSplitting = ref(false)
const timer = ref(0)
let interval = null
let startTime = null

onMounted(() => {
  startTime = Date.now()
  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    timer.value = elapsed
    
    if (elapsed >= 3) {
      clearInterval(interval)
      isSplitting.value = true
      emit('complete')
    }
  }, 100)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.heartbeat {
  animation: heartbeat 5s infinite;
}

@keyframes heartbeat {
  0%, 90% { 
    opacity: 0; 
    transform: scale(1); 
  }
  95% { 
    opacity: 1; 
    transform: scale(1.3); 
  }
  100% { 
    opacity: 0; 
    transform: scale(1); 
  }
}

.split-panel-top,
.split-panel-bottom {
  @apply absolute left-0 w-full h-full bg-black transition-transform duration-[2500ms] ease-in-out;
}

.split-panel-top {
  @apply top-0;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}

.split-panel-bottom {
  @apply top-0;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
}

.split-panel-top.active {
  transform: translateY(-100%);
}

.split-panel-bottom.active {
  transform: translateY(100%);
}
</style>