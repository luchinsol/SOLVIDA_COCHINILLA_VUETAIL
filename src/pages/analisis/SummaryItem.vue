<template>
  <div class="bg-white border rounded-xl p-5 hover:shadow-md transition">
    <div class="flex items-center gap-3">
      <div :class="bgClass" class="w-10 h-10 rounded-lg flex items-center justify-center">
        <i :class="`fa-solid ${icon}`"></i>
      </div>
      <div>
        <p class="text-sm text-gray-500">{{ title }}</p>
        <h3 class="text-2xl font-bold">{{ value }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: String,
  icon: String,
  color: String,
})

const bgClass = {
  yellow: 'bg-yellow-100 text-yellow-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
}[props.color]
</script>
