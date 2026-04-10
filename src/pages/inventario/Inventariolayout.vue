<!-- App.vue -->
<template>
  <div class="flex flex-col gap-6">
    <HeaderSection />
    <div class="flex gap-2 border-b pb-2">
      <button
        @click="activeTab = 'insumos'"
        :class="activeTab === 'insumos' ? 'tab-active' : 'tab'"
      >
        Lote Insumo
      </button>

      <button @click="activeTab = 'lotes'" :class="activeTab === 'lotes' ? 'tab-active' : 'tab'">
        Almacén
      </button>

      <button
        @click="activeTab = 'movimientos'"
        :class="activeTab === 'movimientos' ? 'tab-active' : 'tab'"
      >
        Kardex
      </button>
      <button
        @click="activeTab = 'proveedores'"
        :class="activeTab === 'proveedores' ? 'tab-active' : 'tab'"
      >
        Proveedores
      </button>
    </div>
    <div v-if="activeTab === 'insumos'">
      <KpiGrid />
      <KardexTable />
    </div>

    <div v-if="activeTab === 'lotes'">
      <AlmacenTable />
    </div>

    <div v-if="activeTab === 'movimientos'">
      <MovimientoTable />
    </div>

    <div v-if="activeTab === 'proveedores'">
      <ProveedorTable />
    </div>
  </div>
</template>

<script setup>
import AlmacenTable from '@/pages/inventario/almacen/AlmacenTable.vue'
import ProveedorTable from '@/pages/inventario/proveedores/ProveedorTable.vue'
import MovimientoTable from '@/pages/inventario/movimientos/MovimientoTable.vue'
import HeaderSection from '@/pages/inventario/HeaderSection.vue'
import KpiGrid from '@/pages/inventario/KpiGrid.vue'
import KardexTable from '@/pages/inventario/KardexTable.vue'

import { computed, ref } from 'vue'

import { onMounted } from 'vue'

const activeTab = ref('insumos')
</script>
<style scoped>
.tab {
  @apply px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-orange-500;
}

.tab-active {
  @apply px-4 py-2 text-sm font-bold text-orange-500 border-b-2 border-orange-500;
}
</style>
