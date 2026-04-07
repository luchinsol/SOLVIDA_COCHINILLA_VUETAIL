<template>
  <section id="results-panel" class="w-[50%] flex flex-col gap-4">
    <div
      class="bg-surface rounded-2xl shadow-soft border border-border flex flex-col h-full overflow-hidden"
    >
      <!-- Header -->
      <div class="p-5 border-b border-border flex justify-between items-center bg-surface">
        <div>
          <h2 class="text-lg font-bold text-dark">Available Inventory</h2>
          <p class="text-xs text-muted mt-1">Select up to 3 lots for pre-planning</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
            {{ selectedLots.length }} Selected
          </span>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-auto">
        <table class="w-full text-left border-collapse">
          <!-- Header -->
          <thead class="sticky top-0 bg-secondary/80 backdrop-blur-sm z-10 border-b border-border">
            <tr>
              <th class="px-4 py-3 w-12 text-center"></th>
              <th class="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                Lot Code
              </th>
              <th class="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                Type
              </th>
              <th
                class="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-right"
              >
                Mass (kg)
              </th>
              <th
                class="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-right"
              >
                Conc. (%)
              </th>
              <th
                class="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-center"
              >
                Status
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-border">
            <tr
              v-for="lot in lots"
              :key="lot.id"
              @click="toggleSelect(lot)"
              class="transition-colors cursor-pointer group"
              :class="[isSelected(lot) ? 'bg-primary/5' : '', 'hover:bg-secondary/50']"
            >
              <!-- Checkbox -->
              <td class="px-4 py-3 text-center">
                <div class="relative flex items-center justify-center w-4 h-4 mx-auto">
                  <input
                    type="checkbox"
                    :checked="isSelected(lot)"
                    class="opacity-0 absolute w-full h-full cursor-pointer z-10"
                  />
                  <div
                    class="w-4 h-4 border rounded flex items-center justify-center transition-colors"
                    :class="
                      isSelected(lot) ? 'bg-primary border-primary' : 'bg-surface border-muted'
                    "
                  >
                    <svg
                      v-if="isSelected(lot)"
                      class="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </td>

              <!-- Lot Code -->
              <td class="px-4 py-3">
                <span class="text-sm font-semibold text-dark">
                  {{ lot.code }}
                </span>
                <div class="text-xs text-muted mt-0.5">
                  {{ lot.date }}
                </div>
              </td>

              <!-- Type -->
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
                  :class="
                    lot.type === 'Purchased'
                      ? 'bg-info/10 text-info border-info/20'
                      : 'bg-primary/10 text-primary border-primary/20'
                  "
                >
                  {{ lot.type }}
                </span>
              </td>

              <!-- Mass -->
              <td class="px-4 py-3 text-right text-sm font-medium text-dark">
                {{ lot.mass }}
              </td>

              <!-- Concentration -->
              <td class="px-4 py-3 text-right text-sm font-medium text-dark">{{ lot.conc }}%</td>

              <!-- Status -->
              <td class="px-4 py-3 text-center">
                <span class="w-2 h-2 rounded-full bg-accent inline-block"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div
        class="p-3 border-t border-border bg-surface flex items-center justify-between text-xs text-muted"
      >
        <span>Showing 1-3 of 45 lots</span>

        <div class="flex gap-1">
          <button class="px-2 py-1 rounded hover:bg-secondary disabled:opacity-50">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="px-2 py-1 rounded hover:bg-secondary disabled:opacity-50">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const lots = ref([
  {
    id: 1,
    code: 'PUR-8421',
    date: 'Oct 12, 2023',
    type: 'Purchased',
    mass: 450.5,
    conc: 18.5,
  },
  {
    id: 2,
    code: 'PREP-9920',
    date: 'Nov 05, 2023',
    type: 'Prepared',
    mass: 120.0,
    conc: 22.1,
  },
  {
    id: 3,
    code: 'PUR-8550',
    date: 'Nov 18, 2023',
    type: 'Purchased',
    mass: 850.0,
    conc: 16.2,
  },
])

const selectedLots = ref([1, 3]) // simulando seleccionados

const isSelected = (lot) => {
  return selectedLots.value.includes(lot.id)
}

const toggleSelect = (lot) => {
  const index = selectedLots.value.indexOf(lot.id)

  if (index > -1) {
    selectedLots.value.splice(index, 1)
  } else {
    if (selectedLots.value.length >= 3) return // límite
    selectedLots.value.push(lot.id)
  }
}
</script>
