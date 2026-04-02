<template>
  <div>
    <p class="text-xs text-text-muted uppercase mb-1">{{ label }}</p>
    <p class="text-sm font-semibold">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
})
</script>
