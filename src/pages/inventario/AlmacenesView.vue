<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const almacenes = ref([])
const loading = ref(false)
const errorMessage = ref('')

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

onMounted(cargarAlmacenes)
</script>

<template>
  <section>
    <div class="mb-5">
      <h2 class="text-xl font-black text-slate-900 tracking-normal">Almacenes</h2>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        Ubicaciones físicas y posiciones de inventario
      </p>
    </div>

    <div v-if="loading" class="py-16 text-center text-sm font-semibold text-slate-400">
      <i class="fa-solid fa-circle-notch fa-spin mr-2"></i>
      Cargando almacenes...
    </div>

    <div
      v-else-if="errorMessage"
      class="p-4 border border-red-100 bg-red-50 text-red-700 rounded-lg text-sm"
    >
      {{ errorMessage }}
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <article
        v-for="almacen in almacenes"
        :key="almacen.almacen_id"
        class="bg-white rounded-lg border border-slate-100 border-l-[8px] border-l-red-600 p-6 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-shadow"
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
            <p class="text-lg font-black text-primary mt-1">{{ almacen.posiciones }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
