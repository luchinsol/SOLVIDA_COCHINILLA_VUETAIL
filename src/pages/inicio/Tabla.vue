<template>
  <!-- Recent Batches -->
  <section
    id="recent-batches"
    class="bg-surface rounded-xl shadow-card border border-gray-100 overflow-hidden"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h3 class="text-lg font-semibold text-textMain flex items-center">
        <i class="fa-solid fa-table-list text-textMuted mr-2"></i>
        Recent Production Batches
      </h3>
      <div class="flex space-x-2">
        <button
          @click="onFilter"
          class="p-1.5 text-textMuted hover:text-primary rounded bg-white border border-gray-200 shadow-sm"
        >
          <i class="fa-solid fa-filter text-xs"></i>
        </button>
        <button
          @click="onMenu"
          class="p-1.5 text-textMuted hover:text-primary rounded bg-white border border-gray-200 shadow-sm"
        >
          <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50/30 text-xs uppercase text-textMuted border-b border-gray-200">
            <th class="px-6 py-3 font-semibold">Batch ID</th>
            <th class="px-6 py-3 font-semibold">Status</th>
            <th class="px-6 py-3 font-semibold">Start Time</th>
            <th class="px-6 py-3 font-semibold">Yield (%)</th>
            <th class="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="text-sm divide-y divide-gray-100">
          <tr
            v-for="row in paginated"
            :key="row.id"
            class="hover:bg-gray-50 transition-colors group"
          >
            <td class="px-6 py-4 font-medium text-primary">{{ row.id }}</td>

            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                :class="statusClass(row.status)"
              >
                <i :class="statusIcon(row.status)" class="mr-1"></i>
                {{ row.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-textMuted">{{ row.time }}</td>

            <td
              class="px-6 py-4 font-semibold"
              :class="row.status === 'Desviación' ? 'text-warning' : 'text-textMain'"
            >
              {{ row.yield }}%
            </td>

            <td class="px-6 py-4 text-right">
              <button
                @click="view(row)"
                class="text-textMuted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer / Pagination -->
    <div class="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
      <span class="text-xs text-textMuted">
        Showing {{ start + 1 }}-{{ Math.min(end, total) }} of {{ total }} batches
      </span>

      <div class="flex space-x-1">
        <button
          @click="prev"
          :disabled="page === 1"
          class="px-2 py-1 border border-gray-200 rounded text-xs bg-white"
          :class="
            page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-textMain hover:bg-gray-50'
          "
        >
          Prev
        </button>

        <button
          @click="next"
          :disabled="end >= total"
          class="px-2 py-1 border border-gray-200 rounded text-xs bg-white"
          :class="
            end >= total ? 'text-gray-400 cursor-not-allowed' : 'text-textMain hover:bg-gray-50'
          "
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- DATA (igual al HTML pero ahora dinámico) ---
const rows = ref([
  { id: 'L-2023-087', status: 'Completado', time: 'Oct 24, 06:00 AM', yield: 19.2 },
  { id: 'L-2023-086', status: 'Completado', time: 'Oct 23, 14:30 PM', yield: 18.8 },
  { id: 'L-2023-085', status: 'Desviación', time: 'Oct 23, 08:15 AM', yield: 16.5 },
  { id: 'L-2023-084', status: 'Completado', time: 'Oct 22, 18:00 PM', yield: 19.5 },
  { id: 'L-2023-083', status: 'Completado', time: 'Oct 22, 10:00 AM', yield: 18.1 },
])

// --- PAGINACIÓN ---
const page = ref(1)
const perPage = 5

const total = computed(() => rows.value.length)
const start = computed(() => (page.value - 1) * perPage)
const end = computed(() => page.value * perPage)

const paginated = computed(() => rows.value.slice(start.value, end.value))

const prev = () => {
  if (page.value > 1) page.value--
}

const next = () => {
  if (end.value < total.value) page.value++
}

// --- STATUS STYLES EXACTOS ---
const statusClass = (status) => {
  if (status === 'Completado') return 'bg-green-100 text-green-800 border-green-200'
  if (status === 'Desviación') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return ''
}

const statusIcon = (status) => {
  if (status === 'Completado') return 'fa-solid fa-check-circle'
  if (status === 'Desviación') return 'fa-solid fa-triangle-exclamation'
  return ''
}

// --- ACTIONS ---
const view = (row) => {
  console.log('view batch', row)
}

const onFilter = () => console.log('filter click')
const onMenu = () => console.log('menu click')
</script>

<style scoped>
/* Mantuvimos TODAS las animaciones originales */
</style>
