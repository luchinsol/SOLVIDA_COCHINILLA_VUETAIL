<template>
  <div class="flex justify-between items-center pb-4 pt-4 border-b">
    <button
      @click="showCreateModal = true"
      class="px-4 py-2 bg-green-800 text-white rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote insumo
    </button>
  </div>

  <!-- TABLA + PAGINADOR-->
  <div class="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div class="w-full overflow-x-auto">
      <table class="min-w-max w-full">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left bg-purple-200">ID</th>
            <th class="px-4 py-3 text-center">N°Proveedor</th>
            <th class="px-4 py-3 text-center">N° Almacen</th>
            <th class="px-4 py-3 text-center bg-blue-200">Nombre</th>
            <th class="px-4 py-3 text-left bg-pink-200">Concentración</th>
            <th class="px-4 py-3 text-right bg-yellow-200">Costo Unitario</th>
            <th class="px-4 py-3 text-right bg-green-200">Stock Actual</th>
            <th class="px-4 py-3 text-right">Fecha creación</th>

            <th class="px-4 py-3 text-right">Costo total</th>
            <th class="px-4 py-3 text-left">Stock inicial</th>
            <th class="px-4 py-3 text-left">N° Tipo insumo</th>
            <th class="px-4 py-3 text-left">UM - Cantidad</th>
            <th class="px-4 py-3 text-center">UM - Moneda</th>

            <th class="px-4 py-3 text-right">UM - Concentración</th>

            <th class="px-4 py-3 text-right">Estado lote</th>

            <th class="px-4 py-3 text-center">Proveedor</th>

            <th class="px-4 py-3 text-center w-[250px]">Almacen</th>

            <th class="px-4 py-3 text-center w-[300px]">Tipo insumo</th>

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
                <span class="text-sm text-gray-500">Cargando insumos...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="paginatedInsumos.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedInsumos"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- tu contenido -->
            <!-- ID -->
            <td class="px-4 py-2 text-xs bg-purple-100">
              <div class="font-medium text-gray-900">{{ item.lote_insumo_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Proveedor ID-->
            <td class="px-4 py-2 text-xs text-center">
              <div class="font-medium text-gray-900">{{ item.proveedor_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Almacen ID-->
            <td class="px-4 py-2 text-xs text-center">
              <div class="font-medium text-gray-900">{{ item.almacen_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Nombre -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-100 bg-blue-500 rounded p-1">{{ item.nombre }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Concentración -->
            <td class="px-4 py-2">
              <span
                class="px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 bg-red-100 text-blue-800"
                :class="item.badge"
              >
                <i :class="item.icon"></i>
                {{ item.concentracion }}
              </span>
            </td>

            <!-- Costo unitario -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900 bg-yellow-100 p-1">{{ item.costo_unitario }}</div>
            </td>

            <!-- Stock actual -->
            <td class="px-4 py-3">
              <span
                class="text-xs text-blue-600 font-bold bg-green-100 p-1 rounded"
                :class="item.stockColor"
              >
                {{ item.stock_actual }}
              </span>
            </td>

            <!-- Fecha creación -->
            <td class="px-4 py-3">
              <div class="text-xs font-bold">{{ item.creado_en }}</div>
            </td>

            <!-- Costo total -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.costo_total }}
            </td>

            <!-- Stock inicial -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.stock_inicial }}
            </td>

            <!-- Tipo de insumo ID-->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.tipo_insumo_id }}</span>
              </div>
            </td>

            <!-- UM-Cantidad-->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.unidad_medida_cantidad }}</span>
              </div>
            </td>

            <!-- UM-Moneda-->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.unidad_medida_moneda }}</span>
              </div>
            </td>

            <!-- UM-Concentracion-->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.unidad_medida_concentracion }}</span>
              </div>
            </td>

            <!-- Estado lote-->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.estado_lote }}</span>
              </div>
            </td>

            <!-- Nombre proveedor-->
            <td class="px-4 py-3 text-center">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.proveedor_nombre }}</span>
              </div>
            </td>

            <!-- Almacen nombre-->
            <td class="px-4 py-3 text-right">
              <div
                class="flex justify-start items-center gap-2 bg-purple-300 rounded-lg text-purple-600 px-2 py-1"
              >
                <span class="text-xs">{{ item.almacen_nombre }}</span>
              </div>
            </td>

            <td class="px-4 py-3">
              <div
                class="flex justify-center items-center gap-2 bg-green-300 rounded-lg text-green-600 px-2 py-1"
              >
                <span class="text-xs">{{ item.tipo_insumo_nombre }}</span>
              </div>
            </td>

            <!-- CONTROL DE ACCIONES -->
            <td class="px-4 py-3 text-center">
              <div
                class="flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition"
              >
                <!-- VER -->
                <!--
                <button
                  @click="verDetalle(item)"
                  class="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                  title="Ver detalle"
                >
                  <i class="fa-solid fa-eye"></i>
                </button>
                  -->

                <!-- EDITAR -->
                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                  title="Editar"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>

                <!-- ELIMINAR -->
                <!--
                <button
                  @click="confirmarEliminar(item)"
                  class="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                  title="Eliminar"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>-->
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

  <!-- SHOW DIALOG DE CREACIÓN DE INSUMO-->
  <div
    v-if="showCreateModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Nuevo Lote de Insumo</h2>

      <div class="flex flex-col gap-6">
        <!-- 🔹 BLOQUE 1 -->
        <div>
          <h3 class="text-sm font-bold text-black-500 mb-3">
            Información básica
            <span class="italic font-bold text-blue-600 text-xs">
              (si no encuentras el tipo de insumo, puedes registrarlo aquí)
            </span>
          </h3>

          <!-- SELECTOR DE TIPO DE INSUMO -->
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="createForm.nombre"
              placeholder="Nombre del Lote de Insumo"
              class="input"
            />

            <select v-model="createForm.tipo_insumo_id" class="input">
              <option disabled value="">Tipo insumo</option>
              <option
                v-for="tipo in tiposInsumo"
                :key="tipo.tipo_insumo_id"
                :value="tipo.tipo_insumo_id"
              >
                {{ tipo.nombre }}
              </option>
            </select>
          </div>

          <div class="flex justify-start mt-4">
            <button
              type="button"
              @click="showTipoInsumoForm = true"
              class="px-4 py-1 bg-blue-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 flex items-center gap-2"
            >
              <i class="fa-solid fa-plus"></i>
              Crear tipo de insumo
            </button>
          </div>

          <!-- FORMULARIO INLINE CREAR TIPO DE INSUMO -->
          <CrearInsumo
            v-if="showTipoInsumoForm"
            v-model="showTipoInsumoForm"
            @created="handleTipoInsumoCreado"
          />
        </div>

        <!-- 🔹 BLOQUE 2 -->
        <div>
          <h3 class="text-sm font-bold text-black-500 mb-3">
            Ubicación y proveedor
            <span class="italic font-bold text-blue-600 text-xs">
              (si no encuentras el proveedor, puedes registrarlo aquí)
            </span>
          </h3>

          <!-- GRID SOLO PARA SELECTS -->
          <div class="grid grid-cols-2 gap-4">
            <select v-model="createForm.almacen_id" class="input">
              <option disabled value="">Almacén</option>
              <option
                v-for="almacen in almacenes"
                :key="almacen.almacen_id"
                :value="almacen.almacen_id"
              >
                {{ almacen.nombre }}
              </option>
            </select>

            <select v-model="createForm.proveedor_id" class="input">
              <option disabled value="">Proveedor</option>
              <option
                v-for="proveedor in proveedores"
                :key="proveedor.proveedor_id"
                :value="proveedor.proveedor_id"
              >
                {{ proveedor.nombre_razon_social }}
              </option>
            </select>
          </div>

          <!-- BOTÓN FUERA DEL GRID -->
          <div class="mt-3 flex justify-start">
            <button
              type="button"
              @click="showProveedorForm = true"
              class="px-4 py-1 bg-blue-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 flex items-center gap-2"
            >
              <i class="fa-solid fa-plus"></i>
              Crear proveedor
            </button>
          </div>

          <!-- FORMULARIO INLINE FUERA DEL GRID -->
          <CrearProveedor
            v-if="showProveedorForm"
            v-model="showProveedorForm"
            @created="handleProveedorCreado"
          />
        </div>

        <!-- DATOS TÉCNICOS BLOQUE 3 -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Datos técnicos</h3>

          <div class="grid grid-cols-3 gap-4">
            <input
              v-model="createForm.concentracion"
              type="number"
              step="0.01"
              placeholder="Concentración"
              class="input"
            />

            <input
              v-model="createForm.stock_inicial"
              type="number"
              placeholder="Stock inicial"
              class="input"
            />

            <input
              v-model="createForm.costo_unitario"
              type="number"
              step="0.01"
              placeholder="Costo unitario"
              class="input"
            />
          </div>

          <!-- UNIDADES DE MEDIDA PARTE FINAL-->
          <div class="grid grid-cols-3 gap-4 mt-4">
            <!-- VOLUMEN -->
            <select v-model="createForm.unidad_medida_cantidad" class="input">
              <option disabled value="">Volumen</option>
              <option
                v-for="vol in volumen"
                :key="vol.unidades_medida_id"
                :value="vol.unidad_de_medida"
              >
                {{ vol.unidad_de_medida }}
              </option>
            </select>

            <!-- MONEDA  -->
            <select v-model="createForm.unidad_medida_moneda" class="input">
              <option disabled value="">Dinero</option>
              <option
                v-for="din in dinero"
                :key="din.unidades_medida_id"
                :value="din.unidad_de_medida"
              >
                {{ din.unidad_de_medida }}
              </option>
            </select>

            <!-- MASA -->
            <select v-model="createForm.unidad_medida_concentracion" class="input">
              <option disabled value="">Masa</option>
              <option
                v-for="mas in masa"
                :key="mas.unidades_medida_id"
                :value="mas.unidad_de_medida"
              >
                {{ mas.unidad_de_medida }}
              </option>
            </select>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="showCreateModal = false"
            class="btn-cancel border border-gray-300 rounded text-sm px-4 py-2 bg-white hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="btn-save bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Crear nuevo lote de insumo
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG DE ACTULIZAR DE INSUMO-->
  <div
    v-if="showUpdateModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Actualizar Lote de Insumo</h2>

      <div class="flex flex-col gap-6">
        <!-- 🔹 BLOQUE 1 -->

        <!-- ACTUALIZAR ESTADO LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Estado de lote</h3>

          <div class="grid grid-cols-1 gap-4">
            <select v-model="updateForm.estado_lote" class="input">
              <option disabled value="">Estado del lote</option>
              <option value="disponible">Disponible</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
            <button
              @click="actualizarEstadoLoteInsumo"
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
              @click="actualizarStockActualLoteInsumo"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Stock
            </button>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            @click="showUpdateModal = false"
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
import { watch, computed, onMounted, ref } from 'vue'
import CrearInsumo from './Formularios_inline/CrearInsumo.vue'
import CrearProveedor from './Formularios_inline/CrearProveedor.vue'
import { parse } from 'vue/compiler-sfc'

/// VARIABLES REACTIVAS
const insumos = ref([])
const tiposInsumo = ref([])
const almacenes = ref([])
const proveedores = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const showTipoInsumoForm = ref(false)
const showProveedorForm = ref(false)
const currentPage = ref(1) // PAGINACIÓN
const perPage = ref(4) // PAGINACIÓN
const perPageOptions = [4, 10, 15, 'All']
const volumen = ref([])
const masa = ref([])
const dinero = ref([])

/// FORMULARIO NUEVO INSUMO
const createForm = ref({
  nombre: '',
  tipo_insumo_id: '',
  estado_lote: 'activo',
  proveedor_id: '',
  almacen_id: '',
  concentracion: '',
  stock_inicial: '',
  costo_unitario: '',
  unidad_medida_cantidad: '', // volumen
  unidad_medida_moneda: '', // dinero
  unidad_medida_concentracion: '', // masa
})

/// FORMULARIO ACTUALIZAR INSUMO
const updateForm = ref({
  id: '',
  estado_lote: '',
  stock_actual: '',
})

/// PROPS
const props = defineProps({
  inventario: {
    type: String,
    default: 'todos',
  },
})

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedInsumos = computed(() => {
  if (perPage.value === 'All') return insumos.value
  const start = (currentPage.value - 1) * perPage.value
  return insumos.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(insumos.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const crearLoteInsumo = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.post(`${baseURL}/lote-insumos`, createForm.value)

    showCreateModal.value = false

    // limpiar form
    createForm.value = {
      nombre: '',
      tipo_insumo_id: '',
      estado_lote: 'activo',
      proveedor_id: '',
      almacen_id: '',
      concentracion: '',
      stock_inicial: '',
      costo_unitario: '',
      unidad_medida_cantidad: '', // volumen
      unidad_medida_moneda: '', // dinero
      unidad_medida_concentracion: '', // masa
    }

    /// recargar datos
    getLoteInsumos(props.inventario)
  } catch (error) {
    console.error(error)
  }
}

const getTipoInsumos = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/tipo-insumo`)
    tiposInsumo.value = response.data
  } catch (error) {
    console.error('Error fetching tipo insumos:', error)
  }
}

const handleTipoInsumoCreado = async (nuevoTipo) => {
  await getTipoInsumos()
}

const handleProveedorCreado = async (nuevoProveedor) => {
  await getProveedores()
}

const getAlmacenes = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/almacen`)
    almacenes.value = response.data
  } catch (error) {
    console.error('Error fetching almacenes:', error)
  }
}

const getProveedores = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/proveedores`)
    proveedores.value = response.data
  } catch (error) {
    console.error('Error fetching proveedores:', error)
  }
}

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

const editar = (item) => {
  console.log('Editar:', item)
  showUpdateModal.value = true
  updateForm.value = {
    id: item.lote_insumo_id,
    estado_lote: item.estado_lote,
    stock_actual: item.stock_actual,
  }

  console.log('Formulario de actualización:', updateForm.value)
}

const actualizarEstadoLoteInsumo = async () => {
  try {
    console.log('Actualizar:', updateForm.value)
    const baseURL = import.meta.env.VITE_API_URL
    console.log('ID del lote a actualizar:', updateForm.value.id)
    console.log(updateForm.value.id)
    await axios.patch(`${baseURL}/lote-insumos/${updateForm.value.id}/estado-lote`, {
      estado_lote: updateForm.value.estado_lote,
    })
    await getLoteInsumos(props.inventario)
    showUpdateModal.value = false
  } catch (error) {
    console.error(error)
  }
}

const actualizarStockActualLoteInsumo = async () => {
  try {
    console.log('Actualizar stock actual:', updateForm.value)
    const baseURL = import.meta.env.VITE_API_URL
    await axios.patch(`${baseURL}/lote-insumos/${updateForm.value.id}/stock-actual`, {
      stock_actual: parseFloat(updateForm.value.stock_actual),
    })

    await getLoteInsumos(props.inventario)
    showUpdateModal.value = false
  } catch (error) {
    console.error(error)
  }
}

/// FUNCIONES PARA CALCULAR OBTENER UNIDADES DE MEDIDA, CONCENTRACIÓN Y COSTO UNITARIO
const getMasa = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/masa`)
    masa.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

const getVolumen = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/volumen`)
    volumen.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

const getMoneda = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/dinero`)
    dinero.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

/// FUNCIONES
const getLoteInsumos = async (almacen) => {
  loading.value = true
  try {
    const url =
      almacen === 'todos'
        ? 'http://localhost:3000/api/lote-insumos'
        : `http://localhost:3000/api/lote-insumos?almacen=${almacen}`

    const response = await axios.get(url)

    insumos.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error API:', error)
    insumos.value = []
  } finally {
    loading.value = false
  }
}

/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
watch(
  () => props.inventario,
  (nuevo) => {
    getLoteInsumos(nuevo)
  },
  { immediate: true },
)

onMounted(() => {
  ;(getTipoInsumos(),
    getAlmacenes(),
    getProveedores(),
    getMasa(),
    getVolumen(),
    getMoneda()) /*getConcentracion(), getCostoUnitario()*/
})
</script>

<style scoped>
.input {
  @apply border px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-700;
}
</style>
