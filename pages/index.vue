<template>
  <div style="">
    <!-- Gate 1 -->
    <div v-if="currentGate === 1" class="fixed inset-0 z-20 bg-transparent">
      <!-- Left panel -->
      <div style="position: absolute; top: 0; left: 0; width: 50%; height: 100%; overflow: hidden; "
           :style="{ transform: gate1Splitting ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 2s ease-in-out' }">
        <!-- Content positioned to show left half -->
        <div class="text-center pt-20 flex justify-center items-start absolute top-0 left-0 h-full w-[200%] bg-white" 
              >
          <Gate1Txt v-model="gate1Splitting" />
        </div>
      </div>
      
      <!-- Right panel -->
      <div style="" class="absolute top-0 right-0 h-full w-[50%] bg-white overflow-hidden"
           :style="{ transform: gate1Splitting ? 'translateX(100%)' : 'translateX(0)', transition: 'transform 2s ease-in-out' }">
        <!-- Content positioned to show right half -->
        <div class="text-center pt-20 flex justify-center items-start" 
             style="position: absolute; top: 0; left: -100%; width: 200%; height: 100%; ">
          <Gate1Txt v-model="gate1Splitting" />
        </div>
      </div>
    </div>

    <!-- Gate 2 -->
    <div v-if="currentGate === 2 || currentGate === 1">
      <Gate2 @complete="transitionToGate3" />
    </div>


      
    <!-- Gate 3 -->
    <div v-if="currentGate === 3" :style="gate3Style">
      <!-- Top Door Panel -->
      <div 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 50%; background: #000; transition: transform 2s ease-in-out;"
        :style="{ transform: gate3Opening ? 'translateY(-100%)' : 'translateY(0)' }"
      ></div>
      <!-- Bottom Door Panel -->
      <div
        style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: #000; transition: transform 2s ease-in-out;"
        :style="{ transform: gate3Opening ? 'translateY(100%)' : 'translateY(0)' }"
      ></div>
       <div 
        @click="gate3Input?.focus()"
        :style="gate3TextStyle" 
        style="position: relative; z-index: 1; cursor: pointer;" 
        class="text-center"
       >
         <input ref="gate3Input" v-model="typedSequence" type="text" style="position: absolute; top: -9999px; left: -9999px; opacity: 0; pointer-events: none;" aria-hidden="true">
         <p class="text-3xl">
         You want to go through this next door?!
         </p>
         <p class="text-3xl">
           Then you better tell it to <span class="italic">open</span>.
         </p>
         <p class="mt-2 text-xl text-gray-400">Otherwise it will stay shut.</p>
       </div>
    </div>
    
    <!-- Gate 4 -->
    <div v-if="currentGate === 4 || currentGate === 3" :style="gate4Style">
      <div :style="gate4ContentStyle">
        <div style="text-align: center; max-width: 600px; padding: 40px;">
          <p>Perhaps the hardest challenge yet, given where we meet, but...</p>
          <p style="font-size: 18px; line-height: 1.8; margin-bottom: 60px; opacity: 0.8; font-style: italic;">
            "They also serve who only stand and wait."<br>
            <span style="font-size: 14px; opacity: 0.6;">— John Milton</span>
          </p>
          
          <!-- Dots container -->
          <div style="display: flex; justify-content: center; align-items: center; min-height: 40px;">
            <div v-for="i in dots" :key="i" 
                 style="width: 4px; height: 4px; background: white; border-radius: 50%; margin: 0 3px;">
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Gate 5 - Final -->
    <div v-if="currentGate === 5" style="position: fixed; inset: 0; background: #000; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px;">
      <h2 
      class="text-xl text-center text-gray-200"
        style="margin-bottom: 20px; transition: opacity 1s ease-in;"
        :style="{ opacity: isGate5Ready ? 1 : 0 }"
      >
        You passed the challenges. You deserve this treat.
      </h2>
      <div class="present-box">
        <div class="video-container">
          <iframe width="560" height="315" :src="rickrollUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="wrapping" :class="{ 'fly-away': isBoxOpening, 'untying': isRibbonUntying }">
          <div class="ribbon ribbon-h"></div>
          <div class="ribbon ribbon-v"></div>
          <div class="flap flap-tl"></div>
          <div class="flap flap-tr"></div>
          <div class="flap flap-bl"></div>
          <div class="flap flap-br"></div>
        </div>
      </div>
    </div>

    <!-- Curtain Transition -->
    <div class="curtain" :class="{ 'is-falling': isCurtainFalling }"></div>
  </div>
</template>

<style>
.present-box {
  position: relative;
  width: 560px;
  height: 315px;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wrapping {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* Allows clicks to go through if needed */
}
.flap {
  position: absolute;
  background-color: #0d4b26; /* Dark Green */
  border: 1px solid #1a5c34;
  width: 50%;
  height: 50%;
  transition: all 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.flap-tl { top: 0; left: 0; }
.flap-tr { top: 0; right: 0; }
.flap-bl { bottom: 0; left: 0; }
.flap-br { bottom: 0; right: 0; }

.fly-away .flap {
  opacity: 0;
}
.fly-away .flap-tl { transform: translate(-100vw, -100vh) rotate(-180deg) scale(0.5); }
.fly-away .flap-tr { transform: translate(100vw, -100vh) rotate(180deg) scale(0.5); }
.fly-away .flap-bl { transform: translate(-100vw, 100vh) rotate(-180deg) scale(0.5); }
.fly-away .flap-br { transform: translate(100vw, 100vh) rotate(180deg) scale(0.5); }

.ribbon {
  position: absolute;
  background-color: #FFD700; /* Gold */
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  transition: all 0.4s ease-in-out;
  z-index: 11;
}
.ribbon-h {
  top: 50%;
  left: 0;
  width: 100%;
  height: 20px;
  transform: translateY(-50%);
}
.ribbon-v {
  top: 0;
  left: 50%;
  width: 20px;
  height: 100%;
  transform: translateX(-50%);
}
.untying .ribbon {
  transform: scale(0);
  opacity: 0;
}

.curtain {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 99;
  transition: top 1.5s ease-in-out;
}
.curtain.is-falling {
  top: 0;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const currentGate = ref(1)
const timer = ref(0)
const dots = ref(0)
const gate4ContentOpacity = ref(0)
const gate3TextOpacity = ref(0)
const gate3Opening = ref(false)
const gate4Opacity = ref(1)
const gate1Splitting = ref(false)
const rickrollUrl = ref('https://www.youtube.com/embed/dQw4w9WgXcQ')
let timerInterval = null
const gate3Input = ref(null)
const typedSequence = ref('')

// Gate 5 transition state
const isCurtainFalling = ref(false)
const isGate5Ready = ref(false)
const isBoxOpening = ref(false)
const isRibbonUntying = ref(false)

watch(gate1Splitting, (isSplitting) => {
  if (isSplitting) {
    // Transition to gate 2 after split animation completes
    setTimeout(() => {
      currentGate.value = 2
    }, 2500) // Animation is 2s, giving it a 500ms buffer.
  }
})

// Gate 4 style with fade
const gate4Style = computed(() => ({
  position: 'fixed',
  inset: 0,
  background: '#111',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20
}))

const gate4ContentStyle = computed(() => ({
  opacity: gate4ContentOpacity.value,
  transition: 'opacity 2s ease-in'
}))

const gate3Style = computed(() => ({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 30
}))

const gate3TextStyle = computed(() => ({
  fontSize: '32px',
  color: '#fff',
  opacity: gate3TextOpacity.value,
  transition: 'opacity 0.5s ease-out'
}))

const transitionToGate3 = () => {
  currentGate.value = 3
  setTimeout(() => {
    gate3TextOpacity.value = 1
    // Focus input to bring up keyboard on all devices
    gate3Input.value?.focus()
  }, 500)
}


// Watcher for Gate 3 input
watch(typedSequence, (newValue) => {
  if (currentGate.value !== 3 || gate3Opening.value) return

  if (newValue.toLowerCase().slice(-4) === 'open') {
    gate3Opening.value = true
    gate3TextOpacity.value = 0

    // After 2s door animation, fade in Gate 4 content
    setTimeout(() => {
      gate4ContentOpacity.value = 1
    }, 2000)

    setTimeout(() => {
      currentGate.value = 4
    }, 2500)

    startTimer()
  }

  // Keep the sequence from getting too long
  if (newValue.length > 20) {
    typedSequence.value = newValue.slice(-10)
  }
})

// Gate 4 timer with dots
const startTimer = () => {
  let dotInterval = setInterval(() => {
    dots.value++
    
    if (dots.value >= 7) { // 7 dots = 35 seconds
      clearInterval(dotInterval)
      
      // 1. Start fade out of gate 4
      gate4ContentOpacity.value = 0
      
      // 2. After fade, drop curtain
      setTimeout(() => {
        isCurtainFalling.value = true
      }, 1000)

      // 3. After curtain animation, switch to Gate 5 content
      setTimeout(() => {
        currentGate.value = 5
        // Gate 5 text and box are now visible
        isGate5Ready.value = true
        // and hide the curtain again to reveal gate 5
        setTimeout(() => { isCurtainFalling.value = false }, 100)
      }, 2500) // 1.5s for curtain animation

      // 4. Pre-start the video 1.5s before the reveal
      setTimeout(() => {
        rickrollUrl.value = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
      }, 5500)

      // 5. Start the unwrapping sequence after a longer delay
      setTimeout(() => {
        isRibbonUntying.value = true
      }, 7000)

      // 6. Open the present
      setTimeout(() => {
        isBoxOpening.value = true
      }, 7500) // 2.5s for curtain + 5s for user to read/anticipate
    }
  }, 5000) // Add a dot every 5 seconds
}

// Add temporary skip button for Gate 2
const skipGate2 = () => {
  currentGate.value = 3
}

onMounted(() => {
  const cheekyMessage = 'A curious mind, I see... But the secrets aren\'t in here. 😉';
  const style = 'color: #ffc107; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 3px #000;';

  const devToolsDetector = {
    _isOpen: false,
    toString() {
      // The console calls toString() automatically, which triggers our message.
      if (!this._isOpen) {
        console.log(`%c${cheekyMessage}`, style);
        this._isOpen = true;
      }
      return ' '; // Return a space to keep the console clean after our message.
    }
  };
  console.log('%c%s', 'color:transparent;', devToolsDetector);
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>