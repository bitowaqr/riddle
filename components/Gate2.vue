<template>
  <div class="fixed inset-0 z-10 overflow-hidden">
    <!-- Content wrapper -->
    <div class="absolute inset-0 bg-white text-gray-900 flex items-center justify-center p-10 flex-col">
      <div class="text-center mb-16">
        <p class="text-2xl font-light tracking-wide text-gray-700">
          Now, this one, you cannot tackle straight on.<br>You have to think in circles, at least five revolutions.
        </p>
      </div>

      <div style="min-height: 120px; display: flex; align-items: center; justify-content: center;">
        <div
          ref="dotRef"
          class="bg-black rounded-full transition-all duration-500 ease-out"
          :style="dotStyle"
          :class="{ 'pulse-animation': isPulsing }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const emit = defineEmits(['complete'])

const dotRef = ref(null)
const completedCircles = ref(0)
const isCompleting = ref(false)
const isPulsing = ref(false)

// Motion tracking refs
const totalRotation = ref(0)
const lastAngle = ref(null)

const REQUIRED_CIRCLES = 5

watch(completedCircles, (newValue, oldValue) => {
  if (newValue > oldValue && newValue < REQUIRED_CIRCLES) {
    isPulsing.value = true
    setTimeout(() => {
      isPulsing.value = false
    }, 500) // Corresponds to pulse animation duration
  }
})

const dotStyle = computed(() => {
  if (isCompleting.value) {
    return {
      width: '200vmax',
      height: '200vmax',
      transition: 'width 0.7s ease-in, height 0.7s ease-in',
      position: 'absolute',
      zIndex: 100,
    }
  }

  const baseSize = 24
  const growth = 12
  const size = baseSize + completedCircles.value * growth

  return {
    width: `${size}px`,
    height: `${size}px`,
  }
})

const handlePointerMove = (e) => {
  if (completedCircles.value >= REQUIRED_CIRCLES || !dotRef.value) return

  const rect = dotRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // Use clientX/clientY for both mouse and touch
  const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)
  
  const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2))

  const trackingRadius = 400 // Increased from 100 to better capture wide circular motions
  
  if (distance < trackingRadius) {
    const angle = Math.atan2(clientY - centerY, clientX - centerX)

    if (lastAngle.value !== null) {
      let angleDiff = angle - lastAngle.value
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI

      totalRotation.value += angleDiff

      if (Math.abs(totalRotation.value) > Math.PI * 2) {
        completedCircles.value++
        totalRotation.value = 0

        if (completedCircles.value >= REQUIRED_CIRCLES) {
          isCompleting.value = true
          setTimeout(() => {
            emit('complete')
          }, 800)
        }
      }
    }
    lastAngle.value = angle
  } else {
    lastAngle.value = null
    totalRotation.value = 0
  }
}

const handleTouchMove = (e) => {
  e.preventDefault() // Prevent scrolling
  handlePointerMove(e)
}

onMounted(() => {
  document.addEventListener('mousemove', handlePointerMove)
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handlePointerMove)
  document.removeEventListener('touchmove', handleTouchMove)
})
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-animation {
  animation: pulse 0.5s ease-in-out;
}
</style>