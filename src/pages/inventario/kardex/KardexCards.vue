<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const cards = ref([])

const getInfoCards = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/lotes-cochinilla/resumen`)
    const data = response.data

    cards.value = [
      {
        titulo: 'Stock Actual',
        valor: data.stock_actual,
        unidad: data.unidad_medida_cantidad,
        descripcion: 'Cantidad total disponible',
        icono: 'fa-boxes-stacked',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        badge: 'bg-blue-100 text-blue-700',
      },

      {
        titulo: 'Costo Total',
        valor: data.costo_total,
        unidad: data.unidad_medida_moneda,
        descripcion: 'Valor total del stock',
        icono: 'fa-sack-dollar',
        iconColor: 'text-green-600',
        iconBg: 'bg-green-100',
        badge: 'bg-green-100 text-green-700',
      },

      {
        titulo: 'Costo Unitario',
        valor: Number(data.costo_unitario).toFixed(2),
        unidad: data.unidad_medida_moneda,
        descripcion: 'Costo promedio por unidad',
        icono: 'fa-coins',
        iconColor: 'text-yellow-600',
        iconBg: 'bg-yellow-100',
        badge: 'bg-yellow-100 text-yellow-700',
      },
    ]
  } catch (error) {
    console.error('Error fetching card info:', error)
  }
}

onMounted(() => {
  getInfoCards()
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
    >
      <div class="flex items-start justify-between">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="card.iconBg">
            <i class="fa-solid text-lg" :class="[card.icono, card.iconColor]"></i>
          </div>

          <div>
            <p class="text-sm text-gray-500 font-medium">
              {{ card.titulo }}
            </p>

            <h2 class="text-3xl font-bold text-gray-900 mt-1">
              {{ card.valor }}

              <span v-if="card.unidad" class="text-base text-gray-400 font-medium">
                {{ card.unidad }}
              </span>
            </h2>
          </div>
        </div>

        <button class="text-gray-400 hover:text-gray-700">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div class="mt-4 flex items-center gap-2 flex-wrap">
        <span class="text-xs text-gray-500">
          {{ card.descripcion }}
        </span>
      </div>
    </div>
  </div>
</template>
