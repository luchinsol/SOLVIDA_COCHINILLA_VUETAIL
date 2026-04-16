<template>
  <div class="flex flex-col gap-6 w-full min-w-0 overflow-hidden">
    <HeaderSection />

    <!-- TABS PADRE -->
    <div class="flex gap-4 border-b pb-3">
      <button
        @click="parentTab = 'inventario'"
        :class="parentTab === 'inventario' ? 'tab-active' : 'tab'"
      >
        Inventario
      </button>

      <button @click="parentTab = 'kardex'" :class="parentTab === 'kardex' ? 'tab-active' : 'tab'">
        Kardex
      </button>
    </div>

    <!-- CONTENIDO SEGÚN TAB PADRE -->
    <div v-if="parentTab === 'inventario'">
      <!-- TABS HIJOS + SELECTOR -->
      <div class="flex justify-between items-center border-b pb-2">
        <!-- TABS -->
        <div class="flex gap-2">
          <button
            @click="activeTab = 'insumos'"
            :class="activeTab === 'insumos' ? 'tab-active' : 'tab'"
          >
            Lote Insumo
          </button>

          <button
            @click="activeTab = 'cochinilla'"
            :class="activeTab === 'cochinilla' ? 'tab-active' : 'tab'"
          >
            Lote Cochinilla
          </button>

          <button
            @click="activeTab = 'carmin'"
            :class="activeTab === 'carmin' ? 'tab-active' : 'tab'"
          >
            Lote Carmin
          </button>

          <button
            @click="activeTab = 'extracto'"
            :class="activeTab === 'extracto' ? 'tab-active' : 'tab'"
          >
            Extracto
          </button>
        </div>

        <!-- SELECTOR -->
        <div class="relative">
          <select
            v-model="almacenSeleccionado"
            class="appearance-none bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-orange-500"
          >
            <option value="todos">Todos los Almacenes</option>
            <option value="1">Almacén 1</option>
            <option value="2">Almacén 2</option>
            <option value="3">Almacén 3</option>
            <option value="4">Almacén 4</option>
          </select>

          <i
            class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none"
          ></i>
        </div>
      </div>

      <!-- CONTENIDO HIJOS -->
      <div v-if="activeTab === 'insumos'" class="w-full min-w-0">
        <LoteInsumo :inventario="almacenSeleccionado" />
      </div>

      <div v-if="activeTab === 'cochinilla'">
        <LoteCochinilla :inventario="almacenSeleccionado" />
      </div>

      <div v-if="activeTab === 'carmin'">
        <MovimientoTable :inventario="almacenSeleccionado" />
      </div>

      <div v-if="activeTab === 'extracto'">
        <ProveedorTable />
      </div>
    </div>

    <!-- PRODUCCIÓN -->
    <div v-if="parentTab === 'produccion'">
      <p class="text-gray-500">Contenido de Producción (en construcción)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import LoteCochinilla from '@/pages/inventario/lote_cochinilla/LoteCochinilla.vue'
import ProveedorTable from '@/pages/inventario/proveedores/ProveedorTable.vue'
import MovimientoTable from '@/pages/inventario/movimientos/MovimientoTable.vue'
import HeaderSection from '@/pages/inventario/HeaderSection.vue'
import LoteInsumo from '@/pages/inventario/lote_insumo/LoteInsumo.vue'

// estado tabs
const activeTab = ref('insumos')
const parentTab = ref('inventario')

// estado selector
const almacenSeleccionado = ref('todos')

// resetear tab hijo al cambiar padre
watch(parentTab, () => {
  activeTab.value = 'insumos'
})

// (opcional) reaccionar al cambio de almacén
watch(almacenSeleccionado, (value) => {
  console.log('Almacén seleccionado:', value)
})
</script>

<style scoped>
.tab {
  @apply px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-orange-500;
}

.tab-active {
  @apply px-4 py-2 text-sm font-bold text-orange-500 border-b-2 border-orange-500;
}
</style>
