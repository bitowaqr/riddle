<template>
  <div class="fixed inset-0 z-10 bg-black text-white flex flex-col items-center justify-center gap-10">
    <h1 class="text-6xl tracking-[0.3em] animate-glow">You passed the challenges. You deserve this treat.</h1>
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
      frameborder="0" 
      allow="autoplay; encrypted-media" 
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
@keyframes glow {
  from { 
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff; 
  }
  to { 
    text-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff; 
  }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}
</style>