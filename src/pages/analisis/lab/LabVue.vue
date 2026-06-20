<template>
  <div class="bg-white text-black min-h-screen">
    <!-- Main 2-column layout -->
    <div class="flex flex-col xl:flex-row gap-5">
      <!-- LEFT: Work Queue -->
      <div id="left-col" class="xl:w-[400px] flex-shrink-0 space-y-4">
        <div id="cola-trabajo-card" class="card overflow-hidden">
          <div
            class="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white"
            style="background-color: #fff0f0"
          >
            <div>
              <h3 class="font-bold text-sm text-text-main">Cola de Trabajo</h3>
              <p class="text-xs text-text-muted mt-0.5">Clic en un lote para analizar</p>
            </div>
            <select
              v-model.number="estadoSeleccionado"
              @change="obtenerMuestras"
              class="border border-gray-300 rounded-lg px-2 py-1.5 text-xs bg-white text-text-muted focus:outline-none focus:border-brand-red"
            >
              <option :value="null">Todos</option>
              <option :value="2">Por analizar</option>
              <option :value="3">Bloqueado</option>
              <option :value="6">En análisis</option>
            </select>
          </div>

          <!-- COLA DE TRABAJO -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead
                class="bg-white text-xs text-text-muted uppercase"
                style="background-color: #fff0f0"
              >
                <tr>
                  <th class="px-3 py-2.5 font-semibold">Código Item</th>
                  <th class="px-3 py-2.5 font-semibold">Lote</th>
                  <th class="px-3 py-2.5 font-semibold">Estado lote</th>
                  <th class="px-3 py-2.5 font-semibold">Fecha</th>
                  <th class="px-3 py-2.5"></th>
                </tr>
              </thead>

              <tbody id="samples-table-body">
                <tr
                  v-for="item in muestrasPaginadas"
                  :key="item.codigo_item"
                  class="sample-row border-b border-red-50 cursor-pointer hover:bg-white transition-colors"
                >
                  <td class="px-3 py-3 font-mono text-xs font-bold text-blue-600">
                    {{ item.codigo_item }}
                  </td>

                  <td class="px-3 py-3 text-xs font-medium">
                    {{ item.nombre_lote || '-' }}
                  </td>

                  <td class="px-3 py-3">
                    <span
                      class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      :class="{
                        'bg-blue-100 text-blue-600': item.estado_lote_id === 6,

                        'bg-orange-100 text-orange-700': item.estado_lote_id === 5,

                        'bg-green-100 text-green-700': item.estado_lote_id === 4,

                        'bg-gray-100 text-gray-700': ![4, 5, 6].includes(item.estado_lote_id),
                      }"
                    >
                      {{ item.estado }}
                    </span>
                  </td>

                  <td class="px-3 py-3">
                    {{ item.fecha }}
                  </td>

                  <td class="px-3 py-3">
                    <button
                      @click="getLoteAnalisisoSolicitud(item.item_inventario_id, item)"
                      class="text-blue-600 hover:underline text-xs font-bold disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Ir→
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center items-center gap-2 py-3">
              <button
                @click="paginaActual--"
                :disabled="paginaActual === 1"
                class="px-3 py-1 border rounded disabled:opacity-40"
              >
                Anterior
              </button>

              <span class="text-sm"> Página {{ paginaActual }} de {{ totalPaginas }} </span>

              <button
                @click="paginaActual++"
                :disabled="paginaActual === totalPaginas"
                class="px-3 py-1 border rounded disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        <!-- No Conformidades -->
        <div id="nc-card" class="card p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-sm text-text-main flex items-center gap-2">
              <i class="fa-solid fa-circle-exclamation text-blue-600 text-xs"></i> No Conformidades
            </h3>
            <span class="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
              {{ noConformes.length }} activas
            </span>
          </div>

          <!-- Loading -->
          <div v-if="loadingNC" class="flex justify-center py-4">
            <i class="fa-solid fa-spinner animate-spin text-blue-500"></i>
          </div>

          <!-- Error -->
          <div v-else-if="errorNC" class="text-xs text-red-500 text-center py-2">
            <i class="fa-solid fa-triangle-exclamation mr-1"></i>{{ errorNC }}
          </div>

          <!-- Lista -->
          <div v-else class="space-y-2">
            <template v-for="item in noConformes" :key="item.analisis_id">
              <div
                v-for="ensayo in item.ensayos_no_conformes"
                :key="ensayo.ensayo_id"
                class="border border-gray-300 bg-white rounded-lg p-3 space-y-1"
              >
                <!-- Nombre + fecha -->
                <div class="flex items-center justify-between">
                  <p class="text-xs font-bold text-blue-600">{{ item.nombre }}</p>
                  <span class="text-xs text-text-muted">
                    <i class="fa-regular fa-calendar mr-1"></i>
                    <span class="font-medium text-text-main bg-gray-100 px-1 rounded">
                      Modificada el: {{ item.modificado_en }}
                    </span>
                  </span>
                </div>

                <!-- Tipo ensayo -->
                <p class="text-xs font-semibold text-text-main capitalize">
                  {{ ensayo.tipo_ensayo.replace(/_/g, ' ') }}
                </p>

                <!-- Datos del ensayo (humedad) -->
                <template v-if="ensayo.tipo_ensayo === 'humedad' && ensayo.humedad">
                  <p class="text-xs text-text-muted">
                    Resultado:
                    <span class="font-medium text-text-main">{{ ensayo.humedad.resultado }}%</span>
                  </p>
                  <p class="text-xs text-text-muted">
                    Peso ensayo:
                    <span class="font-medium text-text-main"
                      >{{ ensayo.humedad.peso_ensayo_g }}g</span
                    >
                  </p>
                </template>

                <!-- Datos del ensayo (acido_carminico) -->
                <template
                  v-else-if="ensayo.tipo_ensayo === 'acido_carminico' && ensayo.acido_carminico"
                >
                  <p class="text-xs text-text-muted">
                    Resultado:
                    <span class="font-medium text-text-main"
                      >{{ ensayo.acido_carminico.resultado.toFixed(2) }}%</span
                    >
                  </p>
                  <p class="text-xs text-text-muted">
                    Peso ensayo:
                    <span class="font-medium text-text-main"
                      >{{ ensayo.acido_carminico.peso_ensayo_g }}g</span
                    >
                  </p>
                  <p class="text-xs text-text-muted">
                    Absorbancia:
                    <span class="font-medium text-text-main"
                      >{{ ensayo.acido_carminico.absorbancia_nm }} nm</span
                    >
                  </p>
                </template>

                <!-- Badge no conformidad abierta + Acciones -->
                <div class="pt-1 flex items-center justify-between">
                  <span
                    v-if="ensayo.no_conformidad_abierta"
                    class="inline-block bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium"
                  >
                    Abierta
                  </span>
                  <span
                    v-else
                    class="inline-block bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full font-medium"
                  >
                    Cerrada
                  </span>

                  <!-- Botones -->
                  <!-- Botones -->
                  <div class="flex items-center gap-2">
                    <button
                      @click="aprobarNC(item.analisis_id)"
                      class="flex items-center gap-1 text-xs font-medium text-green-600 border border-green-300 bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded-full transition-colors"
                    >
                      <i class="fa-solid fa-check text-[10px]"></i> Aprobar
                    </button>
                    <button
                      @click="rechazarNC(item.analisis_id)"
                      class="flex items-center gap-1 text-xs font-medium text-red-600 border border-red-300 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-full transition-colors"
                    >
                      <i class="fa-solid fa-xmark text-[10px]"></i> Rechazar
                    </button>
                  </div>
                </div>
              </div>
            </template>

            <div v-if="noConformes.length === 0" class="text-xs text-text-muted text-center py-3">
              Sin no conformidades activas
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Panel -->
      <div id="analysis-panel" class="flex-1 min-w-0">
        <!-- Empty state -->
        <div
          v-if="tipoVista === 'empty'"
          class="card flex flex-col items-center justify-center text-center p-20"
        >
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-5">
            <i class="fa-solid fa-flask-vial text-blue-600 text-3xl"></i>
          </div>
          <h4 class="font-bold text-text-main text-lg mb-2">Ningún lote seleccionado</h4>
          <p class="text-sm text-text-muted max-w-xs leading-relaxed">
            Selecciona un lote de la tabla izquierda para iniciar la captura de datos técnicos del
            análisis químico.
          </p>
          <div class="mt-6 flex items-center gap-2 text-xs text-blue-400 font-medium">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Haz clic en "→" junto a cualquier lote</span>
          </div>
        </div>

        <!-- Vista de Solicitud -->
        <div v-else-if="tipoVista === 'solicitud'">
          <!-- Tus cards -->
          <div class="card p-6" style="border-left: 4px solid #c62828">
            <div class="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs uppercase text-gray-500 font-bold"> Lote seleccionado </span>

                  <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                    {{ analisis?.data.codigo_item }}
                  </span>
                </div>

                <h2 class="text-2xl font-bold">Resumen de Ensayos Requeridos</h2>

                <p class="text-sm text-gray-500 mt-1">
                  Revisa los ensayos asignados antes de iniciar la captura de datos.
                </p>
              </div>

              <div class="text-right text-sm">
                <div class="font-bold">
                  {{ analisis?.data['Solicitado por'] }}
                </div>
              </div>
            </div>

            <div class="mt-6 border rounded-xl p-5 grid grid-cols-3 text-center bg-gray-50">
              <div>
                <p class="text-gray-500 text-sm">Fecha solicitud</p>
                <p class="font-bold">
                  {{ analisis?.data['Fecha solicitud'] }}
                </p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Solicitado por</p>
                <p class="font-bold">
                  {{ analisis?.data['Solicitado por'] }}
                </p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Tipo de muestra</p>
                <p class="font-bold">
                  {{ analisis?.data['Tipo de muestra'] }}
                </p>
              </div>
            </div>
          </div>

          <div class="card p-6 mt-4">
            <div class="flex justify-between items-center mb-5">
              <h3 class="text-red-600 font-bold text-lg">Ensayos Asignados</h3>

              <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                {{ analisis?.data.parametros.length }} ensayos
              </span>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="p in analisis?.data.parametros"
                :key="p.solicitud_parametro_id"
                class="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p class="font-bold">
                    {{ obtenerNombreEnsayo(p.tipo_ensayo) }}
                  </p>

                  <p class="text-sm text-gray-500">
                    {{ obtenerDescripcionEnsayo(p.tipo_ensayo) }}
                  </p>
                </div>

                <span
                  class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold"
                >
                  Requerido
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Entry Panel (hidden) -->
        <div v-else-if="tipoVista === 'form'" class="space-y-4">
          <!-- cabecera -->
          <div id="form-header-card" class="card p-4" style="border-left: 4px solid #c62828">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <button
                @click="limpiarSeleccion"
                class="text-xs text-red-600 hover:underline font-bold"
              >
                ← Cambiar lote
              </button>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs text-text-muted uppercase tracking-wider font-semibold"
                    >Lote activo</span
                  >

                  <span class="bg-blue-100 text-blue-700 px-2 rounded">
                    {{ analisis?.data.codigo_item }}
                  </span>

                  <span
                    class="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-semibold"
                    >En Análisis</span
                  >
                </div>
                <h3 class="font-bold mt-2">
                  Captura de Datos —
                  {{ analisis?.data.nombre }}
                </h3>
              </div>
              <div class="flex items-center gap-2">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  class="w-7 h-7 rounded-full border-2 border-gray-300"
                />
                <div class="text-xs">
                  <span class="font-semibold text-text-main">Carlos M.</span>
                  <span class="text-text-muted ml-1">· Analista QC</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Technical fields grid -->
          <div id="technical-fields-card" class="card p-5">
            <h4
              class="font-bold text-sm text-blue-600 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200"
            >
              <i class="fa-solid fa-weight-scale text-xs"></i>
              Parámetros Físicos y Espectrofotométricos
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Peso de muestra -->
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >Peso de Muestra (g)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="field-peso"
                    v-model="form.peso_muestra_g"
                    placeholder="0.0000"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-semibold"
                    >g</span
                  >
                </div>
                <p class="text-xs text-text-muted mt-1">Rango: 0.4000 – 0.6000 g</p>
              </div>
            </div>
          </div>

          <!-- Color CIELab MODIFICADO||||  | -->
          <div v-if="ensayoColor" class="card p-5">
            <h4 class="font-bold text-blue-600 mb-4">Color CIELab</h4>

            <div class="grid md:grid-cols-4 gap-4">
              <div>
                <label>Peso ensayo (g)</label>

                <input type="number" v-model="form.color_cielab.peso_ensayo_g" />
              </div>

              <div>
                <label>L*</label>

                <input type="number" v-model="form.color_cielab.resultado_l" />
              </div>

              <div>
                <label>a*</label>

                <input type="number" v-model="form.color_cielab.resultado_a" />
              </div>

              <div>
                <label>b*</label>

                <input type="number" v-model="form.color_cielab.resultado_b" />
              </div>
            </div>
          </div>

          <div v-if="ensayoHumedad" class="card p-5">
            <h4 class="font-bold text-blue-600 mb-4">Humedad</h4>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label>Peso ensayo (g)</label>

                <input type="number" v-model="form.humedad.peso_ensayo_g" />
              </div>

              <div>
                <label>Resultado (%)</label>

                <input type="number" v-model="form.humedad.resultado" />
              </div>
            </div>
          </div>

          <div v-if="ensayoAcido" class="card p-5">
            <h4 class="font-bold text-blue-600 mb-4">Ácido Carmínico</h4>

            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label>Peso ensayo (g)</label>

                <input type="number" v-model="form.acido_carminico.peso_ensayo_g" />
              </div>

              <div>
                <label>Absorbancia</label>

                <input type="number" v-model="form.acido_carminico.absorbancia_nm" />
              </div>

              <div>
                <label>Resultado (%)</label>

                <input type="number" v-model="form.acido_carminico.resultado" />
              </div>
            </div>
          </div>

          <!-- Observaciones -->
          <div id="observaciones-card" class="card p-5">
            <h4
              class="font-bold text-sm text-blue-600 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200"
            >
              <i class="fa-solid fa-note-sticky text-xs"></i>
              Observaciones
            </h4>
            <textarea v-model="form.observaciones"></textarea>
          </div>

          <!-- Decisión de Lote -->
          <div id="decision-card" class="card p-5">
            <h4
              class="font-bold text-sm text-blue-600 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200"
            >
              <i class="fa-solid fa-gavel text-xs"></i>
              Decisión de Lote
            </h4>
            <div class="flex gap-3 mb-4">
              <label class="flex-1 cursor-pointer">
                <input type="radio" name="decision" value="aprobar" class="hidden peer" />
                <div
                  class="peer-checked:border-green-500 peer-checked:bg-green-50 border-2 border-gray-200 rounded-lg p-3 text-center transition"
                >
                  <i class="fa-solid fa-circle-check text-green-500 text-lg mb-1"></i>
                  <p class="text-xs font-bold text-green-700">Guardar cambios</p>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input type="radio" name="decision" value="rechazar" class="hidden peer" />
                <div
                  class="peer-checked:border-red-500 peer-checked:bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition"
                >
                  <i class="fa-solid fa-circle-check text-blue-600 text-lg mb-1"></i>
                  <p class="text-xs font-bold text-blue-600">Terminar análisis</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'
const loteSeleccionado = ref(false)

const muestras = ref([])
const estadoSeleccionado = ref(null)
const itemSeleccionado = ref(null)
const form = reactive({
  observaciones: '',

  peso_muestra_g: '',

  humedad: {
    peso_ensayo_g: '',
    resultado: '',
  },

  acido_carminico: {
    peso_ensayo_g: '',
    absorbancia_nm: '',
    resultado: '',
  },

  color_cielab: {
    peso_ensayo_g: '',
    resultado_l: '',
    resultado_a: '',
    resultado_b: '',
  },
})

const obtenerNombreEnsayo = (tipo) => {
  switch (tipo) {
    case 'humedad':
      return 'Humedad'

    case 'acido_carminico':
      return 'Ácido Carmínico'

    case 'color_cielab':
      return 'Color CIELab'

    default:
      return tipo
  }
}

const obtenerDescripcionEnsayo = (tipo) => {
  switch (tipo) {
    case 'humedad':
      return 'Determinación de humedad'

    case 'acido_carminico':
      return 'Cuantificación por espectrofotometría UV-Vis'

    case 'color_cielab':
      return 'Medición L*, a*, b* con colorímetro'

    default:
      return ''
  }
}

const cargarFormulario = (analisis) => {
  if (!analisis || analisis.tipo !== 'analisis') return

  const data = analisis.data

  // Datos generales
  form.observaciones = data.observaciones ?? ''
  form.peso_muestra_g = data.peso_muestra_g ?? ''

  // Reiniciar
  form.humedad = {
    peso_ensayo_g: '',
    resultado: '',
  }

  form.acido_carminico = {
    peso_ensayo_g: '',
    absorbancia_nm: '',
    resultado: '',
  }

  // Recorrer ensayos
  data.ensayos.forEach((ensayo) => {
    if (ensayo.tipo_ensayo === 'humedad') {
      form.humedad = {
        peso_ensayo_g: ensayo.humedad?.peso_ensayo_g ?? '',
        resultado: ensayo.humedad?.resultado ?? '',
      }
    }

    if (ensayo.tipo_ensayo === 'acido_carminico') {
      form.acido_carminico = {
        peso_ensayo_g: ensayo.acido_carminico?.peso_ensayo_g ?? '',
        absorbancia_nm: ensayo.acido_carminico?.absorbancia_nm ?? '',
        resultado: ensayo.acido_carminico?.resultado ?? '',
      }
    }
  })
}

const paginaActual = ref(1)
const registrosPorPagina = 5

const analisis = ref(null)
const loading = ref(false)
const limpiarSeleccion = () => {
  analisis.value = null
  loteSeleccionado.value = false
}
const data = computed(() => analisis.value?.data || {})

const tipoVista = computed(() => {
  if (!analisis.value) {
    return 'empty'
  }

  if (analisis.value.tipo === 'analisis') {
    return 'form'
  }

  if (analisis.value.tipo === 'solicitud') {
    return 'solicitud'
  }

  return 'empty'
})

const getLoteAnalisisoSolicitud = async (id, item) => {
  console.log('Obteniendo análisis para item_inventario_id:', id)
  console.log('Item seleccionado:', item)
  loading.value = true
  loteSeleccionado.value = true

  itemSeleccionado.value = item

  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const { data } = await axios.get(`${baseUrl}/laboratorio/analisis-o-solicitud`, {
      params: { item_inventario_id: id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    analisis.value = data
    cargarFormulario(data)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const obtenerMuestras = async () => {
  const params = {
    orden: 'desc',
  }

  if (estadoSeleccionado.value != null) {
    params.estado_lote_id = estadoSeleccionado.value
  }

  console.log(params)
  const baseUrl = import.meta.env.VITE_API_URL
  const { data } = await axios.get(`${baseUrl}/item-inventario/muestras-pendientes-laboratorio`, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  muestras.value = data
  paginaActual.value = 1
}

const muestrasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * registrosPorPagina

  return muestras.value.slice(inicio, inicio + registrosPorPagina)
})

const totalPaginas = computed(() => Math.ceil(muestras.value.length / registrosPorPagina))

const tieneAnalisis = computed(() => {
  return analisis.value !== null
})

const estadoLote = computed(() => {
  return analisis.value?.data?.estado_lote_id ?? null
})

const puedeAnalizar = computed(() => {
  return estadoLote.value === 6 // "En análisis"
})

/// no confromidades
// Composition API con <script setup>
const noConformes = ref([])
const loadingNC = ref(false)
const errorNC = ref(null)

const fetchNoConformes = async () => {
  loadingNC.value = true
  errorNC.value = null
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://147.182.251.164:3000/api/laboratorio/no-conformes', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error(`Error ${res.status}`)
    noConformes.value = await res.json()
  } catch (e) {
    errorNC.value = 'No se pudieron cargar las no conformidades.'
    console.error(e)
  } finally {
    loadingNC.value = false
  }
}

const labelTipoEnsayo = (tipo) => {
  const labels = {
    humedad: 'Humedad fuera de rango',
    acido_carminico: 'Ácido carmínico fuera de rango',
    color: 'Color fuera de rango',
  }
  return labels[tipo] ?? tipo.replace(/_/g, ' ')
}

const descripcionEnsayo = (ensayo) => {
  const tipo = ensayo.tipo_ensayo
  if (tipo === 'humedad' && ensayo.humedad) {
    return `Resultado: ${ensayo.humedad.resultado}% — Peso ensayo: ${ensayo.humedad.peso_ensayo_g}g`
  }
  if (tipo === 'acido_carminico' && ensayo.acido_carminico) {
    return `Resultado: ${ensayo.acido_carminico.resultado.toFixed(2)}% — Abs: ${ensayo.acido_carminico.absorbancia_nm}`
  }
  return 'Ver detalle'
}

const aprobarNC = async (analisis_id) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')
    const res = await axios.patch(
      `${baseUrl}/laboratorio/${analisis_id}/aprobacion`,
      { aprobado: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('Respuesta aprobación NC:', res)
    if (res.status !== 200) throw new Error(`Error ${res.status}`)
    await fetchNoConformes()
  } catch (e) {
    console.error('Error al aprobar NC:', e)
  }
}

const rechazarNC = async (analisis_id) => {
  console.log('Rechazar:', analisis_id)
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')
    const res = await axios.patch(
      `${baseUrl}/laboratorio/${analisis_id}/aprobacion`,
      {
        aprobado: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('Respuesta rechazo NC:', res)
    if (res.status !== 200) throw new Error(`Error ${res.status}`)
    // Refrescar lista de no conformidades
    await fetchNoConformes()
  } catch (e) {
    console.error('Error al rechazar NC:', e)
  }
  // tu lógica o llamada al endpoint aquí
}

const tieneColorCIELab = computed(() => {
  return analisis.value?.data?.ensayos?.some((e) => e.tipo_ensayo === 'color_cielab')
})

const ensayoHumedad = computed(() =>
  analisis.value?.data?.ensayos?.find((e) => e.tipo_ensayo === 'humedad'),
)

const ensayoAcido = computed(() =>
  analisis.value?.data?.ensayos?.find((e) => e.tipo_ensayo === 'acido_carminico'),
)

const ensayoColor = computed(() =>
  analisis.value?.data?.ensayos?.find((e) => e.tipo_ensayo === 'color_cielab'),
)

onMounted(() => {
  obtenerMuestras()
  fetchNoConformes()
})
</script>

<style scoped>
.card {
  @apply bg-white border border-gray-200 rounded-xl shadow-sm;
}

.text-text-main {
  @apply text-black;
}

.text-text-muted {
  @apply text-gray-600;
}

.mono {
  font-family: monospace;
}
</style>
