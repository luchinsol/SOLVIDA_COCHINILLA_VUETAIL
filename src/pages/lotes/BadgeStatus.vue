<template>
  <span class="px-2 py-0.5 text-[10px] font-bold rounded border" :class="classes">
    {{ label }}
  </span>
</template>

<script setup>
const props = defineProps({
  status: String,
})

const map = {
  success: {
    label: 'LIBERADO',
    classes: 'bg-green-100 text-green-600 border-green-200',
  },
  warning: {
    label: 'CUARENTENA',
    classes: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  },
}

const label = map[props.status]?.label || 'N/A'
const classes = map[props.status]?.classes
</script>
