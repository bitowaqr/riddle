<template>
  <div class="fixed inset-0 z-10">
    <!-- Content wrapper -->
    <div v-if="!isSplitting" class="absolute inset-0 bg-black text-white flex items-center justify-center">
      <p class="text-3xl">
        You want this next door to open?
      </p>
      <p class="text-3xl">
        Then you you need tell it to do so.
      </p>
    </div>
    
    <!-- Split panels -->
    <div class="split-panel-left" :class="{ active: isSplitting }"></div>
    <div class="split-panel-right" :class="{ active: isSplitting }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['complete'])
const isSplitting = ref(false)
let typedSequence = ''

const handleKeyPress = (e) => {
  const key = e.key.toLowerCase()
  typedSequence += key
  
  if (typedSequence.slice(-4) === 'open') {
    isSplitting.value = true
    emit('complete')
  }
  
  // Keep sequence short
  if (typedSequence.length > 20) {
    typedSequence = typedSequence.slice(-10)
  }
}

onMounted(() => {
  document.addEventListener('keypress', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keypress', handleKeyPress)
})
</script>

<style scoped>
.split-panel-left,
.split-panel-right {
  @apply absolute top-0 w-full h-full bg-black transition-transform duration-[2500ms] ease-in-out;
}

.split-panel-left {
  @apply left-0;
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}

.split-panel-right {
  @apply left-0;
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
}

.split-panel-left.active {
  transform: translateX(-100%);
}

.split-panel-right.active {
  transform: translateX(100%);
}
</style>