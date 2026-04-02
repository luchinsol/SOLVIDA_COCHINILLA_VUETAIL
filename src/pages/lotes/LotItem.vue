<template>
  <div
    :class="[
      'p-4 rounded-lg border cursor-pointer transition',
      active ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-400',
    ]"
  >
    <div class="flex justify-between mb-2">
      <span class="text-xs text-gray-500">Extracto Líquido</span>
      <BadgeStatus status="success" />
    </div>

    <h4 class="font-bold text-sm">EXT-2023-10-28-01</h4>

    <div class="flex justify-between mt-3 text-xs text-gray-500">
      <div>
        <p>28 Oct 2023</p>
        <p>Tanque T-102</p>
      </div>
      <span class="font-bold text-gray-800">450 kg</span>
    </div>
  </div>
</template>

<script setup>
import BadgeStatus from '@/pages/lotes/BadgeStatus.vue'

defineProps({
  active: Boolean,
})
</script>
