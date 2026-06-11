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
            <span class="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold"
              >3 activas</span
            >
          </div>
          <div class="space-y-2">
            <div class="border border-gray-300 bg-white rounded-lg p-3">
              <div class="flex items-center justify-between mb-1">
                <p class="text-xs font-bold text-blue-600">NC-089</p>
                <span class="text-xs text-text-muted mono">EXT-2023-A</span>
              </div>
              <p class="text-xs font-semibold text-text-main">Humedad fuera de rango</p>
              <p class="text-xs text-text-muted mt-0.5">Valor: 8.2% — Límite: ≤6%</p>
            </div>
            <div class="border border-gray-300 bg-white rounded-lg p-3">
              <div class="flex items-center justify-between mb-1">
                <p class="text-xs font-bold text-blue-600">NC-090</p>
                <span class="text-xs text-text-muted mono">EXT-2023-B</span>
              </div>
              <p class="text-xs font-semibold text-text-main">Ácido carmínico bajo</p>
              <p class="text-xs text-text-muted mt-0.5">Valor: 42.1% — Límite: ≥50%</p>
            </div>
            <div class="border border-gray-300 bg-white rounded-lg p-3">
              <div class="flex items-center justify-between mb-1">
                <p class="text-xs font-bold text-blue-600">NC-091</p>
                <span class="text-xs text-text-muted mono">EXT-2023-C</span>
              </div>
              <p class="text-xs font-semibold text-text-main">Color L* desviado</p>
              <p class="text-xs text-text-muted mt-0.5">Valor: 31.4 — Rango: 35–55</p>
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

        <!-- Data Entry Panel (hidden) -->
        <div v-else-if="tipoVista === 'form'" class="space-y-4">
          <!-- Form header -->
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
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >Peso de Muestra (g)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="field-peso"
                    placeholder="0.0000"
                    step="0.0001"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-semibold"
                    >g</span
                  >
                </div>
                <p class="text-xs text-text-muted mt-1">Rango: 0.4000 – 0.6000 g</p>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >Absorbancia (Abs)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="field-absorbancia"
                    placeholder="0.000"
                    step="0.001"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-semibold"
                    >Abs</span
                  >
                </div>
                <p class="text-xs text-text-muted mt-1">Longitud de onda: 494 nm</p>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >Ácido Carmínico (%)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="field-ac"
                    placeholder="0.00"
                    step="0.01"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-semibold"
                    >%</span
                  >
                </div>
                <div id="ac-status" class="text-xs mt-1 text-text-muted">Especificación: ≥ 50%</div>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >Humedad (%)</label
                >
                <div class="relative">
                  <input
                    type="number"
                    id="field-humedad"
                    placeholder="0.00"
                    step="0.01"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 font-semibold"
                    >%</span
                  >
                </div>
                <div id="hum-status" class="text-xs mt-1 text-text-muted">Especificación: ≤ 6%</div>
              </div>
            </div>
          </div>

          <!-- Color CIELab -->
          <div id="color-fields-card" class="card p-5">
            <h4
              class="font-bold text-sm text-blue-600 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200"
            >
              <i class="fa-solid fa-palette text-xs"></i>
              Resultados de Color CIELab
            </h4>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >L* — Luminosidad</label
                >
                <input
                  type="number"
                  id="field-L"
                  placeholder="0.00"
                  step="0.01"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                />
                <div id="L-status" class="text-xs mt-1 text-text-muted">Rango: 35 – 55</div>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >a* — Rojo/Verde</label
                >
                <input
                  type="number"
                  id="field-A"
                  placeholder="0.00"
                  step="0.01"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                />
                <div id="A-status" class="text-xs mt-1 text-text-muted">Rango: 20 – 40</div>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide"
                  >b* — Azul/Amarillo</label
                >
                <input
                  type="number"
                  id="field-B"
                  placeholder="0.00"
                  step="0.01"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm mono font-medium bg-white transition"
                />
                <div id="B-status" class="text-xs mt-1 text-text-muted">Rango: -10 – 10</div>
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
            <textarea
              id="field-obs"
              rows="3"
              placeholder="Ingresa observaciones técnicas relevantes del análisis..."
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white transition resize-none"
            ></textarea>
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
                  <p class="text-xs font-bold text-green-700">Aprobar Lote</p>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input type="radio" name="decision" value="rechazar" class="hidden peer" />
                <div
                  class="peer-checked:border-red-500 peer-checked:bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition"
                >
                  <i class="fa-solid fa-circle-xmark text-blue-600 text-lg mb-1"></i>
                  <p class="text-xs font-bold text-blue-600">Rechazar Lote</p>
                </div>
              </label>
            </div>
            <textarea
              id="field-comments"
              rows="2"
              placeholder="Comentarios de la decisión (requerido para rechazo)..."
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white transition resize-none mb-4"
            ></textarea>
            <button
              id="confirm-btn"
              class="w-full py-3 bg-blue-600 hover:bg-blue-600-dark text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition shadow"
            >
              <i class="fa-solid fa-check-circle"></i> Confirmar Análisis
            </button>
          </div>
        </div>

        <!-- Analysis Results (hidden) -->
        <div v-else class="space-y-4">
          <!-- Ensayos list -->
          <div id="ensayos-list-card" class="card p-5">
            <h4
              class="font-bold text-sm text-brand-red mb-4 flex items-center gap-2 pb-3 border-b border-red-100"
            >
              <i class="fa-solid fa-list-check text-xs"></i>
              Ensayos Asignados
              <span
                id="ensayos-count"
                class="ml-auto bg-red-100 text-brand-red text-xs font-bold px-2 py-0.5 rounded-full"
              >
                {{ analisis?.data?.parametros?.length || 0 }}
              </span>
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="p in analisis?.data?.parametros"
                :key="p.solicitud_parametro_id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <p class="text-xs font-bold text-blue-600">
                  {{ p.tipo_ensayo }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const loteSeleccionado = ref(false)

const muestras = ref([])
const estadoSeleccionado = ref(null)
const itemSeleccionado = ref(null)

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
  if (!analisis.value) return 'empty'
  /*if (!loteSeleccionado.value || !itemSeleccionado.value) {
    return 'empty'
  }*/

  return itemSeleccionado.value.estado === 'en analisis' ? 'form' : 'ensayos'
})
const getLoteAnalisisoSolicitud = async (id, item) => {
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
onMounted(() => {
  obtenerMuestras()
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
