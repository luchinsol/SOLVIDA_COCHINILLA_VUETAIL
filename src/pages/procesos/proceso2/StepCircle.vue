<template>
  <div class="flex flex-col items-center">
    <div
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-surface shadow-sm',
        statusClass,
      ]"
    >
      <i v-if="icon" :class="`fa-solid ${icon}`"></i>
      <span v-else>{{ step }}</span>
    </div>

    <span :class="labelClass" class="text-xs mt-2">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  status: String,
  label: String,
  step: Number,
  icon: String,
})

const statusClass = {
  done: 'bg-success text-white',
  active: 'bg-primary text-white',
  pending: 'bg-slate-100 text-slate-400',
}[props.status]

const labelClass = {
  done: 'text-success font-semibold',
  active: 'text-primary font-semibold',
  pending: 'text-slate-400',
}[props.status]
</script>
