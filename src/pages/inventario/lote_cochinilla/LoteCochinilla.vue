<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <button
      @click="crear"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote cochinilla x compra
    </button>
  </div>
  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">Proveedor ID</th>
            <th class="px-4 py-3 text-left">Análisis actual ID</th>
            <th class="px-4 py-3 text-left">Creado Por</th>
            <th class="px-4 py-3 text-left">Código Lote</th>
            <th class="px-4 py-3 text-left">Tipo Lote</th>
            <th class="px-4 py-3 text-right">Fecha compra</th>
            <th class="px-4 py-3 text-right">Fecha creación</th>
            <th class="px-4 py-3 text-left">Calidad Cochinilla</th>
            <th class="px-4 py-3 text-left">Stock actual</th>
            <th class="px-4 py-3 text-center">Concentración AC Actual</th>
            <th class="px-4 py-3 text-right">Humedad % Actual</th>
            <th class="px-4 py-3 text-left">Estado Lote</th>
            <th class="px-4 py-3 text-left">Observaciones</th>
            <th class="px-4 py-3 text-center">Creado en</th>
            <th class="px-4 py-3 text-right">Costo total inicial</th>
            <th class="px-4 py-3 text-left">Costo x Punto AC (Dolares)</th>
            <th class="px-4 py-3 text-left">Costo Kilo Dolares</th>
            <th class="px-4 py-3 text-center">Almacen ID</th>
            <th class="px-4 py-3 text-right">Stock inicial</th>
            <th class="px-4 py-3 text-left">Und. Medida Stock</th>
            <th class="px-4 py-3 text-left">Und. Medida Dinero</th>
            <th class="px-4 py-3 text-center">Costo Total Actual</th>
            <th class="px-4 py-3 text-center">Proveedor nombre</th>
            <th class="px-4 py-3 text-center">Almacen nombre</th>
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
                <span class="text-sm text-gray-500">Cargando lotes de cochinilla...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="paginatedCochinilla.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedCochinilla"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- tu contenido -->
            <!-- ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.lote_cochinilla_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Proveedor ID-->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.proveedor_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Análisis ID-->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.analisis_atual_id || '-' }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Fecha -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.creado_por }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Código Lote -->
            <td class="px-4 py-2">
              <span
                class="px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"
                :class="item.badge"
              >
                <i :class="item.icon"></i>
                {{ item.codigo_lote }}
              </span>
            </td>

            <!-- Tipo lote -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.tipo_lote }}</div>
            </td>

            <!-- Fecha compra -->
            <td class="px-4 py-3">
              <span class="text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                {{ item.fecha_compra }}
              </span>
            </td>

            <!-- Fecha creación -->
            <td class="px-4 py-3">
              <div class="text-xs font-bold">{{ item.fecha_creacion || '-' }}</div>
            </td>

            <!-- Documento 
            <td class="px-4 py-3">
              <div
                class="text-xs font-bold flex items-center gap-1 cursor-pointer hover:text-blue-600 text-gray-600"
              >
                <i :class="item.docIcon"></i>
                <span>{{ item.documento }}</span>
              </div>
            </td>-->

            <!-- Costo unitario 
            <td class="px-4 py-3 text-right font-bold text-xs" :class="item.cantidadColor">
              {{ item.cantidad }}
            </td>-->

            <!-- Calidad cochinilla -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.calidad_cochinilla }}
            </td>

            <!-- Stock Actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.stock_actual }}
            </td>

            <!-- Concentración Actual AC -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.concentracion_ac_actual || '-' }}
            </td>

            <!-- Humedad actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.humedad_actual || '-' }}
            </td>

            <!-- Estado Lote -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.estado_lote }}
            </td>

            <!-- Observaciones -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.observaciones }}
            </td>

            <!-- Creado en -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.creado_en }}
            </td>

            <!-- Costo total inicial -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_total_inicial }}
            </td>

            <!-- Costo Punto AC Dolares -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_puntoac_dolares || '-' }}
            </td>

            <!-- Costo Kilo Dolares -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_kilo_dolares }}
            </td>

            <!-- Almacen ID -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.almacen_id }}
            </td>

            <!-- Stock Inicial -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.stock_inicial }}
            </td>

            <!-- Und. Medida stock -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.unidad_medida_stock }}
            </td>

            <!-- Und. Medida dinero -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.unidad_medida_dinero }}
            </td>

            <!-- Costo Total Actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_total_actual }}
            </td>

            <!-- Costo Total Actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.proveedor_nombre }}
            </td>

            <!-- Costo Total Actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.almacen_nombre || '-' }}
            </td>
            <!-- Usuario 
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <img :src="item.avatar" class="w-6 h-6 rounded-full" alt="User" />
                <span class="text-xs">{{ item.usuario }}</span>
              </div>
            </td>-->

            <!-- CONTROL DE ACCIONES -->
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

const cochinilla = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const currentPage = ref(1)
const perPage = ref(4)

const perPageOptions = [4, 10, 20, 'All']

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
  getLoteCochinilla()
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
const getLoteCochinilla = async () => {
  loading.value = true
  try {
    const url = 'http://localhost:3000/api/lotes-cochinilla'

    const response = await axios.get(url)
    const data = await response.data
    cochinilla.value = data
    await delay(1000) // Simula un retraso para mostrar el spinner console.log('Cochinilla:', data)
  } catch (error) {
    console.error('Error fetching cochinilla:', error)
  } finally {
    loading.value = false
  }
}

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedCochinilla = computed(() => {
  if (perPage.value === 'All') return cochinilla.value
  const start = (currentPage.value - 1) * perPage.value
  return cochinilla.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(cochinilla.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
/*watch(
  () => props.inventario,
  (nuevo) => {
    getLoteCochinilla(nuevo)
  },
  { immediate: true },
)*/
</script>
