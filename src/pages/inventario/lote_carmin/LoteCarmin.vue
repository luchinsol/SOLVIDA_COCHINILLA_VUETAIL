<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <!--<button
      @click="crear"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote carmin
    </button>
    -->
  </div>

  <!-- TABLA + PAGINADOR-->
  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left bg-purple-500 text-white">ID Lote Carmin</th>
            <th class="px-4 py-3 text-left bg-yellow-500 text-white">Código Lote</th>
            <th class="px-4 py-3 text-left bg-green-500 text-white">Tipo Lote</th>
            <th class="px-4 py-3 text-left bg-blue-500 text-white">Almacén</th>
            <th class="px-4 py-3 text-right bg-blue-500 text-white">Masa Total (kg)</th>
            <th class="px-4 py-3 text-right bg-indigo-500 text-white">Concentración AC Actual</th>
            <th class="px-4 py-3 text-right bg-pink-500 text-white">Humedad Actual</th>
            <th class="px-4 py-3 text-right bg-orange-500 text-white">Color L</th>
            <th class="px-4 py-3 text-right bg-red-500 text-white">Color A</th>
            <th class="px-4 py-3 text-right bg-green-500 text-white">Color B</th>
            <th class="px-4 py-3 text-left bg-blue-500 text-white">Estado Lote</th>
            <th class="px-4 py-3 text-left bg-purple-500 text-white">Observaciones</th>
            <th class="px-4 py-3 text-left bg-yellow-500 text-white">Creado En</th>
            <th class="px-4 py-3 text-left bg-green-500 text-white">Calidad Lote</th>
            <th class="px-4 py-3 text-center bg-gray-400 text-white">Acciones</th>
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
          <tr v-else-if="paginatedCarmin.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedCarmin"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- ID Lote Carmin -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.lote_carmin_id }}</div>
            </td>

            <!-- Código Lote -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.codigo_lote || '-N/A-' }}</div>
            </td>

            <!-- Tipo Lote -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.tipo_lote || '-' }}</div>
            </td>

            <!-- Almacén -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-black-900">
                {{ item.almacen_nombre || '-' }}
              </div>
            </td>

            <!-- Masa Total -->

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.masa_total_kg || 0.0 }}
                </span>

                <span class="text-[14px] text-gray-500 font-bold">
                  {{ item.unidad_medida_stock }}
                </span>
              </div>
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
                <!-- EDITAR -->
                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                  title="Editar"
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

  <!-- SHOW DIALOG RESULTADO -->
  <div
    v-if="showResultadoModalCarmin"
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
        @click="showResultadoModalCarmin = false"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        Aceptar
      </button>
    </div>
  </div>

  <!-- SHOW DIALOG DE ACTULIZAR COCHINILLA-->
  <div
    v-if="showUpdateCarminModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Actualizar Lote Carmin</h2>

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
              @click="actualizarEstadoLoteCarmin"
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
              @click="actualizarStockActualCarmin"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Stock
            </button>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            @click="showUpdateCarminModal = false"
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

const currentPage = ref(1) // PAGINACIÓN
const perPage = ref(4) // PAGINACIÓN
const perPageOptions = [4, 10, 15, 'All']

const resultMessage = ref('')
const resultType = ref('') // 'success' o 'error'
const showResultadoModalCarmin = ref(false)
const showUpdateCarminModal = ref(false)
const updateForm = ref({
  lote_carmin_id: null,
  estado_lote: '',
  stock_actual: null,
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
  getLoteCarmin()
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const verDetalle = (item) => {
  console.log('Ver detalle:', item)
}

const editar = (item) => {
  console.log('Editar:', item)
  showUpdateCarminModal.value = true
  updateForm.value = {
    id: item.lote_carmin_id,
    estado_lote: item.estado_lote,
    stock_actual: item.stock_actual, // Asegúrate de que esta propiedad exista en tu objeto
  }
}

const actualizarEstadoLoteCarmin = async () => {
  try {
    console.log('Actualizar estado o stock:', updateForm.value)

    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.patch(
      `${baseURL}/lotes-carmin/${updateForm.value.id}/estado-lote`,
      {
        estado_lote: updateForm.value.estado_lote,
      },
    )
    if (response.status === 200) {
      // mostrar resultado
      showUpdateCarminModal.value = false
      resultMessage.value = 'Lote carmin actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalCarmin.value = true
    }
    await getLoteCarmin()
  } catch (error) {
    const msg = error.response?.data?.message || 'No se pudo actualizar el lote carmin'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalCarmin.value = true
    console.error(error)
  }
}

const actualizarStockActualCarmin = async () => {
  try {
    console.log('Actualizar estado o stock:', updateForm.value)

    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.patch(
      `${baseURL}/lotes-carmin/${updateForm.value.id}/stock-actual`,
      {
        stock_actual: updateForm.value.stock_actual,
      },
    )
    if (response.status === 200) {
      // mostrar resultado
      showUpdateCarminModal.value = false
      resultMessage.value = 'Stock actual del lote carmin actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalCarmin.value = true
      await getLoteCarmin()
    }
  } catch (error) {
    showUpdateCarminModal.value = false
    const msg =
      error.response?.data?.message || 'El stock actual no debe ser mayor al stock inicial'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalCarmin.value = true
    console.error(error)
  }
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

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedCarmin = computed(() => {
  if (perPage.value === 'All') return carmin.value
  const start = (currentPage.value - 1) * perPage.value
  return carmin.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(carmin.value.length / perPage.value)
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
    getLoteCarmin(nuevo)
  },
  { immediate: true },
)
</script>
