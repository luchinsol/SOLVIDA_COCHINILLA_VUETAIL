<script setup>
const cards = [
  {
    titulo: 'Valor Total Inventario',
    valor: '$1,245,600',
    descripcion: 'vs mes anterior',
    extra: '+ 4.2%',
    icono: 'fa-boxes-stacked',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    badge: 'bg-green-100 text-green-700',
  },
  {
    titulo: 'Stock Disponible',
    valor: '85,230',
    unidad: 'kg',
    descripcion: '75% de capacidad total',
    icono: 'fa-circle-check',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    progress: 75,
  },
  {
    titulo: 'Stock Reservado',
    valor: '12,450',
    unidad: 'kg',
    descripcion: 'Para 15 órdenes de producción activas',
    icono: 'fa-lock',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    titulo: 'Alertas Stock Crítico',
    valor: '8',
    unidad: 'Items',
    descripcion: 'requieren atención inmediata',
    extra: '+2',
    icono: 'fa-triangle-exclamation',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
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

      <!-- PROGRESS -->
      <div v-if="card.progress" class="mt-5">
        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full"
            :style="{ width: `${card.progress}%` }"
          ></div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="mt-4 flex items-center gap-2 flex-wrap">
        <span
          v-if="card.extra"
          class="text-xs font-semibold px-2 py-1 rounded-md"
          :class="card.badge"
        >
          {{ card.extra }}
        </span>

        <span class="text-xs text-gray-500">
          {{ card.descripcion }}
        </span>
      </div>
    </div>
  </div>
</template>
