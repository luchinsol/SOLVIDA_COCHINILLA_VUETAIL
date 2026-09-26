<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const almacenes = ref([])
const loading = ref(false)
const errorMessage = ref('')
const almacenSeleccionado = ref(null)
const posiciones = ref([])
const loadingPosiciones = ref(false)
const errorPosiciones = ref('')
const currentPage = ref(1)
const perPage = ref(5)
const perPageOptions = [5, 10, 15, 'All']

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.max(1, Math.ceil(posiciones.value.length / perPage.value))
})

const posicionesPaginadas = computed(() => {
  if (perPage.value === 'All') return posiciones.value
  const start = (currentPage.value - 1) * perPage.value
  return posiciones.value.slice(start, start + perPage.value)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value -= 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}

const cargarAlmacenes = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/almacen`)
    const almacenesBase = Array.isArray(response.data) ? response.data : []

    almacenes.value = await Promise.all(
      almacenesBase.map(async (almacen) => {
        try {
          const stockResponse = await axios.get(
            `${baseURL}/stock-almacenes/almacen/${almacen.almacen_id}`,
          )

          return {
            ...almacen,
            posiciones: stockResponse.data?.items?.length ?? 0,
          }
        } catch {
          return { ...almacen, posiciones: 0 }
        }
      }),
    )
  } catch (error) {
    console.error('Error fetching almacenes:', error)
    errorMessage.value = 'No se pudieron cargar los almacenes.'
  } finally {
    loading.value = false
  }
}

const verPosiciones = async (almacen) => {
  almacenSeleccionado.value = almacen
  posiciones.value = []
  currentPage.value = 1
  loadingPosiciones.value = true
  errorPosiciones.value = ''

  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(
      `${baseURL}/stock-almacenes/almacen/${almacen.almacen_id}`,
    )
    posiciones.value = Array.isArray(response.data?.items) ? response.data.items : []
  } catch (error) {
    console.error('Error fetching posiciones del almacén:', error)
    errorPosiciones.value = 'No se pudieron cargar las posiciones del almacén.'
  } finally {
    loadingPosiciones.value = false
  }
}

const volverAAlmacenes = () => {
  almacenSeleccionado.value = null
  posiciones.value = []
  errorPosiciones.value = ''
  currentPage.value = 1
}

onMounted(cargarAlmacenes)
</script>

<template>
  <section>
    <div v-if="!almacenSeleccionado" class="mb-5">
      <h2 class="text-xl font-black text-slate-900 tracking-normal">Almacenes</h2>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        Ubicaciones físicas y posiciones de inventario
      </p>
    </div>

    <div
      v-if="almacenSeleccionado"
      class="mb-5 flex flex-wrap items-center justify-between gap-4"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="volverAAlmacenes"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-red-200 hover:text-red-600"
          title="Volver a almacenes"
          aria-label="Volver a almacenes"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h2 class="text-xl font-black tracking-normal text-slate-900">
            {{ almacenSeleccionado.nombre }}
          </h2>
          <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Posiciones de inventario del almacén
          </p>
        </div>
      </div>

      <span class="rounded-full bg-red-50 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-red-600">
        {{ posiciones.length }} posiciones
      </span>
    </div>

    <div v-if="!almacenSeleccionado && loading" class="py-16 text-center text-sm font-semibold text-slate-400">
      <i class="fa-solid fa-circle-notch fa-spin mr-2"></i>
      Cargando almacenes...
    </div>

    <div
      v-else-if="!almacenSeleccionado && errorMessage"
      class="p-4 border border-red-100 bg-red-50 text-red-700 rounded-lg text-sm"
    >
      {{ errorMessage }}
    </div>

    <div v-else-if="!almacenSeleccionado" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <article
        v-for="almacen in almacenes"
        :key="almacen.almacen_id"
        class="cursor-pointer bg-white rounded-lg border border-slate-100 border-l-[8px] border-l-red-600 p-6 shadow-lg shadow-slate-200/40 transition-all hover:-translate-y-0.5 hover:border-red-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-100"
        role="button"
        tabindex="0"
        @click="verPosiciones(almacen)"
        @keydown.enter.prevent="verPosiciones(almacen)"
        @keydown.space.prevent="verPosiciones(almacen)"
      >
        <div class="flex justify-between items-start gap-4 mb-5">
          <div class="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
            <i class="fa-solid fa-warehouse"></i>
          </div>
          <span
            class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
            :class="
              almacen.activo
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-slate-100 text-slate-400'
            "
          >
            {{ almacen.activo ? 'Activo' : 'Inactivo' }}
          </span>
        </div>

        <h3 class="text-base font-black text-slate-800 mb-2">{{ almacen.nombre }}</h3>
        <p class="text-xs text-slate-400 min-h-10">{{ almacen.tipo_almacen || 'Sin tipo' }}</p>

        <div class="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
          <div>
            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Ubicación</p>
            <p class="text-xs font-bold text-slate-600 mt-1">
              {{ almacen.ubicacion || 'No registrada' }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Posiciones</p>
            <p class="mt-1 flex items-center justify-end gap-2 text-lg font-black text-primary">
              {{ almacen.posiciones }}
              <i class="fa-solid fa-chevron-right text-[10px] text-red-500"></i>
            </p>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xl shadow-slate-200/40">
      <div v-if="loadingPosiciones" class="py-16 text-center text-sm font-semibold text-slate-400">
        <i class="fa-solid fa-circle-notch fa-spin mr-2"></i>
        Cargando posiciones...
      </div>

      <div v-else-if="errorPosiciones" class="m-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        {{ errorPosiciones }}
      </div>

      <template v-else>
        <div class="w-full overflow-x-auto">
          <table class="w-full min-w-[760px]">
            <thead>
              <tr>
                <th>Item inventario ID</th>
                <th>Código</th>
                <th>Lote o posición</th>
                <th>Tipo</th>
                <th class="text-right">Stock actual</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="posicionesPaginadas.length === 0">
                <td colspan="5" class="py-14 text-center text-sm font-semibold text-slate-400">
                  No hay posiciones con stock disponible en este almacén.
                </td>
              </tr>
              <template v-else>
                <tr v-for="posicion in posicionesPaginadas" :key="posicion.item_inventario_id">
                  <td class="font-black text-slate-800">{{ posicion.item_inventario_id }}</td>
                  <td>{{ posicion.codigo_item || '-' }}</td>
                  <td class="font-bold text-slate-700">
                    {{ posicion.nombre_lote || posicion.nombre_item || '-' }}
                  </td>
                  <td>{{ posicion.tipo || '-' }}</td>
                  <td class="text-right">
                    <span class="font-black text-slate-900">{{ posicion.stock_actual }}</span>
                    <span v-if="posicion.unidad_medida_stock" class="ml-1 text-[10px] font-bold uppercase text-slate-400">
                      {{ posicion.unidad_medida_stock }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center gap-2 border-t border-slate-100 p-5 text-[11px] font-semibold text-slate-500">
          <span>Mostrar:</span>
          <select
            v-model="perPage"
            @change="currentPage = 1"
            class="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
          >
            <option v-for="option in perPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <button
            type="button"
            @click="prevPage"
            :disabled="currentPage === 1"
            class="rounded-md border border-slate-200 px-3 py-1.5 text-slate-500 hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            title="Página anterior"
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            type="button"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="rounded-md border border-slate-200 px-3 py-1.5 text-slate-500 hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            title="Página siguiente"
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </template>
    </div>
  </section>
</template>
