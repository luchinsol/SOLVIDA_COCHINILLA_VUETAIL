<!-- App.vue -->
<template>
  <div class="flex flex-col gap-6">
    <HeaderSection />
    <KpiGrid />
    <KardexTable />
  </div>
</template>

<script setup>
import HeaderSection from '@/pages/inventario/HeaderSection.vue'
import KpiGrid from '@/pages/inventario/KpiGrid.vue'
import KardexTable from '@/pages/inventario/KardexTable.vue'
import BottomSection from '@/pages/inventario/BottomSection.vue'
</script>
