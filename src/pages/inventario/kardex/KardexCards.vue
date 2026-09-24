<script setup>
import axios from 'axios'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  categoria: {
    type: String,
    required: true,
  },
  almacenId: {
    type: String,
    default: 'todos',
  },
  refreshKey: {
    type: Number,
    default: 0,
  },
  tipoInsumoId: {
    type: [String, Number],
    default: '',
  },
  tipoLote: {
    type: String,
    default: '',
  },
})

const cards = ref([])

const getInfoCards = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/stock-almacenes/resumen`, {
      params: {
        categoria: props.categoria,
        almacen_id: props.almacenId === 'todos' ? undefined : props.almacenId,
        tipo_insumo_id: props.categoria === 'insumos' ? props.tipoInsumoId || undefined : undefined,
        tipo_lote: props.categoria === 'cochinilla' ? props.tipoLote || undefined : undefined,
      },
    })
    const data = response.data

    cards.value = [
      {
        titulo: 'Valor total estimado',
        valor: data.costo_total ?? '-',
        unidad: data.unidad_medida_moneda,
        descripcion: 'Valor total del stock',
        accent: 'border-l-red-600',
      },
      {
        titulo: 'Stock en planta',
        valor: data.stock_actual ?? '-',
        unidad: data.unidad_medida_cantidad,
        descripcion: 'Cantidad total disponible',
        accent: 'border-l-primary',
      },
      {
        titulo: 'Costo unitario promedio',
        valor: data.costo_unitario == null ? '-' : Number(data.costo_unitario).toFixed(2),
        unidad: data.unidad_medida_moneda,
        descripcion: 'Costo promedio por unidad',
        accent: 'border-l-emerald-500',
      },
    ]
  } catch (error) {
    console.error('Error fetching card info:', error)
  }
}

watch(
  () => [props.categoria, props.almacenId, props.tipoInsumoId, props.tipoLote, props.refreshKey],
  () => getInfoCards(),
  { immediate: true },
)

const visibleCards = computed(() => {
  if (props.categoria === 'insumos' && !props.tipoInsumoId) {
    return cards.value.slice(0, 1)
  }

  return cards.value
})

const formatValue = (value) => {
  if (value === '-') return value

  return new Intl.NumberFormat('es-PE', {
    maximumFractionDigits: 4,
  }).format(Number(value))
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="card in visibleCards"
      :key="card.titulo"
      class="bg-white border border-slate-100 border-l-[8px] rounded-lg p-6 shadow-lg shadow-slate-200/40 transition-shadow hover:shadow-xl"
      :class="card.accent"
    >
      <p class="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">
        {{ card.titulo }}
      </p>
      <div class="flex items-baseline gap-2 min-w-0">
        <span class="text-3xl font-black text-slate-900 tracking-normal break-all">
          {{ formatValue(card.valor) }}
        </span>
        <span v-if="card.unidad" class="text-[10px] font-black text-slate-400 uppercase">
          {{ card.unidad }}
        </span>
      </div>
      <p class="mt-3 text-xs text-slate-400">{{ card.descripcion }}</p>
    </div>
  </div>
</template>
