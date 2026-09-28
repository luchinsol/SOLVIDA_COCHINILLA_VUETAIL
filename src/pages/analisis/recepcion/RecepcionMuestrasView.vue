<template>
  <section class="flex w-full min-w-0 flex-col gap-6">
    <header class="flex min-h-16 w-full items-center border-b border-slate-200 pb-5">
      <div>
        <h1 class="text-2xl font-black text-slate-900">Recepción de muestras</h1>
        <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Servicio de análisis externos
        </p>
      </div>

      <div class="ml-auto flex shrink-0 items-center pl-6">
        <button
          type="button"
          @click="mostrarRecepcion = true"
          class="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-800"
        >
          <i class="fa-solid fa-plus"></i>
          Recepción de muestra
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article class="summary-card border-l-red-600">
        <div>
          <p class="summary-label">Recibidas hoy</p>
          <p class="summary-value">{{ resumen.recibidas_hoy }}</p>
        </div>
        <span class="summary-icon bg-red-50 text-red-600">
          <i class="fa-solid fa-box-open"></i>
        </span>
      </article>

      <article class="summary-card border-l-orange-500">
        <div>
          <p class="summary-label">Pendientes de envío</p>
          <p class="summary-value text-orange-500">{{ resumen.pendientes_envio }}</p>
        </div>
        <span class="summary-icon bg-orange-50 text-orange-500">
          <i class="fa-solid fa-truck-ramp-box"></i>
        </span>
      </article>

      <article class="summary-card border-l-emerald-500">
        <div>
          <p class="summary-label">Análisis completados</p>
          <p class="summary-value text-emerald-600">{{ resumen.analisis_completados }}</p>
        </div>
        <span class="summary-icon bg-emerald-50 text-emerald-600">
          <i class="fa-solid fa-circle-check"></i>
        </span>
      </article>
    </div>

    <section class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <h2 class="text-sm font-black uppercase tracking-widest text-slate-900">
            Últimos recibos generados
          </h2>
          <p class="mt-1 text-xs text-slate-400">Muestras externas recibidas recientemente</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label class="relative block min-w-0 sm:w-72">
            <span class="sr-only">Buscar recibo</span>
            <i
              class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-300"
            ></i>
            <input
              v-model.trim="busqueda"
              type="search"
              placeholder="Buscar cliente, recibo o muestra"
              class="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            />
          </label>

          <label class="block sm:w-44">
            <span class="sr-only">Filtrar por estado</span>
            <select
              v-model="estadoSeleccionado"
              class="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
            >
              <option value="">Todos los estados</option>
              <option value="recibido">Recibido</option>
              <option value="entregado_laboratorio">Entregado a laboratorio</option>
              <option value="en_analisis">En análisis</option>
              <option value="finalizado">Análisis terminado</option>
              <option value="entregado_cliente">Entregado al cliente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </label>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[980px] border-collapse text-left">
          <thead class="bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th class="px-5 py-4">N° recibo</th>
              <th class="px-5 py-4">Fecha</th>
              <th class="px-5 py-4">Cliente</th>
              <th class="px-5 py-4">Muestras</th>
              <th class="px-5 py-4">Ensayos</th>
              <th class="px-5 py-4">Estado</th>
              <th class="px-5 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs text-slate-600">
            <tr v-if="cargando">
              <td colspan="7" class="px-5 py-14 text-center text-slate-400">
                <i class="fa-solid fa-spinner mr-2 animate-spin"></i>
                Cargando recibos...
              </td>
            </tr>
            <tr v-else-if="errorCarga">
              <td colspan="7" class="px-5 py-14 text-center font-semibold text-red-500">
                {{ errorCarga }}
              </td>
            </tr>
            <tr v-else-if="servicios.length === 0">
              <td colspan="7" class="px-5 py-14 text-center text-slate-400">
                No se encontraron recibos.
              </td>
            </tr>
            <template v-else>
            <tr
              v-for="servicio in servicios"
              :key="servicio.servicio_id"
              class="transition-colors hover:bg-slate-50/70"
            >
              <td class="px-5 py-5 font-black text-blue-600">{{ servicio.codigo_recibo }}</td>
              <td class="px-5 py-5 font-semibold">{{ servicio.fecha_recepcion }}</td>
              <td class="px-5 py-5 font-bold uppercase text-slate-700">
                {{ servicio.cliente }}
              </td>
              <td class="px-5 py-5">
                <p class="font-semibold text-slate-700">
                  {{ servicio.cantidad_muestras }}
                  {{ servicio.cantidad_muestras === 1 ? 'muestra' : 'muestras' }}
                </p>
                <p class="mt-1 max-w-56 text-[10px] text-slate-400">
                  {{ nombresMuestras(servicio) }}
                </p>
              </td>
              <td class="px-5 py-5">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="ensayo in servicio.ensayos"
                    :key="ensayo"
                    class="test-badge"
                  >
                    {{ nombreEnsayo(ensayo) }}
                  </span>
                </div>
              </td>
              <td class="px-5 py-5">
                <span class="status-badge" :class="claseEstado(servicio.estado)">
                  {{ nombreEstado(servicio.estado) }}
                </span>
              </td>
              <td class="px-5 py-5">
                <div class="flex justify-center gap-1.5">
                  <button
                    type="button"
                    class="icon-button text-blue-600 hover:border-blue-200 hover:bg-blue-50"
                    title="Ver información del análisis"
                    @click="abrirDetalle(servicio.servicio_id)"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button type="button" class="icon-button text-slate-300" title="Impresión disponible próximamente" disabled>
                    <i class="fa-solid fa-print"></i>
                  </button>
                </div>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>

      <footer class="flex items-center justify-between border-t border-slate-200 px-5 py-4">
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Página {{ paginacion.pagina }} de {{ paginacion.total_paginas }}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="pagination-button disabled:cursor-not-allowed disabled:opacity-40"
            title="Página anterior"
            :disabled="cargando || paginacion.pagina <= 1"
            @click="cambiarPagina(paginacion.pagina - 1)"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button
            type="button"
            class="pagination-button disabled:cursor-not-allowed disabled:opacity-40"
            title="Página siguiente"
            :disabled="cargando || paginacion.pagina >= paginacion.total_paginas"
            @click="cambiarPagina(paginacion.pagina + 1)"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </footer>
    </section>

    <div
      v-if="detalleAbierto"
      class="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
      @click.self="cerrarDetalle"
    >
      <section class="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <header class="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p class="text-[9px] font-black uppercase tracking-widest text-blue-600">
              Información del servicio
            </p>
            <h2 class="mt-1 text-xl font-black text-slate-900">
              {{ servicioDetalle?.codigo_recibo || 'Detalle del análisis' }}
            </h2>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center text-slate-400 transition hover:text-slate-700"
            title="Cerrar"
            @click="cerrarDetalle"
          >
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </header>

        <div class="overflow-y-auto px-6 py-5">
          <div v-if="cargandoDetalle" class="flex min-h-64 items-center justify-center text-sm text-slate-400">
            <i class="fa-solid fa-spinner mr-2 animate-spin text-blue-600"></i>
            Cargando información...
          </div>

          <div v-else-if="errorDetalle" class="flex min-h-64 items-center justify-center text-sm font-semibold text-red-500">
            {{ errorDetalle }}
          </div>

          <template v-else-if="servicioDetalle">
            <div class="grid grid-cols-1 gap-4 border-b border-slate-200 pb-5 sm:grid-cols-3">
              <div>
                <p class="detail-label">Cliente</p>
                <p class="detail-value">{{ servicioDetalle.cliente }}</p>
              </div>
              <div>
                <p class="detail-label">Fecha de recepción</p>
                <p class="detail-value">{{ servicioDetalle.fecha_recepcion }}</p>
              </div>
              <div>
                <p class="detail-label">Estado</p>
                <span class="status-badge mt-1" :class="claseEstado(servicioDetalle.estado)">
                  {{ nombreEstado(servicioDetalle.estado) }}
                </span>
              </div>
            </div>

            <div class="mt-5 space-y-4">
              <article
                v-for="muestra in servicioDetalle.muestras"
                :key="muestra.muestra_id"
                class="rounded-lg border border-slate-200"
              >
                <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <div>
                    <p class="text-[9px] font-black uppercase tracking-widest text-blue-600">
                      {{ muestra.codigo_muestra }}
                    </p>
                    <h3 class="mt-1 text-sm font-black text-slate-900">{{ muestra.nombre_muestra }}</h3>
                  </div>
                  <p class="text-xs font-bold text-slate-600">
                    {{ numero(muestra.cantidad_recibida) }} {{ muestra.unidad_de_medida }} recibidos
                  </p>
                </div>

                <div v-if="muestra.analisis_id" class="px-5 py-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p class="detail-label">Número de análisis</p>
                      <p class="detail-value text-blue-600">{{ muestra.numero_analisis }}</p>
                    </div>
                    <div>
                      <p class="detail-label">Peso de muestra</p>
                      <p class="detail-value">{{ numero(muestra.peso_muestra_g) }} g</p>
                    </div>
                  </div>

                  <div class="mt-5 border-t border-slate-100 pt-4">
                    <p class="detail-label mb-3">Resultados de los ensayos</p>
                    <div class="divide-y divide-slate-100 rounded-lg border border-slate-200">
                      <div
                        v-for="ensayo in muestra.ensayos"
                        :key="ensayo.ensayo_id"
                        class="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-[1fr_2fr] sm:items-center"
                      >
                        <div>
                          <p class="text-xs font-black text-slate-800">{{ nombreEnsayo(ensayo.tipo_ensayo) }}</p>
                          <p class="mt-0.5 text-[10px] text-slate-400">
                            Peso del ensayo: {{ numero(ensayo.peso_ensayo_g) }} g
                          </p>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-700">
                          <template v-if="ensayo.tipo_ensayo === 'acido_carminico'">
                            <span>Resultado: {{ numero(ensayo.resultado?.porcentaje) }} %</span>
                            <span>Absorbancia: {{ numero(ensayo.resultado?.absorbancia_nm) }}</span>
                          </template>
                          <template v-else-if="ensayo.tipo_ensayo === 'humedad'">
                            <span>Resultado: {{ numero(ensayo.resultado?.porcentaje) }} %</span>
                          </template>
                          <template v-else-if="ensayo.tipo_ensayo === 'color_cielab'">
                            <span>L*: {{ numero(ensayo.resultado?.l) }}</span>
                            <span>a*: {{ numero(ensayo.resultado?.a) }}</span>
                            <span>b*: {{ numero(ensayo.resultado?.b) }}</span>
                          </template>
                          <span
                            class="font-black"
                            :class="ensayo.conforme ? 'text-emerald-600' : 'text-red-500'"
                          >
                            {{ ensayo.conforme ? 'Conforme' : 'No conforme' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="px-5 py-8 text-center text-xs font-semibold text-slate-400">
                  Esta muestra todavía no tiene un análisis registrado.
                </div>
              </article>
            </div>
          </template>
        </div>
      </section>
    </div>

    <RecepcionMuestrasModal
      :show="mostrarRecepcion"
      @close="mostrarRecepcion = false"
      @created="alCrearServicio"
    />
  </section>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import RecepcionMuestrasModal from './RecepcionMuestrasModal.vue'

const mostrarRecepcion = ref(false)
const servicios = ref([])
const busqueda = ref('')
const estadoSeleccionado = ref('')
const cargando = ref(false)
const errorCarga = ref('')
const detalleAbierto = ref(false)
const cargandoDetalle = ref(false)
const errorDetalle = ref('')
const servicioDetalle = ref(null)
const resumen = reactive({
  recibidas_hoy: 0,
  pendientes_envio: 0,
  analisis_completados: 0,
})
const paginacion = reactive({
  pagina: 1,
  limite: 5,
  total: 0,
  total_paginas: 1,
})
let temporizadorBusqueda

const headersAutorizacion = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
})

const cargarServicios = async () => {
  cargando.value = true
  errorCarga.value = ''

  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${baseUrl}/laboratorio/servicios-analisis`, {
      params: {
        pagina: paginacion.pagina,
        limite: paginacion.limite,
        buscar: busqueda.value || undefined,
        estado: estadoSeleccionado.value || undefined,
      },
      headers: headersAutorizacion(),
    })

    servicios.value = Array.isArray(data.data) ? data.data : []
    Object.assign(paginacion, data.pagination || {})
  } catch (error) {
    console.error('No se pudieron cargar los servicios:', error)
    servicios.value = []
    errorCarga.value = error.response?.data?.error || 'No fue posible cargar los recibos.'
  } finally {
    cargando.value = false
  }
}

const cargarResumen = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${baseUrl}/laboratorio/servicios-analisis/resumen`, {
      headers: headersAutorizacion(),
    })
    Object.assign(resumen, data)
  } catch (error) {
    console.error('No se pudo cargar el resumen de recepción:', error)
  }
}

const cambiarPagina = (pagina) => {
  paginacion.pagina = pagina
  cargarServicios()
}

const alCrearServicio = async () => {
  paginacion.pagina = 1
  await Promise.all([cargarServicios(), cargarResumen()])
}

const abrirDetalle = async (servicioId) => {
  detalleAbierto.value = true
  cargandoDetalle.value = true
  errorDetalle.value = ''
  servicioDetalle.value = null

  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${baseUrl}/laboratorio/servicios-analisis/${servicioId}`, {
      headers: headersAutorizacion(),
    })
    servicioDetalle.value = data
  } catch (error) {
    console.error('No se pudo cargar el detalle del análisis:', error)
    errorDetalle.value = error.response?.data?.error || 'No fue posible cargar el detalle del análisis.'
  } finally {
    cargandoDetalle.value = false
  }
}

const cerrarDetalle = () => {
  detalleAbierto.value = false
  servicioDetalle.value = null
  errorDetalle.value = ''
}

const numero = (valor) => {
  if (valor === null || valor === undefined || valor === '') return '-'
  const valorNumerico = Number(valor)
  if (!Number.isFinite(valorNumerico)) return '-'
  return valorNumerico.toLocaleString('es-PE', { maximumFractionDigits: 6 })
}

const nombresMuestras = (servicio) =>
  servicio.muestras.map((muestra) => muestra.nombre_muestra).join(', ') || '-'

const nombreEnsayo = (ensayo) => ({
  acido_carminico: 'Ácido carmínico',
  humedad: 'Humedad',
  color_cielab: 'Color CIELAB',
}[ensayo] || ensayo)

const nombreEstado = (estado) => ({
  recibido: 'Recibido',
  entregado_laboratorio: 'Entregado a laboratorio',
  en_analisis: 'En análisis',
  finalizado: 'Análisis terminado',
  entregado_cliente: 'Entregado al cliente',
  cancelado: 'Cancelado',
}[estado] || estado)

const claseEstado = (estado) => ({
  recibido: 'bg-blue-50 text-blue-600',
  entregado_laboratorio: 'bg-violet-50 text-violet-600',
  en_analisis: 'bg-orange-50 text-orange-600',
  finalizado: 'bg-emerald-50 text-emerald-600',
  entregado_cliente: 'bg-teal-50 text-teal-600',
  cancelado: 'bg-red-50 text-red-600',
}[estado] || 'bg-slate-100 text-slate-600')

watch(busqueda, () => {
  clearTimeout(temporizadorBusqueda)
  temporizadorBusqueda = setTimeout(() => {
    paginacion.pagina = 1
    cargarServicios()
  }, 350)
})

watch(estadoSeleccionado, () => {
  paginacion.pagina = 1
  cargarServicios()
})

onMounted(() => Promise.all([cargarServicios(), cargarResumen()]))
</script>

<style scoped>
.summary-card {
  @apply flex min-h-32 items-center justify-between rounded-lg border border-l-4 border-slate-200 bg-white p-6 shadow-sm;
}

.summary-label {
  @apply text-[9px] font-black uppercase tracking-widest text-slate-400;
}

.summary-value {
  @apply mt-3 text-3xl font-black text-slate-900;
}

.summary-icon {
  @apply flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base;
}

.test-badge {
  @apply rounded bg-blue-50 px-2 py-1 text-[8px] font-black uppercase text-blue-700;
}

.status-badge {
  @apply inline-flex rounded px-2.5 py-1 text-[9px] font-black uppercase tracking-wider;
}

.detail-label {
  @apply text-[9px] font-black uppercase tracking-widest text-slate-400;
}

.detail-value {
  @apply mt-1 text-sm font-bold text-slate-800;
}

.icon-button,
.pagination-button {
  @apply flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[11px] transition-colors hover:bg-slate-50;
}

.pagination-button {
  @apply text-slate-400;
}
</style>
