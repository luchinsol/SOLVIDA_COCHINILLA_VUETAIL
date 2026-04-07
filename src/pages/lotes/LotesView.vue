<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold mb-2">Gestión de Lotes y Calculadora</h1>
        <p class="text-sm text-gray-500">
          Rastreo completo one-up/one-down y genealogía de producción.
        </p>
      </div>

      <div class="flex gap-3">
        <button class="btn-outline"><i class="fa-solid fa-filter"></i> Filtros</button>
        <button class="btn-primary"><i class="fa-solid fa-plus"></i> Nuevo Lote</button>
      </div>
    </div>
    <!-- Tabs -->
    <div class="flex gap-2 border-b pb-2">
      <button
        @click="activeTab = 'trazabilidad'"
        :class="activeTab === 'trazabilidad' ? 'tab-active' : 'tab'"
      >
        Gestión de Lotes
      </button>

      <button @click="activeTab = 'nuevo'" :class="activeTab === 'nuevo' ? 'tab-active' : 'tab'">
        Calculadora de Mezclas
      </button>
    </div>

    <!-- CONTENIDO -->
    <div v-if="activeTab === 'trazabilidad'" class="grid grid-cols-1 xl:grid-cols-3 gap-8">
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

    <div v-if="activeTab === 'nuevo'" class="p-0">
      <!-- Aquí tu nuevo contenido -->
      <div class="bg-white p-6 rounded-xl shadow flex gap-4">
        <Calculadora1 />
        <Calculadora2 />
        <Calculadora3 />
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
.tab {
  @apply px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-orange-500;
}

.tab-active {
  @apply px-4 py-2 text-sm font-bold text-orange-500 border-b-2 border-orange-500;
}
</style>

<script setup>
import { ref } from 'vue'

import AppHeader from '@/pages/lotes/AppHeader.vue'
import LotSearch from '@/pages/lotes/LotSearch.vue'
import LotList from '@/pages/lotes/LotList.vue'
import LotSummary from '@/pages/lotes/LotSummary.vue'
import LotTabs from '@/pages/lotes/LotTabs.vue'
import Calculadora1 from '@/pages/lotes/Calculadora1.vue'
import LotGenealogy from '@/pages/lotes/GenealogyTree.vue'
import Calculadora2 from '@/pages/lotes/Calculadora2.vue'
import Calculadora3 from '@/pages/lotes/Calculadora3.vue'

// estado del tab
const activeTab = ref('trazabilidad')
</script>
