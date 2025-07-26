<template>
  <div style="max-width: 600px" class="pt-20 text-gray-800">
    <div class="mb-4">
      <span @click="handleWordClick" style="cursor: default">Between</span> <span @click="handleWordClick" style="cursor: default">you</span> <span @click="handleWordClick" style="cursor: default">and</span> <span @click="handleWordClick" style="cursor: default">the</span> <span @click="handleWordClick" style="cursor: default">treasure</span> <span @click="handleWordClick" style="cursor: default">lie</span> <span @click="handleWordClick" style="cursor: default">four</span> <span @click="handleWordClick" style="cursor: default">challenges.</span>
    </div>
    <div class="mb-4">
      <span @click="handleWordClick" style="cursor: default">The</span> <span @click="handleWordClick" style="cursor: default">first</span> <span @click="handleWordClick" style="cursor: default">one</span> <span @click="handleWordClick" style="cursor: default">is</span> <span @click="handleWordClick" style="cursor: default">easy:</span> <span @click="handleWordClick" style="cursor: default">you</span> <span @click="handleWordClick" style="cursor: default">just</span> <span @click="handleWordClick" style="cursor: default">need</span> <span @click="handleWordClick" style="cursor: default">to</span> <span @click="handleWordClick" style="cursor: default">point</span> <span @click="handleWordClick" style="cursor: default">to</span> <span @click="handleWordClick" style="cursor: default">a</span> <span @click="handleWordClick" style="cursor: default">word.</span>
    </div>
    <div class="mb-4 whitespace-nowrap">
        <span @click="handleWordClick" style="cursor: default">Not</span> <span @click="handleWordClick" style="cursor: default">just</span> <span @click="handleWordClick" style="cursor: default">any</span> <span @click="handleWordClick" style="cursor: default">word.</span>
        </div>
    <div class="mb-4 whitespace-nowrap">
      <span @click="handleWordClick" style="cursor: default">It</span> <span @click="handleWordClick" style="cursor: default">must</span> <span @click="handleWordClick" style="cursor: default">be</span> <span @click="handleWordClick" style="cursor: default">the</span> <span @click="handleWordClick" style="cursor: default">right</span> <span @click="handleWordClick" style="cursor: default">word.</span>
      </div><div class="mb-4 whitespace-nowrap">
      
      <span @click="handleWordClick" style="cursor: default">But</span> <span @click="handleWordClick" style="cursor: default">once</span> <span @click="handleWordClick" style="cursor: default">you</span> <span @click="handleWordClick" style="cursor: default">point</span> <span @click="handleWordClick" style="cursor: default">to</span> <span @click="handleWordClick" style="cursor: default">this</span>
      <span @click="handleWordClick" style="cursor: default"> word</span> <span @click="handleWordClick" style="cursor: default">you</span> <span @click="handleWordClick" style="cursor: default">will</span> <span @click="handleWordClick" style="cursor: default">let</span> <span @click="handleWordClick" style="cursor: default">through.</span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

// Gate 1 handler
const handleWordClick = (target) => {
  if(target.target.innerText !== ' word') return
  emit('update:modelValue', true)
}
</script>