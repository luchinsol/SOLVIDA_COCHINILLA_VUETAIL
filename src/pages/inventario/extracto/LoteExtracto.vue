<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <!-- <button
      @click="crear"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear nuevo proveedor
    </button>
  --></div>

  <!-- TABLA + PAGINADOR-->
  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr></tr>
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-center">Almacén ID</th>
            <th class="px-4 py-3 text-left">Almacén</th>
            <th class="px-4 py-3 text-center">Análisis Actual ID</th>
            <th class="px-4 py-3 text-center">Proceso Filtrado ID</th>
            <th class="px-4 py-3 text-center">Proceso Filt. Código</th>
            <th class="px-4 py-3 text-left">Nombre Extracto</th>
            <th class="px-4 py-3 text-center">Tipo Extracto</th>
            <th class="px-4 py-3 text-right">Stock Inicial</th>
            <th class="px-4 py-3 text-right">Conc. AC Actual</th>

            <th class="px-4 py-3 text-center">Estado Lote</th>
            <th class="px-4 py-3 text-center">Observaciones</th>
            <th class="px-4 py-3 text-left">Fecha Creación</th>
            <th class="px-4 py-3 text-right">Stock Actual</th>

            <th class="px-4 py-3 text-center">UM Stock</th>

            <th class="px-4 py-3 text-right">Costo Total Inicial</th>
            <th class="px-4 py-3 text-right">Costo Total Actual</th>
            <th class="px-4 py-3 text-right">Costo Unitario</th>
            <th class="px-4 py-3 text-center">UM Dinero</th>

            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody>
          <!-- 🔄 LOADING -->
          <tr v-if="loading">
            <td colspan="11" class="text-center py-10">
              <div class="flex flex-col items-center gap-3">
                <div
                  class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
                ></div>
                <span class="text-sm text-gray-500">Cargando extractos...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="paginatedExtracto.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedExtracto"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.extracto_id }}</div>
            </td>

            <!-- Almacén ID -->
            <td class="px-4 py-2 text-xs text-center">
              {{ item.almacen_id || 'N/A' }}
            </td>

            <!-- Almacén -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.almacen_nombre }}</div>
            </td>

            <!-- Análisis Actual ID -->
            <td class="px-4 py-2 text-xs text-center">
              {{ item.analisis_actual_id || 'N/A' }}
            </td>

            <!-- Proceso Filtrado ID -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.proceso_filtrado_id }}</div>
            </td>

            <!-- Proceso Filtrado Código -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.proceso_filtrado_codigo || 'N/A' }}</div>
            </td>

            <!-- Nombre extracto -->
            <td class="px-4 py-3 text-center text-xs">
              {{ item.nombre_extracto || 'N/A' }}
            </td>

            <!-- Tipo extrato -->
            <td class="px-4 py-3 text-right text-xs">
              {{ item.tipo_extracto }}
            </td>

            <!-- Stock Inicial -->
            <td class="px-4 py-3 text-right text-xs font-bold">
              {{ item.stock_inial }}
            </td>

            <!-- Concentracion AC Actual -->
            <td class="px-4 py-3 text-right text-xs font-bold">
              {{ item.concentracion_ac_actual || 'N/A' }}
            </td>

            <!-- Estado lote -->
            <td class="px-4 py-3 text-right text-xs">
              {{ item.estado_lote }}
            </td>

            <!-- Observaciones -->
            <td class="px-4 py-3 text-right text-xs">
              {{ item.observaciones || 'Sin observaciones' }}
            </td>

            <!-- Fecha Creación -->
            <td class="px-4 py-3 text-xs">
              {{ item.creado_en }}
            </td>

            <!-- Stock Actual  -->
            <td class="px-4 py-3 text-left text-xs">
              {{ item.stock_actual }}
            </td>

            <!-- Unidad Medidad stock -->
            <td class="px-4 py-3 text-center text-xs">
              {{ item.unidad_medida_stock }}
            </td>

            <!-- Costo total inicial -->
            <td class="px-4 py-3 text-xs">
              {{ item.costo_total_inicial }}
            </td>

            <!-- Costo total actual -->
            <td class="px-4 py-3 text-xs">
              {{ item.costo_total_actual }}
            </td>

            <!-- Costo por unidad -->
            <td class="px-4 py-3 text-xs">
              {{ item.costo_por_unidad }}
            </td>

            <!-- Unidad medida dinero-->
            <td class="px-4 py-3 text-xs">
              {{ item.unidad_medida_dinero }}
            </td>

            <!-- Acción -->
            <td class="px-4 py-3 text-center">
              <div
                class="flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition"
              >
                <button
                  @click="verDetalle(item)"
                  class="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                >
                  <i class="fa-solid fa-eye"></i>
                </button>

                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>

                <button
                  @click="confirmarEliminar(item)"
                  class="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- CONTROL DE PÁGINAS -->
      <div class="flex justify-start items-center p-5 border-t">
        <!-- selector -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Mostrar:</span>

          <select
            v-model="perPage"
            @change="currentPage = 1"
            class="border rounded px-2 py-1 text-sm"
          >
            <option v-for="opt in perPageOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>

        <!-- controles -->
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            class="px-3 py-1 text-sm border rounded disabled:opacity-50"
            :disabled="currentPage === 1"
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <span class="text-sm"> Página {{ currentPage }} de {{ totalPages }} </span>

          <button
            @click="nextPage"
            class="px-3 py-1 text-sm border rounded disabled:opacity-50"
            :disabled="currentPage === totalPages"
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL ELIMINAR -->
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-80 shadow-lg">
      <h2 class="text-lg font-bold mb-4">Confirmar eliminación</h2>

      <p class="text-sm text-gray-600 mb-6">¿Seguro que deseas eliminar este registro?</p>

      <div class="flex justify-end gap-3">
        <button @click="showDeleteModal = false" class="px-4 py-2 text-sm border rounded-lg">
          Cancelar
        </button>

        <button @click="eliminar" class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { watch, computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const extracto = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const currentPage = ref(1) // PAGINACIÓN
const perPage = ref(4) // PAGINACIÓN
const perPageOptions = [4, 10, 15, 'All']

const props = defineProps({
  inventario: {
    type: String,
    default: 'todos',
  },
})
const eliminar = async () => {
  try {
    console.log('Eliminar:', selectedItem.value)

    // ejemplo:
    // await axios.delete(`/api/insumos/${selectedItem.value.insumo_id}`)

    showDeleteModal.value = false
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getExtracto()
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const verDetalle = (item) => {
  console.log('Ver detalle:', item)
}

const editar = (item) => {
  console.log('Editar:', item)
}

const confirmarEliminar = (item) => {
  selectedItem.value = item
  showDeleteModal.value = true
}
const getExtracto = async () => {
  loading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/extractos`)
    const data = await response.data
    extracto.value = data
    await delay(1000) // Simula un retraso para mostrar el spinner console.log('Insumos:', data)
  } catch (error) {
    console.error('Error fetching insumos:', error)
  } finally {
    loading.value = false
  }
}

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedExtracto = computed(() => {
  if (perPage.value === 'All') return extracto.value
  const start = (currentPage.value - 1) * perPage.value
  return extracto.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(extracto.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
watch(
  () => props.inventario,
  (nuevo) => {
    getExtracto(nuevo)
  },
  { immediate: true },
)
</script>
