<template>
  <span :class="badgeClass" class="px-2.5 py-1 rounded-full text-xs font-medium">
    {{ text }}
  </span>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  type: String,
  text: String,
})

const badgeClass = computed(() => {
  return {
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  }[props.type]
})
</script>
