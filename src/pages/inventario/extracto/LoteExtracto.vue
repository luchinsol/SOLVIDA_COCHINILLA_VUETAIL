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
            <th class="px-4 py-3 text-left bg-yellow-500 text-white">ID</th>
            <th class="px-4 py-3 text-left bg-gray-400 text-white">Almacén</th>
            <th class="px-4 py-3 text-center bg-purple-400 text-white">Proceso Filt. Código</th>
            <th class="px-4 py-3 text-left bg-green-400 text-white">Nombre Extracto</th>
            <th class="px-4 py-3 text-center bg-blue-400 text-white">Tipo Extracto</th>
            <th class="px-4 py-3 text-right bg-red-400 text-white">Stock Inicial</th>
            <th class="px-4 py-3 text-right bg-gray-400 text-white">Stock Actual</th>
            <th class="px-4 py-3 text-right bg-gray-400 text-white">Conc. AC Actual</th>

            <th class="px-4 py-3 text-center bg-gray-400 text-white">Estado Lote</th>
            <th class="px-4 py-3 text-center bg-gray-400 text-white">Observaciones</th>
            <th class="px-4 py-3 text-left bg-gray-400 text-white">Fecha Creación</th>

            <th class="px-4 py-3 text-right bg-purple-400 text-white">Costo Total Inicial</th>
            <th class="px-4 py-3 text-right bg-red-400 text-white">Costo Total Actual</th>
            <th class="px-4 py-3 text-right bg-blue-400 text-white">Costo Unitario</th>

            <th class="px-4 py-3 text-center bg-yellow-400 text-black">Acciones</th>
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

            <!-- Almacén -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.almacen_nombre }}</div>
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

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_inicial }}
                </span>

                <span class="text-[14px] text-red-900 font-bold">
                  {{ item.unidad_medida_stock }}
                </span>
              </div>
            </td>

            <!-- Stock Actual  -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_actual }}
                </span>

                <span class="text-[14px] text-red-900 font-bold">
                  {{ item.unidad_medida_stock }}
                </span>
              </div>
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

            <!-- Costo total inicial -->

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_total_inicial }}
                </span>

                <span class="text-[14px] text-red-900 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>

            <!-- Costo total actual -->

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_total_actual }}
                </span>

                <span class="text-[14px] text-red-900 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>

            <!-- Costo por unidad -->

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_por_unidad }}
                </span>

                <span class="text-[14px] text-red-900 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>

            <!-- Acción -->
            <td class="px-4 py-3 text-center">
              <div
                class="flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition"
              >
                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                >
                  <i class="fa-solid fa-pen"></i>
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

  <!-- SHOW DIALOG RESULTADO -->
  <div
    v-if="showResultadoModalExtracto"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="p-6 rounded-xl w-[400px] shadow-lg text-center"
      :class="resultType === 'success' ? 'bg-green-100' : 'bg-red-100'"
    >
      <h2 class="text-xl font-bold mb-4 text-gray-900">
        {{ resultType === 'success' ? 'Operación exitosa' : 'Error' }}
      </h2>

      <p class="mb-6">
        {{ resultMessage }}
      </p>

      <button
        @click="showResultadoModalExtracto = false"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        Aceptar
      </button>
    </div>
  </div>

  <!-- SHOW DIALOG DE ACTULIZAR COCHINILLA-->
  <div
    v-if="showUpdateExtractoModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Actualizar Lote Extracto</h2>

      <div class="flex flex-col gap-6">
        <!-- 🔹 BLOQUE 1 -->

        <!-- ACTUALIZAR ESTADO LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Estado de lote</h3>

          <div class="grid grid-cols-1 gap-4">
            <select v-model="updateForm.estado_lote" class="input">
              <option disabled value="">Estado del lote</option>
              <option value="disponible">Disponible</option>
              <option value="por analizar">Por analizar</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="agotado">Agotado</option>
            </select>
            <button
              @click="actualizarEstadoLoteExtracto"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Estado
            </button>
          </div>
        </div>

        <!-- ACTUALIZAR STOCK ACTUAL LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Stock actual</h3>

          <div class="grid grid-cols-1 gap-4">
            <input
              v-model="updateForm.stock_actual"
              type="number"
              placeholder="Stock actual"
              class="input"
            />
            <button
              @click="actualizarStockActualExtracto"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Stock
            </button>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            @click="showUpdateExtractoModal = false"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            <i class="fa-solid fa-close"></i>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { watch, computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { parse } from 'vue/compiler-sfc'

const extracto = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const currentPage = ref(1) // PAGINACIÓN
const perPage = ref(4) // PAGINACIÓN
const perPageOptions = [4, 10, 15, 'All']

const showUpdateExtractoModal = ref(false)
const updateForm = ref({
  id: null,
  estado_lote: '',
  stock_actual: 0,
})
const showResultadoModalExtracto = ref(false)
const resultMessage = ref('')
const resultType = ref('success')

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
  showUpdateExtractoModal.value = true
  updateForm.value = {
    id: item.extracto_id,
    estado_lote: item.estado_lote,
    stock_actual: item.stock_actual,
  }
}

const actualizarEstadoLoteExtracto = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.patch(`${baseURL}/extractos/${updateForm.value.id}/estado-lote`, {
      estado_lote: updateForm.value.estado_lote,
    })
    if (response.status === 200) {
      // mostrar resultado
      showUpdateExtractoModal.value = false
      resultMessage.value = 'Estado de lote actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalExtracto.value = true
    }
    await getExtracto()
  } catch (error) {
    const msg = error.response?.data?.message || 'No se pudo actualizar el estado del lote'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalExtracto.value = true
  }
}

const actualizarStockActualExtracto = async () => {
  try {
    console.log('Actualizar stock actual:', updateForm.value)
    const baseURL = import.meta.env.VITE_API_URL

    console.log('----UPADTE FORM EXTRACTO ', updateForm.value.stock_actual)
    const response = await axios.patch(`${baseURL}/extractos/${updateForm.value.id}/stock-actual`, {
      stock_actual: updateForm.value.stock_actual,
    })
    if (response.status === 200) {
      // mostrar resultado
      showUpdateExtractoModal.value = false
      resultMessage.value = 'Stock actual actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalExtracto.value = true
    }
    await getExtracto()
  } catch (error) {
    showUpdateExtractoModal.value = false
    const msg =
      error.response?.data?.message || 'El stock actual no debe ser mayor al stock inicial'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalExtracto.value = true
  }
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
