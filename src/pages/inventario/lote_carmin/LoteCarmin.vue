<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <button
      @click="crear"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote carmin
    </button>
  </div>

  <!-- TABLA + PAGINADOR-->
  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left">ID Lote Carmin</th>
            <th class="px-4 py-3 text-left">Almacén ID</th>
            <th class="px-4 py-3 text-left">Análisis Actual ID</th>
            <th class="px-4 py-3 text-left">Proceso Laqueo ID</th>
            <th class="px-4 py-3 text-left">Proceso Molienda ID</th>
            <th class="px-4 py-3 text-left">Proceso Mezclado ID</th>
            <th class="px-4 py-3 text-left">Código Lote</th>
            <th class="px-4 py-3 text-left">Tipo Lote</th>
            <th class="px-4 py-3 text-right">Masa Total (kg)</th>
            <th class="px-4 py-3 text-right">Concentración AC Actual</th>
            <th class="px-4 py-3 text-right">Humedad Actual</th>
            <th class="px-4 py-3 text-right">Color L</th>
            <th class="px-4 py-3 text-right">Color A</th>
            <th class="px-4 py-3 text-right">Color B</th>
            <th class="px-4 py-3 text-left">Estado Lote</th>
            <th class="px-4 py-3 text-left">Observaciones</th>
            <th class="px-4 py-3 text-left">Creado En</th>
            <th class="px-4 py-3 text-left">Calidad Lote</th>
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
                <span class="text-sm text-gray-500">Cargando lotes carmin...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="carmin.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in carmin"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- ID Lote Carmin -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.lote_carmin_id }}</div>
            </td>

            <!-- Almacen ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.almacen_id || '-' }}</div>
            </td>

            <!-- Analisis Actual ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.analisis_actual_id || '-' }}</div>
            </td>

            <!-- Proceso Laqueo ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.proceso_laqueo_id || '-' }}</div>
            </td>

            <!-- Proceso Molienda ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.proceso_molienda_id || '-' }}</div>
            </td>

            <!-- Proceso Mezclado ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.proceso_mezclado_id || '-' }}</div>
            </td>

            <!-- Código Lote -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.codigo_lote || '-' }}</div>
            </td>

            <!-- Tipo Lote -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.tipo_lote || '-' }}</div>
            </td>

            <!-- Masa Total -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.masa_total_kg || '-' }}
            </td>

            <!-- Concentración AC Actual -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.concentracion_ac_actual || '-' }}
            </td>

            <!-- Humedad Actual -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.humedad_actual || '-' }}
            </td>

            <!-- Color L -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.color_l_actual || '-' }}
            </td>

            <!-- Color A -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.color_a_actual }}
            </td>

            <!-- Color B -->
            <td class="px-4 py-2 text-right text-xs font-bold text-gray-900">
              {{ item.color_b_actual }}
            </td>

            <!-- Estado Lote -->
            <td class="px-4 py-2 text-xs">
              <span class="px-2 py-1 rounded text-xs font-bold">
                {{ item.estado_lote }}
              </span>
            </td>

            <!-- Observaciones -->
            <td class="px-4 py-2 text-xs">
              <div class="text-gray-700">
                {{ item.observaciones }}
              </div>
            </td>

            <!-- Creado En -->
            <td class="px-4 py-2 text-xs">
              <div class="text-gray-900">
                {{ item.creado_en }}
              </div>
            </td>

            <!-- Calidad Lote -->
            <td class="px-4 py-2 text-xs">
              <div class="text-gray-900">
                {{ item.calidad_lote || '-' }}
              </div>
            </td>

            <!-- Acción -->
            <td class="px-4 py-3 text-center">
              <div
                class="flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition"
              >
                <!-- VER -->
                <button
                  @click="verDetalle(item)"
                  class="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                  title="Ver detalle"
                >
                  <i class="fa-solid fa-eye"></i>
                </button>

                <!-- EDITAR -->
                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                  title="Editar"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>

                <!-- ELIMINAR -->
                <button
                  @click="confirmarEliminar(item)"
                  class="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                  title="Eliminar"
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

  <!-- SHOW DIALOG DE REGISTRO ELIMINACIÓN-->
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

/// PROPS
const props = defineProps({
  inventario: {
    type: String,
    default: 'todos',
  },
})
const carmin = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)

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
  getLoteCarmin()
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
const getLoteCarmin = async (almacen) => {
  loading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/lotes-carmin`)
    const data = await response.data
    carmin.value = data
    await delay(1000) // Simula un retraso para mostrar el spinner console.log('Insumos:', data)
  } catch (error) {
    console.error('Error fetching insumos:', error)
  } finally {
    loading.value = false
  }
}

/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
watch(
  () => props.inventario,
  (nuevo) => {
    getLoteCarmin(nuevo)
  },
  { immediate: true },
)
</script>
