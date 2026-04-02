<template>
  <div class="min-h-screen bg-white text-gray-800 flex flex-col">
    <div class="p-6 lg:p-10 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Gestión de Lotes y Trazabilidad</h1>
          <p class="text-sm text-gray-500">
            Rastreo completo one-up/one-down y genealogía de producción.
          </p>
        </div>

        <div class="flex gap-3">
          <button class="btn-outline"><i class="fa-solid fa-filter"></i> Filtros</button>
          <button class="btn-primary"><i class="fa-solid fa-plus"></i> Nuevo Lote</button>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- LEFT -->
        <div class="flex flex-col gap-6">
          <LotSearch />
          <LotList />
        </div>

        <!-- RIGHT -->
        <div class="xl:col-span-2 flex flex-col gap-6">
          <LotSummary />
          <LotGenealogy />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 flex items-center gap-2;
}
.btn-outline {
  @apply px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-100;
}
</style>

<script setup>
import AppHeader from '@/pages/lotes/AppHeader.vue'
import LotSearch from '@/pages/lotes/LotSearch.vue'
import LotList from '@/pages/lotes/LotList.vue'
import LotSummary from '@/pages/lotes/LotSummary.vue'
import LotTabs from '@/pages/lotes/LotTabs.vue'
import LotGenealogy from '@/pages/lotes/GenealogyTree.vue'
</script>
