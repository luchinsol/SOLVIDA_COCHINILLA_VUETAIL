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

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
        <input
          v-model="searchUsuario"
          type="text"
          placeholder="Buscar por usuario"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
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

    <!-- SHOW DIALOG DE CREACIÓN DE INSUMO-->
    <div
      v-if="showRegistroMovimientoModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
    >
      <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-6">Nuevo registro de movimiento</h2>

        <div class="flex flex-col gap-6">
          <!-- 🔹 BLOQUE 1 -->
          <div>
            <!--h3 class="text-sm font-bold text-black-500 mb-3">
              Información básica
              <span class="italic font-bold text-blue-600 text-xs">
                (si no encuentras el tipo de insumo, puedes registrarlo aquí)
              </span>
            </h3-->

            <!-- SELECTOR DE TIPO DE INSUMO -->
            <div class="grid grid-cols-2 gap-4">
              <select v-model="createMotivoMovimientoForm.tipo_movimiento_id" class="input">
                <option disabled value="">Tipo movimiento</option>
                <option
                  v-for="tipo in listaTipoMovimientoAlmacen"
                  :key="tipo.tipo_mov_id"
                  :value="tipo.tipo_mov_id"
                >
                  {{ tipo.nombre }}
                </option>
              </select>

              <select v-model="createMotivoMovimientoForm.motivo_movimiento_id" class="input">
                <option disabled value="">Motivo del movimiento</option>
                <option
                  v-for="tipo in listaMotivosMovimiento"
                  :key="tipo.motivo_mov_id"
                  :value="tipo.motivo_mov_id"
                >
                  {{ tipo.nombre }}
                </option>
              </select>
            </div>

            <!-- FORMULARIO INLINE CREAR TIPO DE INSUMO -->
            <CrearInsumo
              v-if="showTipoInsumoForm"
              v-model="showTipoInsumoForm"
              @created="handleTipoInsumoCreado"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
