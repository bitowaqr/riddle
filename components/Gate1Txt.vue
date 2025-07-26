<template>
  <div style="max-width: 600px" class="pt-20 text-gray-800">
    <div class="mb-4">
      <span @click="handleWordClick">Between</span> <span @click="handleWordClick">you</span> <span @click="handleWordClick">and</span> <span @click="handleWordClick">the</span> <span @click="handleWordClick">treasure</span> <span @click="handleWordClick">lie</span> <span @click="handleWordClick">four</span> <span @click="handleWordClick">challenges.</span>
    </div>
    <div class="mb-4">
      <span @click="handleWordClick">The</span> <span @click="handleWordClick">first</span> <span @click="handleWordClick">one</span> <span @click="handleWordClick">is</span> <span @click="handleWordClick">easy:</span> <span @click="handleWordClick">you</span> <span @click="handleWordClick">just</span> <span @click="handleWordClick">need</span> <span @click="handleWordClick">to</span> <span @click="handleWordClick">point</span> <span @click="handleWordClick">to</span> <span @click="handleWordClick">a</span> <span @click="handleWordClick">word.</span>
    </div>
    <div class="mb-4 whitespace-nowrap">
        <span @click="handleWordClick">Not</span> <span @click="handleWordClick">just</span> <span @click="handleWordClick">any</span> <span @click="handleWordClick">word.</span>
        </div>
    <div class="mb-4 whitespace-nowrap">
      <span @click="handleWordClick">It</span> <span @click="handleWordClick">must</span> <span @click="handleWordClick">be</span> <span @click="handleWordClick">the</span> <span @click="handleWordClick">right</span> <span @click="handleWordClick">word.</span>
      </div><div class="mb-4 whitespace-nowrap">
      
      <span @click="handleWordClick">But</span> <span @click="handleWordClick">once</span> <span @click="handleWordClick">you</span> <span @click="handleWordClick">point</span> <span @click="handleWordClick">to</span> <span @click="handleWordClick">this</span>
      <span @click="handleWordClick" data-word="correct"> word</span> <span @click="handleWordClick">you</span> <span @click="handleWordClick">will</span> <span @click="handleWordClick">let</span> <span @click="handleWordClick">through.</span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

// Gate 1 handler
const handleWordClick = (event) => {
  if (event.target.dataset.word === 'correct') {
    emit('update:modelValue', true)
  }
}
</script>