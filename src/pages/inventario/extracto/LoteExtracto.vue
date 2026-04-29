<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <button
      @click="crear"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear nuevo proveedor
    </button>
  </div>
  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">Nombre</th>
            <th class="px-4 py-3 text-left">Tipo</th>
            <th class="px-4 py-3 text-left">Clasificación</th>
            <th class="px-4 py-3 text-left">Concentración</th>
            <th class="px-4 py-3 text-left">Unidad Medida</th>
            <th class="px-4 py-3 text-right">Stock Actual</th>
            <th class="px-4 py-3 text-right">Costo Unitario</th>
            <th class="px-4 py-3 text-left">Proveedor</th>
            <th class="px-4 py-3 text-left">Almacén</th>
            <th class="px-4 py-3 text-center">Acción</th>
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
                <span class="text-sm text-gray-500">Cargando insumos...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="insumos.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in insumos"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- tu contenido -->
            <!-- ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.insumo_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Proveedor ID-->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.proveedor_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Almacen ID-->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.almacen_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Fecha -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.creado_en }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Tipo -->
            <td class="px-4 py-2">
              <span
                class="px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit"
                :class="item.badge"
              >
                <i :class="item.icon"></i>
                {{ item.tipo_insumo }}
              </span>
            </td>

            <!-- Producto -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.nombre }}</div>
            </td>

            <!-- Unidad de medida -->
            <td class="px-4 py-3">
              <span class="text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                {{ item.unidad_medida }}
              </span>
            </td>

            <!-- Concentración -->
            <td class="px-4 py-3">
              <div class="text-xs font-bold">{{ item.concentracion }}</div>
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

            <!-- Costo unitario -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_unitario }}
            </td>

            <!-- Clasificación controlada -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.clasificacion_controlada }}
            </td>

            <!-- Usuario 
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <img :src="item.avatar" class="w-6 h-6 rounded-full" alt="User" />
                <span class="text-xs">{{ item.usuario }}</span>
              </div>
            </td>-->

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
    </div>
  </div>
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
import { watch } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const extracto = ref([])
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
    // const response = await axios.get(`${baseURL}`)
    const data = await response.data
    insumos.value = data
    await delay(1000) // Simula un retraso para mostrar el spinner console.log('Insumos:', data)
  } catch (error) {
    console.error('Error fetching insumos:', error)
  } finally {
    loading.value = false
  }
}
</script>
