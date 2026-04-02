<template>
  <div class="flex justify-between items-center border rounded p-3">
    <div>
      <p class="font-medium">{{ name }}</p>
    </div>

    <input type="number" :value="value" class="border px-2 py-1 w-24 text-center rounded" />

    <span :class="statusClass" class="text-xs font-bold">
      {{ ok ? 'Cumple' : 'Fuera' }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  value: String,
  ok: Boolean,
  error: Boolean,
})

const statusClass = props.ok ? 'text-green-600' : 'text-red-600'
</script>
