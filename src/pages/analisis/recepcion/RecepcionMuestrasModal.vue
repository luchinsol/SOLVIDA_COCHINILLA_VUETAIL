<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recepcion-modal-title"
      @click.self="emit('close')"
    >
      <div
        class="relative flex h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div
          v-if="enviando"
          class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm"
        >
          <span class="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#1e3a8a]"></span>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-600">
            Registrando servicio...
          </p>
        </div>
        <aside
          class="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-slate-50 p-7 md:flex"
        >
          <div>
            <span
              class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1e3a8a] text-white shadow-lg shadow-blue-100"
            >
              <i class="fa-solid fa-receipt text-lg"></i>
            </span>
            <h2
              id="recepcion-modal-title"
              class="mt-6 text-xl font-black uppercase leading-tight text-slate-900"
            >
              Nuevo registro de servicio
            </h2>
            <p class="mt-3 text-[9px] font-bold uppercase leading-relaxed tracking-widest text-slate-400">
              Completa los datos para la recepción de muestras externas.
            </p>
          </div>

          <div class="border-t border-slate-200 pt-6">
            <div class="flex items-center gap-3">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-700">
                Total a pagar
              </p>
            </div>
            <p class="mt-4 text-3xl font-black text-[#1e3a8a]">S/. {{ total.toFixed(2) }}</p>
          </div>
        </aside>

        <div class="flex min-w-0 flex-1 flex-col bg-white">
          <header class="flex min-h-16 items-center justify-between border-b border-slate-100 px-6 sm:px-9">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.25em] text-slate-300">
                Formulario de recepción
              </p>
              <h2 class="mt-1 text-base font-black text-slate-900 md:hidden">
                Nuevo registro de servicio
              </h2>
            </div>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Cerrar"
              @click="emit('close')"
            >
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </header>

          <div class="flex-1 space-y-8 overflow-y-auto px-6 py-7 sm:px-9">
            <div
              v-if="mensajeError"
              class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
            >
              {{ mensajeError }}
            </div>
            <div
              v-if="mensajeExito"
              class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700"
            >
              {{ mensajeExito }}
            </div>

            <section class="space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="section-title">
                  <i class="fa-solid fa-user-tie text-blue-500"></i>
                  Información del cliente
                </h3>
                <button
                  type="button"
                  class="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                  @click="alternarModoCliente"
                >
                  {{ nuevoCliente ? '← Seleccionar cliente existente' : '+ Crear nuevo cliente' }}
                </button>
              </div>

              <div v-if="!nuevoCliente" class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label class="field-group">
                  <span class="field-label">Seleccionar cliente</span>
                  <select
                    v-model="clienteSeleccionadoId"
                    class="field-control"
                    :disabled="cargandoClientes"
                  >
                    <option value="">
                      {{ cargandoClientes ? 'Cargando clientes...' : 'Seleccionar...' }}
                    </option>
                    <option
                      v-for="cliente in clientes"
                      :key="cliente.cliente_id"
                      :value="String(cliente.cliente_id)"
                    >
                      {{ nombreCliente(cliente) }}
                    </option>
                  </select>
                  <span v-if="errorClientes" class="text-[10px] font-semibold text-red-500">
                    {{ errorClientes }}
                  </span>
                  <span
                    v-else-if="!cargandoClientes && clientes.length === 0"
                    class="text-[10px] font-semibold text-slate-400"
                  >
                    No hay clientes activos registrados.
                  </span>
                </label>

                <label class="field-group">
                  <span class="field-label">Número de teléfono</span>
                  <input
                    type="tel"
                    class="field-control cursor-default"
                    :value="clienteSeleccionado?.telefono1 || ''"
                    placeholder="Se completará al seleccionar"
                    readonly
                  />
                </label>
              </div>

              <div v-else class="rounded-lg border border-blue-100 bg-blue-50/30 p-5">
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label class="field-group sm:col-span-2">
                    <span class="field-label">Nombres y apellidos o razón social *</span>
                    <input
                      v-model.trim="nuevoClienteForm.nombre_razon_social"
                      type="text"
                      class="field-control"
                      placeholder="Ej: Agrícola El Sol S.A."
                      maxlength="160"
                    />
                  </label>

                  <label class="field-group">
                    <span class="field-label">Tipo de documento</span>
                    <select
                      v-model="nuevoClienteForm.tipo_documento"
                      class="field-control"
                      @change="nuevoClienteForm.numero_documento = ''"
                    >
                      <option value="">Sin documento</option>
                      <option value="dni">DNI</option>
                      <option value="ruc">RUC</option>
                    </select>
                  </label>

                  <label class="field-group">
                    <span class="field-label">Número de documento</span>
                    <input
                      v-model="nuevoClienteForm.numero_documento"
                      type="text"
                      inputmode="numeric"
                      class="field-control disabled:cursor-not-allowed disabled:opacity-60"
                      :placeholder="placeholderDocumento"
                      :maxlength="nuevoClienteForm.tipo_documento === 'ruc' ? 11 : 8"
                      :disabled="!nuevoClienteForm.tipo_documento"
                      @input="normalizarDocumento"
                    />
                  </label>

                  <label class="field-group">
                    <span class="field-label">Número telefónico *</span>
                    <input
                      v-model.trim="nuevoClienteForm.telefono1"
                      type="tel"
                      inputmode="tel"
                      class="field-control"
                      placeholder="Ej: 987 654 321"
                      maxlength="20"
                    />
                  </label>

                  <label class="field-group">
                    <span class="field-label">Correo electrónico</span>
                    <input
                      v-model.trim="nuevoClienteForm.correo"
                      type="email"
                      class="field-control"
                      placeholder="cliente@empresa.com"
                      maxlength="160"
                    />
                  </label>
                </div>

                <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p class="text-[9px] font-semibold text-slate-400">
                    El DNI o RUC y el correo son opcionales.
                  </p>
                  <button
                    type="button"
                    class="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-[9px] font-black uppercase tracking-widest text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="guardandoCliente"
                    @click="crearNuevoCliente"
                  >
                    <i :class="guardandoCliente ? 'fa-solid fa-spinner animate-spin' : 'fa-solid fa-user-plus'"></i>
                    {{ guardandoCliente ? 'Guardando...' : 'Guardar y seleccionar' }}
                  </button>
                </div>
              </div>
            </section>

            <section class="space-y-5 border-t border-slate-100 pt-7">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="section-title">
                  <i class="fa-solid fa-vials text-emerald-500"></i>
                  Detalle de muestras
                </h3>
                <button
                  type="button"
                  class="rounded-lg bg-emerald-50 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-emerald-600 transition-colors hover:bg-emerald-100"
                  @click="agregarMuestra"
                >
                  <i class="fa-solid fa-plus mr-1"></i>
                  Añadir muestra
                </button>
              </div>

              <div class="space-y-4">
                <article
                  v-for="(muestra, index) in muestras"
                  :key="muestra.id"
                  class="rounded-lg border border-slate-200 bg-slate-50/60 p-5"
                >
                  <div class="mb-4 flex items-center justify-between">
                    <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Muestra {{ index + 1 }}
                    </p>
                    <button
                      v-if="muestras.length > 1"
                      type="button"
                      class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Quitar muestra"
                      @click="quitarMuestra(index)"
                    >
                      <i class="fa-solid fa-trash-can text-[10px]"></i>
                    </button>
                  </div>

                  <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <label class="field-group">
                      <span class="field-label">Nombre de la muestra</span>
                      <input
                        v-model="muestra.nombre"
                        type="text"
                        class="field-control bg-white"
                        placeholder="Ej: Cochinilla seca grado A"
                      />
                    </label>

                    <fieldset class="field-group">
                      <legend class="field-label">Ensayos a realizar</legend>
                      <div class="flex flex-wrap gap-2 pt-1">
                        <label
                          v-for="ensayo in ensayosDisponibles"
                          :key="ensayo.valor"
                          class="flex min-h-9 cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 transition-colors hover:border-blue-300"
                        >
                          <input
                            v-model="muestra.ensayos"
                            type="checkbox"
                            :value="ensayo.valor"
                            class="h-4 w-4 rounded border-slate-300 text-blue-600"
                          />
                          <span class="ml-2 text-[9px] font-black uppercase text-slate-700">
                            {{ ensayo.etiqueta }}
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <label class="field-group sm:col-span-1">
                      <span class="field-label">Lote externo (opcional)</span>
                      <input
                        v-model="muestra.lote_externo"
                        type="text"
                        class="field-control bg-white"
                        placeholder="Código del cliente"
                      />
                    </label>

                    <label class="field-group">
                      <span class="field-label">Cantidad recibida</span>
                      <input
                        v-model="muestra.cantidad_recibida"
                        type="number"
                        min="0"
                        step="0.0001"
                        class="field-control bg-white"
                        placeholder="0.0000"
                      />
                    </label>

                    <label class="field-group">
                      <span class="field-label">Unidad</span>
                      <select v-model="muestra.unidad_medida_id" class="field-control bg-white">
                        <option value="">Seleccionar...</option>
                        <option
                          v-for="unidad in unidadesMasa"
                          :key="unidad.unidades_medida_id"
                          :value="String(unidad.unidades_medida_id)"
                        >
                          {{ unidad.unidad_de_medida }}
                        </option>
                      </select>
                    </label>
                  </div>
                </article>
              </div>
            </section>

            <section class="space-y-4 border-t border-slate-100 pt-7">
              <h3 class="section-title">Observaciones</h3>
              <textarea
                v-model="observaciones"
                rows="3"
                class="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                placeholder="Detalles adicionales sobre el estado de las muestras..."
              ></textarea>
            </section>
          </div>

          <footer
            class="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-9 lg:flex-row lg:items-center lg:justify-between"
          >
            <button type="button" class="secondary-action">
              <i class="fa-solid fa-file-pdf text-red-500"></i>
              Descargar recibo PDF
            </button>

            <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button type="button" class="text-action">Guardar borrador</button>
              <button
                type="button"
                class="primary-action disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="enviando || registroCreado"
                @click="enviarRecepcion"
              >
                <i class="fa-solid fa-paper-plane"></i>
                {{ registroCreado ? 'Servicio registrado' : 'Enviar a laboratorio' }}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import axios from 'axios'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'created'])
const nuevoCliente = ref(false)
const guardandoCliente = ref(false)
const clientes = ref([])
const clienteSeleccionadoId = ref('')
const cargandoClientes = ref(false)
const errorClientes = ref('')
const unidadesMasa = ref([])
const observaciones = ref('')
const enviando = ref(false)
const registroCreado = ref(false)
const mensajeError = ref('')
const mensajeExito = ref('')
let siguienteMuestraId = 2

const crearNuevoClienteVacio = () => ({
  nombre_razon_social: '',
  tipo_documento: '',
  numero_documento: '',
  telefono1: '',
  correo: '',
})

const nuevoClienteForm = reactive(crearNuevoClienteVacio())

const ensayosDisponibles = [
  { valor: 'acido_carminico', etiqueta: 'Ác. carmínico' },
  { valor: 'humedad', etiqueta: 'Humedad' },
  { valor: 'color_cielab', etiqueta: 'Color CIELAB' },
]

const crearMuestraVacia = (id) => ({
  id,
  nombre: '',
  lote_externo: '',
  cantidad_recibida: '',
  unidad_medida_id: '',
  ensayos: [],
})

const muestras = ref([crearMuestraVacia(1)])

const clienteSeleccionado = computed(() =>
  clientes.value.find(
    (cliente) => String(cliente.cliente_id) === clienteSeleccionadoId.value,
  ),
)

const placeholderDocumento = computed(() => {
  if (nuevoClienteForm.tipo_documento === 'dni') return '8 dígitos'
  if (nuevoClienteForm.tipo_documento === 'ruc') return '11 dígitos'
  return 'Selecciona un tipo'
})

const total = computed(
  () => muestras.value.reduce((suma, muestra) => suma + muestra.ensayos.length, 0) * 50,
)

const agregarMuestra = () => {
  muestras.value.push(crearMuestraVacia(siguienteMuestraId++))
}

const quitarMuestra = (index) => {
  muestras.value.splice(index, 1)
}

const limpiarNuevoCliente = () => {
  Object.assign(nuevoClienteForm, crearNuevoClienteVacio())
}

const alternarModoCliente = () => {
  nuevoCliente.value = !nuevoCliente.value
  mensajeError.value = ''
  if (!nuevoCliente.value) limpiarNuevoCliente()
}

const normalizarDocumento = (event) => {
  const longitud = nuevoClienteForm.tipo_documento === 'ruc' ? 11 : 8
  nuevoClienteForm.numero_documento = event.target.value.replace(/\D/g, '').slice(0, longitud)
}

const nombreCliente = (cliente) =>
  cliente.nombre_razon_social || cliente.ruc || cliente.dni || `Cliente #${cliente.cliente_id}`

const crearNuevoCliente = async () => {
  mensajeError.value = ''
  mensajeExito.value = ''

  if (!nuevoClienteForm.nombre_razon_social.trim()) {
    mensajeError.value = 'Ingresa los nombres y apellidos o la razón social.'
    return
  }

  if (!nuevoClienteForm.telefono1.trim()) {
    mensajeError.value = 'Ingresa el número telefónico.'
    return
  }

  const tipoDocumento = nuevoClienteForm.tipo_documento
  const numeroDocumento = nuevoClienteForm.numero_documento
  if (tipoDocumento === 'dni' && !/^\d{8}$/.test(numeroDocumento)) {
    mensajeError.value = 'El DNI debe tener exactamente 8 dígitos.'
    return
  }
  if (tipoDocumento === 'ruc' && !/^\d{11}$/.test(numeroDocumento)) {
    mensajeError.value = 'El RUC debe tener exactamente 11 dígitos.'
    return
  }
  if (nuevoClienteForm.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoClienteForm.correo)) {
    mensajeError.value = 'Ingresa un correo electrónico válido.'
    return
  }

  guardandoCliente.value = true

  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.post(
      `${baseUrl}/laboratorio/clientes`,
      {
        nombre_razon_social: nuevoClienteForm.nombre_razon_social.trim(),
        ruc: tipoDocumento === 'ruc' ? numeroDocumento : null,
        dni: tipoDocumento === 'dni' ? numeroDocumento : null,
        telefono1: nuevoClienteForm.telefono1.trim(),
        correo: nuevoClienteForm.correo.trim() || null,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    )

    clientes.value.push(data)
    clientes.value.sort((a, b) => nombreCliente(a).localeCompare(nombreCliente(b), 'es'))
    clienteSeleccionadoId.value = String(data.cliente_id)
    nuevoCliente.value = false
    limpiarNuevoCliente()
    mensajeExito.value = `Cliente ${nombreCliente(data)} creado y seleccionado.`
  } catch (error) {
    console.error('No se pudo crear el cliente:', error)
    mensajeError.value = error.response?.data?.error || 'No fue posible crear el cliente.'
  } finally {
    guardandoCliente.value = false
  }
}

const cargarClientes = async () => {
  cargandoClientes.value = true
  errorClientes.value = ''

  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${baseUrl}/laboratorio/clientes`, {
      params: { activo: true },
    })
    clientes.value = Array.isArray(data) ? data : []

    if (
      clienteSeleccionadoId.value &&
      !clientes.value.some(
        (cliente) => String(cliente.cliente_id) === clienteSeleccionadoId.value,
      )
    ) {
      clienteSeleccionadoId.value = ''
    }
  } catch (error) {
    console.error('No se pudieron cargar los clientes:', error)
    clientes.value = []
    errorClientes.value = 'No fue posible cargar los clientes.'
  } finally {
    cargandoClientes.value = false
  }
}

const cargarUnidadesMasa = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.get(`${baseUrl}/unidades-medida/propiedad/masa`)
    unidadesMasa.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('No se pudieron cargar las unidades de masa:', error)
    unidadesMasa.value = []
  }
}

const validarFormulario = () => {
  if (nuevoCliente.value) {
    return 'Guarda el nuevo cliente antes de enviar la recepción.'
  }

  if (!clienteSeleccionadoId.value) {
    return 'Selecciona un cliente.'
  }

  for (let index = 0; index < muestras.value.length; index += 1) {
    const muestra = muestras.value[index]
    const numero = index + 1

    if (!muestra.nombre.trim()) return `Ingresa el nombre de la muestra ${numero}.`
    if (!(Number(muestra.cantidad_recibida) > 0)) {
      return `Ingresa una cantidad válida para la muestra ${numero}.`
    }
    if (!muestra.unidad_medida_id) return `Selecciona la unidad de la muestra ${numero}.`
    if (muestra.ensayos.length === 0) {
      return `Selecciona al menos un ensayo para la muestra ${numero}.`
    }
  }

  return ''
}

const enviarRecepcion = async () => {
  mensajeError.value = validarFormulario()
  mensajeExito.value = ''
  if (mensajeError.value) return

  enviando.value = true

  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const { data } = await axios.post(`${baseUrl}/laboratorio/servicios-analisis`, {
      cliente_id: Number(clienteSeleccionadoId.value),
      observaciones: observaciones.value.trim() || null,
      muestras: muestras.value.map((muestra) => ({
        nombre_muestra: muestra.nombre.trim(),
        lote_externo: muestra.lote_externo.trim() || null,
        cantidad_recibida: Number(muestra.cantidad_recibida),
        unidad_medida_id: Number(muestra.unidad_medida_id),
        ensayos: muestra.ensayos,
      })),
    })

    registroCreado.value = true
    mensajeExito.value = `Servicio ${data.codigo_recibo} registrado con ${data.muestras.length} muestra(s).`
    emit('created', data)
  } catch (error) {
    console.error('No se pudo registrar el servicio:', error)
    mensajeError.value = error.response?.data?.error || 'No fue posible registrar el servicio.'
  } finally {
    enviando.value = false
  }
}

const cerrarConEscape = (event) => {
  if (event.key === 'Escape' && props.show) emit('close')
}

watch(
  () => props.show,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : ''
    if (visible) {
      window.addEventListener('keydown', cerrarConEscape)
      if (registroCreado.value) {
        nuevoCliente.value = false
        limpiarNuevoCliente()
        clienteSeleccionadoId.value = ''
        observaciones.value = ''
        siguienteMuestraId = 2
        muestras.value = [crearMuestraVacia(1)]
        registroCreado.value = false
      }
      mensajeError.value = ''
      mensajeExito.value = ''
      Promise.all([cargarClientes(), cargarUnidadesMasa()])
    } else {
      window.removeEventListener('keydown', cerrarConEscape)
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', cerrarConEscape)
})
</script>

<style scoped>
.section-title {
  @apply flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-800;
}

.field-group {
  @apply flex min-w-0 flex-col gap-2;
}

.field-label {
  @apply text-[9px] font-black uppercase tracking-widest text-slate-400;
}

.field-control {
  @apply h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-700 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50;
}

.secondary-action {
  @apply inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-[9px] font-black uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-100;
}

.text-action {
  @apply min-h-11 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600;
}

.primary-action {
  @apply inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-6 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-800;
}
</style>
