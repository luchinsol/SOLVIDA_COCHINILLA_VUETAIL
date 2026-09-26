<template>
  <div class="inventory-shell flex flex-col gap-6 w-full min-w-0 overflow-hidden">
    <HeaderSection
      v-if="parentTab === 'inventario'"
      v-model:view="inventoryView"
      title="Inventario"
    />

    <!-- CONTENIDO SEGÚN TAB PADRE -->
    <div v-if="parentTab === 'inventario' && inventoryView === 'lotes'">
      <!-- TABS HIJOS + SELECTOR -->
      <div class="flex justify-between items-center pb-4">
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

      </div>

      <!-- CONTENIDO HIJOS -->
      <div v-if="activeTab === 'insumos'" class="w-full min-w-0">
        <LoteInsumo
          v-model:inventario="almacenSeleccionado"
          @inventario-actualizado="actualizarResumen"
          @tipo-insumo-cambiado="tipoInsumoSeleccionado = $event"
        >
          <template #summary>
            <KardexCards
              class="my-6"
              :categoria="activeTab"
              :almacen-id="almacenSeleccionado"
              :tipo-insumo-id="tipoInsumoSeleccionado"
              :refresh-key="resumenVersion"
            />
          </template>
        </LoteInsumo>
      </div>

      <div v-if="activeTab === 'cochinilla'">
        <LoteCochinilla
          v-model:inventario="almacenSeleccionado"
          @inventario-actualizado="actualizarResumen"
          @tipo-lote-cambiado="tipoLoteCochinillaSeleccionado = $event"
        >
          <template #summary>
            <KardexCards
              class="my-6"
              :categoria="activeTab"
              :almacen-id="almacenSeleccionado"
              :tipo-lote="tipoLoteCochinillaSeleccionado"
              :refresh-key="resumenVersion"
            />
          </template>
        </LoteCochinilla>
      </div>

      <div v-if="activeTab === 'carmin'">
        <KardexCards
          class="mb-6"
          :categoria="activeTab"
          :almacen-id="almacenSeleccionado"
          :refresh-key="resumenVersion"
        />
        <LoteCarmin
          :inventario="almacenSeleccionado"
          @inventario-actualizado="actualizarResumen"
        />
      </div>

      <div v-if="activeTab === 'extracto'">
        <KardexCards
          class="mb-6"
          :categoria="activeTab"
          :almacen-id="almacenSeleccionado"
          :refresh-key="resumenVersion"
        />
        <LoteExtracto
          :inventario="almacenSeleccionado"
          @inventario-actualizado="actualizarResumen"
        />
      </div>
    </div>

    <AlmacenesView v-if="parentTab === 'inventario' && inventoryView === 'almacenes'" />

    <!-- KARDEX -->
    <div v-if="parentTab === 'kardex'">
      <KardexTable />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import KardexCards from '@/pages/inventario/kardex/KardexCards.vue'
import LoteCochinilla from '@/pages/inventario/lote_cochinilla/LoteCochinilla.vue'
import LoteExtracto from '@/pages/inventario/extracto/LoteExtracto.vue'
import LoteCarmin from '@/pages/inventario/lote_carmin/LoteCarmin.vue'
import HeaderSection from '@/pages/inventario/HeaderSection.vue'
import LoteInsumo from '@/pages/inventario/lote_insumo/LoteInsumo.vue'
import KardexTable from '@/pages/inventario/kardex/KardexTable.vue'
import AlmacenesView from '@/pages/inventario/AlmacenesView.vue'

// estado tabs
const route = useRoute()
const activeTab = ref('insumos')
const parentTab = ref('inventario')
const inventoryView = ref('lotes')
const permisos = JSON.parse(localStorage.getItem('permisos') || '[]')
const canViewKardex = permisos.includes('movimiento_almacen.ver')

// estado selector
const almacenSeleccionado = ref('todos')
const tipoInsumoSeleccionado = ref('')
const tipoLoteCochinillaSeleccionado = ref('')
const resumenVersion = ref(0)

const actualizarResumen = () => {
  resumenVersion.value += 1
}

watch(
  () => route.query.vista,
  (vista) => {
    parentTab.value = vista === 'kardex' && canViewKardex ? 'kardex' : 'inventario'
  },
  { immediate: true },
)

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
  @apply px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-red-600 hover:border-red-200 transition-colors;
}

.tab-active {
  @apply px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-red-600 border border-red-600 rounded-lg shadow-lg shadow-red-100;
}

.inventory-shell :deep(table) {
  @apply text-left border-collapse;
}

.inventory-shell :deep(thead) {
  @apply bg-slate-50/80 border-b border-slate-100;
}

.inventory-shell :deep(thead th) {
  background-color: rgb(248 250 252) !important;
  color: rgb(148 163 184) !important;
  @apply px-5 py-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap;
}

.inventory-shell :deep(tbody tr) {
  @apply border-b border-slate-100 transition-colors hover:bg-red-50/30;
}

.inventory-shell :deep(tbody td) {
  @apply px-5 py-4 text-[11px] text-slate-600;
}

.inventory-shell :deep(.overflow-x-auto) {
  scrollbar-color: rgb(203 213 225) transparent;
  scrollbar-width: thin;
}
</style>
