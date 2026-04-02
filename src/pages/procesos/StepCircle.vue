<template>
  <div class="flex flex-col items-center">
    <div
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center font-bold border-4',
        active ? 'bg-primary text-white border-white' : 'bg-slate-100 text-slate-400 border-white',
      ]"
    >
      {{ number }}
    </div>
    <span :class="active ? 'text-primary font-semibold' : 'text-slate-400'" class="text-xs mt-2">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  number: String,
  label: String,
  active: Boolean,
})
</script>
