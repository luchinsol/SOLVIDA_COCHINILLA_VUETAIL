<script setup>
// IMPORTS PARA LA PAGINACIÓN
import { ref } from 'vue'
import { computed, onMounted } from 'vue'
import { watch } from 'vue'
import axios from 'axios'
/// PROPS
const props = defineProps({
  inventario: {
    type: String,
    default: 'todos',
  },
})

// PAGINACIÓN
const perPageOptions = [4, 10, 25, 50]
const perPage = ref(4)
const currentPage = ref(1)

const loading = ref(false)
// FILTROS DE BÚSQUEDA
const searchProducto = ref('')
const listaProductos = ref([])
const searchUsuario = ref('')
const searchTipo = ref('')
const searchCodigo = ref('')
const searchAlmacen = ref('')
const searchFechaDesde = ref('')
const searchFechaHasta = ref('')
const stepMovimiento = ref(1)

const listaTipoMovimientoAlmacen = ref([])

const listaTipos = ref([])
const listaAlmacenes = ref([])
// DATOS PRINCIPALES
const movimientosData = ref([]) // Aquí se almacenarán los movimientos obtenidos de la API

// RESULTADOS DE OPERACIONES (CREAR, EDITAR, ELIMINAR)
const resultMessage = ref('')
const resultType = ref('') // 'success' o 'error'
const createMotivoMovimientoForm = ref({
  tipo_movimiento_id: '',
  motivo_movimiento_id: '',
})

const listaMotivosMovimiento = ref([])

// CONTROL DE MODALES
const showRegistroMovimientoModal = ref(false)

const getListaTipoMovimientoAlmacen = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/tipos-movimientos-almacen`)
    listaTipoMovimientoAlmacen.value = await respuesta.data
    console.log('Tipos de movimiento cargados:', listaTipoMovimientoAlmacen.value)
  } catch (error) {
    console.error('Error al cargar tipos de movimiento:', error)
  }
}
// USAR ESTA FUNCIÓN
const getListarMotivosMovimientos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/motivos-movimiento`, {
      params: {
        tipo_mov_id: createMotivoMovimientoForm.value.tipo_movimiento_id,
      },
    })
    listaMotivosMovimiento.value = await respuesta.data
    console.log('Motivos de movimiento cargados:', listaMotivosMovimiento.value)
  } catch (error) {
    console.error('Error al cargar motivos de movimiento:', error)
  }
}

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedKardex = computed(() => {
  if (!Array.isArray(movimientosData.value)) return []

  if (perPage.value === 'All') {
    return movimientosData.value
  }

  const start = (currentPage.value - 1) * perPage.value

  return movimientosData.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1

  return Math.ceil(movimientosData.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const getMovimientos = async () => {
  loading.value = true
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/movimientos-almacen`, {
      params: {
        tipo: searchTipo.value || undefined,
        codigo_item: searchCodigo.value || undefined,
        almacen_id: searchAlmacen.value || undefined,
        nombre_item: searchProducto.value || undefined,
        fecha_desde: searchFechaDesde.value || undefined,
        fecha_hasta: searchFechaHasta.value || undefined,
      },
    })
    console.log('Respuesta de la API:', response.data)

    if (response.status === 200) {
      movimientosData.value = response.data
    }
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
  } finally {
    loading.value = false
  }
}

const cargarTipos = async (nombreProducto) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await fetch(`${baseUrl}/item-inventario/tipos?nombre_item=${nombreProducto}`)

    listaTipos.value = await respuesta.json()
  } catch (error) {
    console.error('Error al cargar tipos:', error)
  }
}

const cargarAlmacenes = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await fetch(`${baseUrl}/almacen`)

    listaAlmacenes.value = await respuesta.json()
  } catch (error) {
    console.error('Error al cargar almacenes:', error)
  }
}

const cargarProductos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await fetch(`${baseUrl}/item-inventario/nombres`)
    listaProductos.value = await respuesta.json()
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

watch(searchProducto, (nuevoProducto) => {
  if (nuevoProducto) {
    searchTipo.value = ''

    cargarTipos(nuevoProducto)
  }
})

watch(
  [searchProducto, searchTipo, searchCodigo, searchAlmacen, searchFechaDesde, searchFechaHasta],
  () => {
    getMovimientos()
  },
)

onMounted(() => {
  cargarProductos()
  cargarAlmacenes()
  getMovimientos()
  getListaTipoMovimientoAlmacen()
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <div class="px-6 py-5 border-b border-gray-200 flex items-start justify-between">
      <!-- IZQUIERDA -->
      <div>
        <h2 class="text-xl font-bold text-gray-900">Kardex Detallado</h2>

        <p class="text-sm text-gray-500 mt-1">Movimientos y trazabilidad de inventario</p>
      </div>

      <!-- DERECHA -->
      <button
        class="bg-orange-600 hover:bg-orange-700 text-white text-md font-bold px-4 py-2 rounded-lg transition"
        @click="showRegistroMovimientoModal = true"
      >
        Registrar movimiento
      </button>
    </div>

    <!-- FILTROS -->
    <div class="px-6 py-4 border-b border-gray-200 grid gap-4 md:grid-cols-7">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Código </label>

        <input
          v-model="searchCodigo"
          type="text"
          placeholder="Buscar código"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Fecha Hasta </label>

        <input
          v-model="searchFechaHasta"
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Fecha Desde </label>

        <input
          v-model="searchFechaDesde"
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Almacén </label>

        <select
          v-model="searchAlmacen"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="" disabled>Seleccione un almacén</option>
          <option
            v-for="almacen in listaAlmacenes"
            :key="almacen.almacen_id"
            :value="almacen.almacen_id"
          >
            {{ almacen.nombre }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Producto</label>
        <select
          v-model="searchProducto"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
        >
          <option value="" disabled>Seleccione un producto</option>
          <option v-for="item in listaProductos" :key="item.nombre_item" :value="item.nombre_item">
            {{ item.nombre_item }}
          </option>
        </select>
      </div>

      <!-- TIPO -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Tipo </label>

        <select
          v-model="searchTipo"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="" disabled>Seleccione un tipo</option>

          <option v-for="tipo in listaTipos" :key="tipo.tipo" :value="tipo.tipo">
            {{ tipo.tipo }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
        <input
          v-model="searchUsuario"
          type="text"
          placeholder="Buscar por usuario"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1300px]">
        <!-- THEAD -->
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr class="text-[11px] uppercase tracking-wider text-gray-500">
            <th class="px-4 py-3 text-left">Movimiento</th>
            <th class="px-4 py-3 text-left">Fecha</th>
            <th class="px-4 py-3 text-left">Tipo movimiento</th>
            <th class="px-4 py-3 text-left">Motivo</th>
            <th class="px-4 py-3 text-left">Producto</th>
            <th class="px-4 py-3 text-left">Código</th>
            <th class="px-4 py-3 text-left">Lote</th>
            <th class="px-4 py-3 text-right">Cantidad</th>
            <th class="px-4 py-3 text-left">Saldo</th>
            <th class="px-4 py-3 text-left">Unidad</th>
            <th class="px-4 py-3 text-left">Tipo</th>
            <th class="px-4 py-3 text-left">Almacén Origen</th>
            <th class="px-4 py-3 text-left">Almacén Destino</th>
            <th class="px-4 py-3 text-left">Usuario</th>
            <th class="px-4 py-3 text-left">Observaciones</th>
          </tr>
        </thead>

        <!-- TBODY -->
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
          <tr v-else-if="paginatedKardex.length === 0">
            <td colspan="11" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-for="(item, index) in paginatedKardex"
            :key="index"
            class="border-b border-gray-100 hover:bg-gray-50 transition text-sm"
          >
            <!-- MOVIMIENTO -->
            <td class="px-4 py-3 font-semibold text-gray-900">#{{ item.movimiento_id }}</td>

            <!-- FECHA -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.fecha_hora }}
            </td>

            <!-- TIPO MOVIMIENTO -->
            <td class="px-4 py-3 font-medium text-blue-900 font-bold">
              {{ item.tipo_movimiento_nombre }}
            </td>

            <!-- MOTIVO -->
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded-lg text-xs font-bold"
                :class="
                  item.motivo_movimiento === 'venta'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                "
              >
                {{ item.motivo_movimiento }}
              </span>
            </td>

            <!-- PRODUCTO -->
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ item.nombre_item }}
            </td>

            <!-- CODIGO -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.codigo_item }}
            </td>

            <!-- LOTE -->
            <td class="px-4 py-3 text-indigo-600 font-medium">
              {{ item.nombre_lote }}
            </td>

            <!-- CANTIDAD -->
            <td class="px-4 py-3 text-right font-bold text-gray-900">
              {{ item.cantidad }}
            </td>

            <!-- SALDO -->
            <td class="px-4 py-3 text-left font-bold text-red-900">
              {{ item.saldo }}
            </td>

            <!-- UNIDAD -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.unidad_medida_stock }}
            </td>

            <!-- TIPO -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.tipo }}
            </td>

            <!-- ALMACEN ORIGEN -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.almacen_origen_nombre }}
            </td>

            <!-- ALMACEN DESTINO -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.almacen_destino_nombre || '—' }}
            </td>

            <!-- USUARIO -->
            <td class="px-4 py-3 text-gray-700">Usuario #{{ item.usuario_id }}</td>

            <!-- OBSERVACIONES -->
            <td class="px-4 py-3 text-gray-700">
              {{ item.observaciones }}
            </td>

            <!-- ACTION -->
            <td class="px-6 py-4 text-center">
              <button class="text-gray-400 hover:text-gray-700">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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

    <!-- SHOW DIALOG DE CREACIÓN DE REGISTRO DE MOVIMIENTO -->
    <div
      v-if="showRegistroMovimientoModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-5xl shadow-2xl max-h-[95vh] overflow-y-auto border border-gray-200"
      >
        <!-- HEADER MODAL -->
        <div
          class="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-gray-50 rounded-t-2xl"
        >
          <div>
            <h2 class="text-2xl font-bold text-gray-900">New Movement Registration</h2>
            <p class="text-sm text-gray-500 mt-1">
              Record a new inventory transaction across warehouses.
            </p>
          </div>

          <button
            @click="showRegistroMovimientoModal = false"
            class="w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition flex items-center justify-center text-gray-600"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- CONTENIDO -->
        <div class="p-8 space-y-6 bg-surface">
          <!-- STEP HEADER -->
          <!-- STEP HEADER -->
          <div class="relative max-w-2xl mx-auto px-10">
            <!-- LINEA GRIS -->
            <div class="absolute top-4 left-[18%] right-[18%] h-[2px] bg-gray-200"></div>

            <!-- LINEA ACTIVA -->
            <div
              :class="[
                'absolute top-4 left-[18%] h-[2px] bg-primary transition-all duration-300',
                stepMovimiento >= 2 ? 'w-[64%]' : 'w-0',
              ]"
            ></div>

            <!-- STEPS -->
            <div class="relative flex justify-between">
              <!-- STEP 1 -->
              <div class="relative z-10 flex flex-col items-center">
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shadow-sm ring-4 ring-white',
                    stepMovimiento >= 1
                      ? 'bg-primary text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-400',
                  ]"
                >
                  1
                </div>

                <span
                  :class="[
                    'text-sm mt-3 text-center',
                    stepMovimiento >= 1
                      ? 'font-semibold text-primary'
                      : 'font-medium text-gray-500',
                  ]"
                >
                  Batch Selection
                </span>
              </div>

              <!-- STEP 2 -->
              <div class="relative z-10 flex flex-col items-center">
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shadow-sm ring-4 ring-white',
                    stepMovimiento >= 2
                      ? 'bg-primary text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-400',
                  ]"
                >
                  2
                </div>

                <span
                  :class="[
                    'text-sm mt-3 text-center',
                    stepMovimiento >= 2
                      ? 'font-semibold text-primary'
                      : 'font-medium text-gray-500',
                  ]"
                >
                  Details & Finish
                </span>
              </div>
            </div>
          </div>

          <div v-if="stepMovimiento === 1">
            <!-- CONFIGURATION -->
            <div
              class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
            >
              <h3 class="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                <i class="fa-solid fa-clipboard-list text-primary"></i>
                Movement Configuration
              </h3>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <!-- MOVEMENT TYPE -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Movement Type *
                  </label>

                  <div class="grid grid-cols-2 gap-3">
                    <!-- ENTRY -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-type"
                        id="type-entry"
                        class="peer sr-only"
                        checked
                      />

                      <label
                        for="type-entry"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:shadow-sm transition-all"
                      >
                        <i class="fa-solid fa-arrow-down text-2xl text-green-500 mb-2"></i>

                        <span class="text-sm font-semibold text-gray-900"> Entry </span>
                      </label>
                    </div>

                    <!-- EXIT -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-type"
                        id="type-exit"
                        class="peer sr-only"
                      />

                      <label
                        for="type-exit"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:shadow-sm transition-all"
                      >
                        <i class="fa-solid fa-arrow-up text-2xl text-red-500 mb-2"></i>

                        <span class="text-sm font-semibold text-gray-900"> Exit </span>
                      </label>
                    </div>

                    <!-- ADJUST -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-type"
                        id="type-adjust"
                        class="peer sr-only"
                      />

                      <label
                        for="type-adjust"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:shadow-sm transition-all"
                      >
                        <i class="fa-solid fa-sliders text-2xl text-yellow-500 mb-2"></i>

                        <span class="text-sm font-semibold text-gray-900"> Adjustment </span>
                      </label>
                    </div>

                    <!-- TRANSFER -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-type"
                        id="type-transfer"
                        class="peer sr-only"
                      />

                      <label
                        for="type-transfer"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:shadow-sm transition-all"
                      >
                        <i class="fa-solid fa-right-left text-2xl text-blue-500 mb-2"></i>

                        <span class="text-sm font-semibold text-gray-900"> Transfer </span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- MOVEMENT REASON -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Movement Reason *
                  </label>

                  <div class="space-y-3">
                    <!-- PRODUCTION -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-reason"
                        id="reason-production"
                        class="peer sr-only"
                        checked
                      />

                      <label
                        for="reason-production"
                        class="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 transition-all"
                      >
                        <div
                          class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"
                        >
                          <i class="fa-solid fa-industry"></i>
                        </div>

                        <div>
                          <p class="text-sm font-semibold text-gray-900">Production</p>

                          <p class="text-xs text-gray-500">Manufacturing process</p>
                        </div>
                      </label>
                    </div>

                    <!-- SALE -->
                    <div class="relative">
                      <input
                        type="radio"
                        name="movement-reason"
                        id="reason-sale"
                        class="peer sr-only"
                      />

                      <label
                        for="reason-sale"
                        class="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 transition-all"
                      >
                        <div
                          class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"
                        >
                          <i class="fa-solid fa-cart-shopping"></i>
                        </div>

                        <div>
                          <p class="text-sm font-semibold text-gray-900">Sale</p>

                          <p class="text-xs text-gray-500">Customer order</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- FILTERS -->
            <div
              class="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col lg:flex-row gap-4 items-end"
            >
              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Product </label>

                <select
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <option>All Products</option>
                </select>
              </div>

              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Warehouse </label>

                <select
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <option>Main Hub (WH-01)</option>
                </select>
              </div>

              <div class="w-full lg:w-2/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Search </label>

                <div class="relative">
                  <i
                    class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  ></i>

                  <input
                    type="text"
                    placeholder="Search code..."
                    class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-9 p-2.5 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <!-- TABLE -->
            <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-600">
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200"
                  >
                    <tr>
                      <th class="px-6 py-3">Code</th>
                      <th class="px-6 py-3">Product</th>
                      <th class="px-6 py-3">Warehouse</th>
                      <th class="px-6 py-3 text-right">Stock</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      class="bg-blue-50 border-b border-gray-200 hover:bg-blue-100 transition cursor-pointer"
                    >
                      <td class="px-6 py-4 font-medium text-primary">LOT-8924-A</td>

                      <td class="px-6 py-4 font-semibold text-gray-900">Steel Coil 5mm</td>

                      <td class="px-6 py-4">Main Hub (WH-01)</td>

                      <td class="px-6 py-4 text-right font-bold text-gray-900">1,250 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- SELECTED -->
            <div
              class="bg-white border border-primary/30 rounded-xl p-5 shadow-[0_2px_12px_-4px_rgba(59,130,246,0.2)]"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary text-xl border border-blue-100"
                  >
                    <i class="fa-solid fa-box-open"></i>
                  </div>

                  <div>
                    <p class="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
                      Selected Batch
                    </p>

                    <h4 class="text-lg font-bold text-gray-900">
                      Steel Coil 5mm
                      <span class="text-gray-500 text-sm font-normal ml-2"> (LOT-8924-A) </span>
                    </h4>
                  </div>
                </div>

                <div class="text-right">
                  <p class="text-xs text-gray-500 mb-0.5">Available Stock</p>

                  <p class="text-xl font-bold text-gray-900">
                    1,250
                    <span class="text-sm font-medium text-gray-500">kg</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="stepMovimiento === 2">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <!-- LEFT -->
              <div class="lg:col-span-4">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div class="flex items-center gap-3 mb-6">
                    <div
                      class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary"
                    >
                      <i class="fa-solid fa-box-open"></i>
                    </div>

                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">Selected Batch</h3>

                      <p class="text-sm text-gray-500">Source information</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Code</p>

                      <p class="font-semibold text-gray-900">LT-2024-8992</p>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Product</p>

                      <p class="font-semibold text-gray-900">Steel Coil 5mm</p>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Available Stock</p>

                      <p class="text-2xl font-bold text-primary">1,250 kg</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- RIGHT -->
              <div class="lg:col-span-8">
                <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h3 class="text-xl font-bold text-gray-900 mb-6">Movement Details</h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- QUANTITY -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity
                      </label>

                      <input
                        type="number"
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <!-- DESTINATION -->
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Destination Warehouse
                      </label>

                      <select
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                      >
                        <option>Main Warehouse</option>
                        <option>Production Area</option>
                      </select>
                    </div>

                    <!-- REASON -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2"> Reason </label>

                      <select
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                      >
                        <option>Production</option>
                        <option>Transfer</option>
                      </select>
                    </div>

                    <!-- OBS -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Observations
                      </label>

                      <textarea
                        rows="4"
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div
          class="px-8 py-5 border-t border-gray-200 bg-gray-50 flex justify-between items-center rounded-b-2xl"
        >
          <button
            v-if="stepMovimiento === 1"
            @click="showRegistroMovimientoModal = false"
            class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
          >
            Cancel</button
          ><button
            v-if="stepMovimiento === 2"
            @click="stepMovimiento = 1"
            class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            v-if="stepMovimiento === 1"
            @click="stepMovimiento = 2"
            class="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Next Step
          </button>

          <button
            v-else
            class="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Save Movement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
