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
const permisos = JSON.parse(localStorage.getItem('permisos') || '[]')
const canCreateMovimiento = permisos.includes('movimiento_almacen.crear')

const listaTipoMovimientoAlmacen = ref([])
const motivoMovimientoSeleccionado = ref(null)
const listaTipos = ref([])
const listaAlmacenes = ref([])
const productoSeleccionado = ref('')

// MODAL DE REGISTRO DE MOVIMIENTO MODAL
const showResultadoModalShow = ref(false)

const resultTypeShow = ref('success')

const resultMessageShow = ref('')
// DATOS PRINCIPALES
const movimientosData = ref([]) // Aquí se almacenarán los movimientos obtenidos de la API
const itemInventarioLista = ref([]) // Lista de productos para el select del modal
// RESULTADOS DE OPERACIONES (CREAR, EDITAR, ELIMINAR)
const resultMessage = ref('')
const resultType = ref('') // 'success' o 'error'
const createMotivoMovimientoForm = ref({
  tipo_movimiento_id: '',
  motivo_movimiento_id: '',
})

const listaMotivosMovimiento = ref([])
const tipoMovimientoSeleccionado = ref(null)
const tiposProducto = ref([])
const tipoProductoSeleccionado = ref('')
// CONTROL DE MODALES
const showRegistroMovimientoModal = ref(false)
const proveedoresLista = ref([])
const proveedorSeleccionado = ref('')
const almacenSeleccionado = ref('')

// TABLA DIALOGO Y FILTROS
const lotesInventario = ref([])
const searchLote = ref('')
const loteSeleccionado = ref(null)

const currentPageShow = ref(1)

const perPageShow = ref(3)

const perPageOptionsShow = [3, 5, 10, 20]

const loadingMovimientoShow = ref(false)

// PÁSO 2
const cantidadMovimiento = ref(null)

const observacionesMovimiento = ref('')

const almacenDestinoSeleccionado = ref('')

const totalPagesShow = computed(() => {
  return Math.ceil(lotesInventario.value.length / perPage.value) || 1
})

const lotesPaginadosShow = computed(() => {
  const start = (currentPageShow.value - 1) * perPageShow.value

  const end = start + perPageShow.value

  return lotesInventario.value.slice(start, end)
})

const nextPageShow = () => {
  if (currentPageShow.value < totalPagesShow.value) {
    currentPageShow.value++
  }
}

const prevPageShow = () => {
  if (currentPageShow.value > 1) {
    currentPageShow.value--
  }
}

const getLotesInventario = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const params = new URLSearchParams()

    if (productoSeleccionado.value) {
      params.append('nombre_item', productoSeleccionado.value)
    }

    if (tipoProductoSeleccionado.value) {
      params.append('tipo', tipoProductoSeleccionado.value)
    }

    if (proveedorSeleccionado.value) {
      params.append('proveedor_id', proveedorSeleccionado.value)
    }

    if (almacenSeleccionado.value) {
      params.append('almacen_id', almacenSeleccionado.value)
    }

    if (searchLote.value) {
      params.append('search', searchLote.value)
    }

    const respuesta = await axios.get(`${baseUrl}/item-inventario?${params.toString()}`)

    lotesInventario.value = respuesta.data

    console.log('Lotes:', lotesInventario.value)
  } catch (error) {
    console.error('Error cargando lotes:', error)
  }
}

const motivoMovimientoNombre = computed(() => {
  const motivo = listaMotivosMovimiento.value.find(
    (m) => m.motivo_movimiento_id === motivoMovimientoSeleccionado.value,
  )

  return motivo ? motivo.nombre : ''
})

const guardarMovimiento = async () => {
  try {
    loadingMovimientoShow.value = true
    const baseUrl = import.meta.env.VITE_API_URL

    // ENTRADA / SALIDA
    if (tipoMovimientoSeleccionado.value == 1 || tipoMovimientoSeleccionado.value == 2) {
      const body = {
        usuario_id: 1,

        item_inventario_id: loteSeleccionado.value.item_inventario_id,

        tipo_movimientos_almacen_id: tipoMovimientoSeleccionado.value,

        motivo_movimiento: motivoMovimientoNombre.value,

        cantidad: Number(cantidadMovimiento.value),

        observaciones: observacionesMovimiento.value,

        almacen_destino_id: null,
      }
      console.log('Body entrada/salida:', body)
      await axios.post(`${baseUrl}/movimientos-almacen/entradas-salidas`, body)
    }

    // AJUSTE
    else if (tipoMovimientoSeleccionado.value == 3) {
      const body = {
        usuario_id: 1,

        item_inventario_id: loteSeleccionado.value.item_inventario_id,

        motivo_movimiento: motivoMovimientoNombre.value,

        stock_actual_corregido: Number(cantidadMovimiento.value),

        observaciones: observacionesMovimiento.value,
      }
      console.log('Body ajuste:', body)

      await axios.post(`${baseUrl}/movimientos-almacen/ajuste`, body)
    }

    // TRASLADO
    else if (tipoMovimientoSeleccionado.value == 4) {
      const body = {
        usuario_id: 1,

        item_inventario_id: loteSeleccionado.value.item_inventario_id,

        motivo_movimiento: motivoMovimientoNombre.value,

        observaciones: observacionesMovimiento.value,

        almacen_destino_id: almacenDestinoSeleccionado.value,
      }

      console.log('Body traslado:', body)

      await axios.post(`${baseUrl}/movimientos-almacen/traslado`, body)
    }

    //alert('Movimiento registrado correctamente')
    resultTypeShow.value = 'success'

    resultMessageShow.value = 'Movimiento registrado correctamente'

    showResultadoModalShow.value = true
  } catch (error) {
    console.error(error)

    resultTypeShow.value = 'error'

    resultMessageShow.value =
      error.response?.data?.message || 'Ocurrió un error al registrar el movimiento'

    showResultadoModalShow.value = true
  } finally {
    loadingMovimientoShow.value = false
  }
}
watch(
  [
    productoSeleccionado,
    tipoProductoSeleccionado,
    proveedorSeleccionado,
    almacenSeleccionado,
    searchLote,
  ],
  () => {
    getLotesInventario()
  },
)

// FUNCIONES PARA OBTENER DATOS DE LA API TIPOS DE MOVIMIENTO DE ALMACÉN
const getListaTipoMovimientoAlmacen = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/tipos-movimientos-almacen`)
    listaTipoMovimientoAlmacen.value = await respuesta.data
    console.log('Tipos de movimiento cargados:', listaTipoMovimientoAlmacen.value)
    console.log('Tipos de movimiento filtrados:', tiposMovimientoFiltrados.value)
    console.log('Tipo movimiento seleccionado:', tipoMovimientoSeleccionado.value)
    console.log('Motivo movimiento seleccionado:', motivoMovimientoSeleccionado.value)
  } catch (error) {
    console.error('Error al cargar tipos de movimiento:', error)
  }
}

const getProveedores = async (nombreItem) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const respuesta = await axios.get(`${baseUrl}/proveedores?nombre_item_provee=${nombreItem}`)

    proveedoresLista.value = respuesta.data

    console.log('Proveedores cargados:', proveedoresLista.value)
  } catch (error) {
    console.error('Error al cargar proveedores:', error)
  }
}

const getTiposProducto = async (nombreItem) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const respuesta = await axios.get(`${baseUrl}/item-inventario/tipos?nombre_item=${nombreItem}`)

    tiposProducto.value = respuesta.data

    console.log('Tipos cargados:', tiposProducto.value)
  } catch (error) {
    console.error('Error al cargar tipos:', error)
  }
}

const getNombreProductosInventario = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/item-inventario/nombres`)
    itemInventarioLista.value = await respuesta.data
    console.log('Productos cargados:', itemInventarioLista.value)
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

// funcion iconos
const getIconoTipoMovimiento = (nombre) => {
  switch (nombre.toLowerCase()) {
    case 'entrada':
      return 'fa-solid fa-arrow-down text-green-500'

    case 'salida':
      return 'fa-solid fa-arrow-up text-red-500'

    case 'ajuste':
      return 'fa-solid fa-sliders text-yellow-500'

    case 'traslado':
      return 'fa-solid fa-right-left text-blue-500'

    default:
      return 'fa-solid fa-box text-gray-500'
  }
}
// USAR ESTA FUNCIÓN
const getMotivosMovimiento = async (tipoMovId) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const respuesta = await axios.get(`${baseUrl}/motivos-movimiento?tipo_mov_id=${tipoMovId}`)

    listaMotivosMovimiento.value = respuesta.data

    console.log('Motivos cargados:', listaMotivosMovimiento.value)
  } catch (error) {
    console.error('Error al cargar motivos:', error)
  }
}

const tiposMovimientoFiltrados = computed(() => {
  return listaTipoMovimientoAlmacen.value.filter((tipo) => tipo.nombre.toLowerCase() !== 'entrada')
})
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
        codigo_item: searchCodigo.value?.trim() || undefined,
        almacen_id: searchAlmacen.value || undefined,
        nombre_item: searchProducto.value || undefined,
        fecha_desde: searchFechaDesde.value ? `${searchFechaDesde.value}T00:00:00` : undefined,

        fecha_hasta: searchFechaHasta.value ? `${searchFechaHasta.value}T23:59:59` : undefined,
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
    const respuesta = await axios.get(`${baseUrl}/item-inventario/tipos`, {
      params: { nombre_item: nombreProducto },
    })

    listaTipos.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar tipos:', error)
  }
}

const cargarAlmacenes = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/almacen`)

    listaAlmacenes.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar almacenes:', error)
  }
}

const cargarProductos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const respuesta = await axios.get(`${baseUrl}/item-inventario/nombres`)
    listaProductos.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

const cerrarModalesMovimiento = () => {
  showResultadoModalShow.value = false

  showRegistroMovimientoModal.value = false

  stepMovimiento.value = 1

  loteSeleccionado.value = null

  cantidadMovimiento.value = null

  observacionesMovimiento.value = ''

  almacenDestinoSeleccionado.value = ''

  motivoMovimientoSeleccionado.value = null
}
watch(searchProducto, (nuevoProducto) => {
  if (nuevoProducto) {
    searchTipo.value = ''

    cargarTipos(nuevoProducto)
  }
})
watch(productoSeleccionado, (nuevoValor) => {
  if (!nuevoValor) {
    tiposProducto.value = []
    proveedoresLista.value = []
    return
  }

  // CARGAR TIPOS
  getTiposProducto(nuevoValor)

  // CARGAR PROVEEDORES
  getProveedores(nuevoValor)
})
watch(
  [searchProducto, searchTipo, searchCodigo, searchAlmacen, searchFechaDesde, searchFechaHasta],
  () => {
    getMovimientos()
  },
)
watch(tipoMovimientoSeleccionado, (nuevoValor) => {
  if (nuevoValor) {
    getMotivosMovimiento(nuevoValor)
  }
})
onMounted(() => {
  cargarProductos()
  cargarAlmacenes()
  getMovimientos()
  getListaTipoMovimientoAlmacen()
  getNombreProductosInventario()
  getLotesInventario()
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
        v-if="canCreateMovimiento"
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
        <label class="block text-sm font-medium text-gray-700 mb-2"> Fecha Desde </label>

        <input
          v-model="searchFechaDesde"
          type="date"
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
        <label class="block text-sm font-medium text-gray-700 mb-2"> Almacén </label>

        <select
          v-model="searchAlmacen"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Seleccione un almacén</option>
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
          <option value="">Seleccione un producto</option>
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
          <option value="">Seleccione un tipo</option>

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
            <h2 class="text-2xl font-bold text-gray-900">Nuevo registro de movimiento</h2>
            <p class="text-sm text-gray-500 mt-1">
              Registro de movimiento de inventario con trazabilidad completa
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
                  Selección & Configuración
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
                  Detalles & Finalización
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
                Configuración de movimiento
              </h3>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <!-- MOVEMENT TYPE -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Tipo de movimiento *
                  </label>

                  <div class="grid grid-cols-2 gap-3">
                    <div
                      v-for="tipo in tiposMovimientoFiltrados"
                      :key="tipo.tipo_mov_id"
                      class="relative"
                    >
                      <input
                        type="radio"
                        name="movement-type"
                        :id="`type-${tipo.tipo_mov_id}`"
                        :value="tipo.tipo_mov_id"
                        v-model="tipoMovimientoSeleccionado"
                        class="peer sr-only"
                      />

                      <label
                        :for="`type-${tipo.tipo_mov_id}`"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:shadow-sm transition-all"
                      >
                        <!-- ICONO -->
                        <i :class="getIconoTipoMovimiento(tipo.nombre)" class="text-2xl mb-2"></i>

                        <!-- NOMBRE -->
                        <span class="text-sm font-semibold text-gray-900 capitalize">
                          {{ tipo.nombre }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- MOVEMENT REASON -->
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Motivo de movimiento *
                  </label>

                  <div class="space-y-3">
                    <div
                      v-for="motivo in listaMotivosMovimiento"
                      :key="motivo.motivo_movimiento_id"
                      class="relative"
                    >
                      <input
                        type="radio"
                        name="movement-reason"
                        :id="`reason-${motivo.motivo_movimiento_id}`"
                        :value="motivo.motivo_movimiento_id"
                        v-model="motivoMovimientoSeleccionado"
                        class="peer sr-only"
                      />

                      <label
                        :for="`reason-${motivo.motivo_movimiento_id}`"
                        class="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-blue-50 transition-all"
                      >
                        <div
                          class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"
                        >
                          <i class="fa-solid fa-layer-group"></i>
                        </div>

                        <div>
                          <p class="text-sm font-semibold text-gray-900 capitalize">
                            {{ motivo.nombre }}
                          </p>

                          <p class="text-xs text-gray-500">Motivo de movimiento</p>
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
              <!-- 1. PRODUCTO -->
              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Product </label>

                <select
                  v-model="productoSeleccionado"
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <!-- OPTION POR DEFECTO -->
                  <option value="">Todos los productos</option>

                  <!-- OPCIONES DINÁMICAS -->
                  <option
                    v-for="producto in itemInventarioLista"
                    :key="producto.nombre_item"
                    :value="producto.nombre_item"
                  >
                    {{ producto.nombre_item }}
                  </option>
                </select>
              </div>

              <!-- 2 TIPO PRODUCTO -->
              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">
                  Tipo nombre
                </label>

                <select
                  v-model="tipoProductoSeleccionado"
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <option value="">Todos los tipos</option>

                  <option v-for="tipo in tiposProducto" :key="tipo.tipo" :value="tipo.tipo">
                    {{ tipo.tipo }}
                  </option>
                </select>
              </div>

              <!-- 3. Proveedor -->
              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Proveedor </label>

                <select
                  v-model="proveedorSeleccionado"
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <option value="">Todos los proveedores</option>

                  <option
                    v-for="proveedor in proveedoresLista"
                    :key="proveedor.proveedor_id"
                    :value="proveedor.proveedor_id"
                  >
                    {{ proveedor.nombre_razon_social }}
                  </option>
                </select>
              </div>
              <!-- 4. Almacen -->
              <div class="w-full lg:w-1/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Almacén </label>

                <select
                  v-model="almacenSeleccionado"
                  class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                >
                  <option value="">Todos los almacenes</option>

                  <option
                    v-for="almacen in listaAlmacenes"
                    :key="almacen.almacen_id"
                    :value="almacen.almacen_id"
                  >
                    {{ almacen.nombre }}
                  </option>
                </select>
              </div>
              <!-- 5. Search -->

              <div class="w-full lg:w-2/4">
                <label class="block text-xs font-semibold text-gray-600 mb-1.5"> Search </label>

                <div class="relative">
                  <i
                    class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  ></i>

                  <input
                    v-model="searchLote"
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
                      <th class="px-6 py-3">Código de item</th>
                      <th class="px-6 py-3">Nombre</th>
                      <th class="px-6 py-3">Almacén</th>
                      <th class="px-6 py-3 text-right">Stock Actual</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="lote in lotesPaginadosShow"
                      :key="lote.item_inventario_id"
                      @click="loteSeleccionado = lote"
                      class="border-b border-gray-200 hover:bg-blue-50 transition cursor-pointer"
                      :class="{
                        'bg-blue-50':
                          loteSeleccionado?.item_inventario_id === lote.item_inventario_id,
                      }"
                    >
                      <td class="px-6 py-4 font-medium text-primary">
                        {{ lote.codigo_item }}
                      </td>

                      <td class="px-6 py-4 font-semibold text-gray-900">
                        {{ lote.nombre_item }}
                      </td>

                      <td class="px-6 py-4">
                        {{ lote.almacen_nombre }}
                      </td>

                      <td class="px-6 py-4 text-right font-bold text-gray-900">
                        {{ lote.stock_actual }}
                        {{ lote.unidad_medida_stock }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-between items-center p-4 border-t bg-white">
                  <!-- SELECTOR -->
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Mostrar:</span>

                    <select
                      v-model="perPageShow"
                      @change="currentPageShow = 1"
                      class="border rounded px-2 py-1 text-sm"
                    >
                      <option v-for="opt in perPageOptionsShow" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>

                  <!-- CONTROLES -->
                  <div class="flex items-center gap-2">
                    <button
                      @click="prevPageShow"
                      class="px-3 py-1 text-sm border rounded disabled:opacity-50"
                      :disabled="currentPageShow === 1"
                    >
                      <i class="fa-solid fa-angles-left"></i>
                    </button>

                    <span class="text-sm">
                      Página {{ currentPageShow }} de {{ totalPagesShow }}
                    </span>

                    <button
                      @click="nextPageShow"
                      class="px-3 py-1 text-sm border rounded disabled:opacity-50"
                      :disabled="currentPageShow === totalPagesShow"
                    >
                      <i class="fa-solid fa-angles-right"></i>
                    </button>
                  </div>
                </div>
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

                  <div v-if="loteSeleccionado">
                    <p class="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
                      Lote seleccionado
                    </p>

                    <h4 class="text-lg font-bold text-gray-900">
                      {{ loteSeleccionado.nombre_item }}

                      <span class="text-gray-500 text-sm font-normal ml-2">
                        ({{ loteSeleccionado.codigo_item }})
                      </span>
                    </h4>
                  </div>
                </div>

                <div class="text-right">
                  <p class="text-xs text-gray-500 mb-0.5">Available Stock</p>

                  <p class="text-xl font-bold text-gray-900">
                    {{ loteSeleccionado?.stock_actual }}

                    <span class="text-sm font-medium text-gray-500">
                      {{ loteSeleccionado?.unidad_medida_stock }}
                    </span>
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
                      <h3 class="text-lg font-semibold text-gray-900">Lote seleccionado</h3>

                      <p class="text-sm text-gray-500">Información del lote</p>
                    </div>
                  </div>

                  <div v-if="loteSeleccionado" class="space-y-4">
                    <!-- CODIGO -->
                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Código</p>

                      <p class="font-semibold text-gray-900">
                        {{ loteSeleccionado.codigo_item }}
                      </p>
                    </div>

                    <!-- PRODUCTO -->
                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Producto</p>

                      <p class="font-semibold text-gray-900">
                        {{ loteSeleccionado.nombre_item }}
                      </p>
                    </div>

                    <!-- STOCK -->
                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Stock disponible</p>

                      <p class="text-2xl font-bold text-primary">
                        {{ loteSeleccionado.stock_actual }}
                        {{ loteSeleccionado.unidad_medida_stock }}
                      </p>
                    </div>

                    <!-- ALMACEN -->
                    <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p class="text-xs text-gray-500 mb-1">Almacén</p>

                      <p class="font-semibold text-gray-900">
                        {{ loteSeleccionado.almacen_nombre }}
                      </p>
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
                        v-model="cantidadMovimiento"
                        type="number"
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <!-- DESTINATION -->
                    <div v-if="tipoMovimientoSeleccionado == 4">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Destination Warehouse
                      </label>

                      <select
                        v-model="almacenDestinoSeleccionado"
                        class="w-full border border-gray-300 rounded-xl p-3 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Seleccionar almacén</option>

                        <option
                          v-for="almacen in listaAlmacenes"
                          :key="almacen.almacen_id"
                          :value="almacen.almacen_id"
                        >
                          {{ almacen.nombre }}
                        </option>
                      </select>
                    </div>

                    <!-- OBS -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Observations
                      </label>

                      <textarea
                        v-model="observacionesMovimiento"
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
            @click="guardarMovimiento"
            :disabled="loadingMovimientoShow"
            class="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <!-- SPINNER -->
            <div
              v-if="loadingMovimientoShow"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>

            <span>
              {{ loadingMovimientoShow ? 'Guardando...' : 'Guardar movimiento' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- RESULTADO MODAL -->
  <div
    v-if="showResultadoModalShow"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="p-6 rounded-xl w-[400px] shadow-lg text-center"
      :class="resultTypeShow === 'success' ? 'bg-green-100' : 'bg-red-100'"
    >
      <h2 class="text-xl font-bold mb-4 text-gray-900">
        {{ resultTypeShow === 'success' ? 'Operación exitosa' : 'Error' }}
      </h2>

      <p class="mb-6">
        {{ resultMessageShow }}
      </p>

      <button
        @click="cerrarModalesMovimiento"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        Aceptar
      </button>
    </div>
  </div>
</template>
