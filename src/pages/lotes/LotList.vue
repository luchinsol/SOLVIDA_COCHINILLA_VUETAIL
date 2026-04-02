<template>
  <div class="bg-white rounded-xl border flex flex-col overflow-hidden">
    <div class="p-4 border-b flex justify-between">
      <h3 class="font-bold text-sm">Resultados (4)</h3>
    </div>

    <div class="p-2 space-y-2 max-h-[500px] overflow-y-auto">
      <LotItem active />
      <LotItem />
      <LotItem />
    </div>
  </div>
</template>

<script setup>
import LotItem from './LotItem.vue'
</script>
