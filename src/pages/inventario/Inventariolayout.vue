<!-- App.vue -->
<template>
  <div class="min-h-screen bg-background text-textMain w-full overflow-x-hidden">
    <div class="p-6 lg:p-8 space-y-6">
      <HeaderSection />
      <KpiGrid />
      <KardexTable />
      <BottomSection />
    </div>
  </div>
</template>

<script setup>
import HeaderSection from '@/pages/inventario/HeaderSection.vue'
import KpiGrid from '@/pages/inventario/KpiGrid.vue'
import KardexTable from '@/pages/inventario/KardexTable.vue'
import BottomSection from '@/pages/inventario/BottomSection.vue'
</script>
