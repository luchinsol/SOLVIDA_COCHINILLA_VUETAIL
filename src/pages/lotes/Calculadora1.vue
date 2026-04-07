<template>
  <section id="filter-panel" class="w-[20%] flex flex-col gap-4">
    <div class="bg-surface rounded-2xl shadow-soft border border-border p-5 flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-base font-semibold text-dark">Batch Filters</h2>
        <button class="text-xs text-primary font-medium hover:underline" @click="resetFilters">
          Reset
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-5 overflow-y-auto flex-1 pr-2">
        <!-- Lot Code -->
        <div>
          <label class="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
            Lot Code
          </label>
          <input
            v-model="filters.lotCode"
            type="text"
            placeholder="e.g. L-2024-001"
            class="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <!-- Lot Type -->
        <div>
          <label class="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
            Lot Type
          </label>

          <div class="space-y-2">
            <!-- Purchased -->
            <label class="flex items-center cursor-pointer group">
              <div class="relative flex items-center justify-center w-4 h-4 mr-2">
                <input
                  type="checkbox"
                  v-model="filters.types"
                  value="purchased"
                  class="opacity-0 absolute w-full h-full cursor-pointer z-10"
                />
                <div
                  class="w-4 h-4 border border-muted rounded bg-surface transition-colors flex items-center justify-center"
                  :class="{ 'bg-primary border-primary': filters.types.includes('purchased') }"
                >
                  <svg
                    v-if="filters.types.includes('purchased')"
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
              <span class="text-sm text-dark group-hover:text-primary transition-colors">
                Purchased
              </span>
            </label>

            <!-- Prepared -->
            <label class="flex items-center cursor-pointer group">
              <div class="relative flex items-center justify-center w-4 h-4 mr-2">
                <input
                  type="checkbox"
                  v-model="filters.types"
                  value="prepared"
                  class="opacity-0 absolute w-full h-full cursor-pointer z-10"
                />
                <div
                  class="w-4 h-4 border border-muted rounded bg-surface transition-colors flex items-center justify-center"
                  :class="{ 'bg-primary border-primary': filters.types.includes('prepared') }"
                >
                  <svg
                    v-if="filters.types.includes('prepared')"
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
              <span class="text-sm text-dark group-hover:text-primary transition-colors">
                Prepared
              </span>
            </label>
          </div>
        </div>

        <!-- Carminic Acid -->
        <div>
          <label class="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
            Carminic Acid (%)
          </label>

          <div class="flex items-center gap-2">
            <input
              v-model="filters.minAcid"
              type="number"
              placeholder="Min"
              class="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <span class="text-muted">-</span>
            <input
              v-model="filters.maxAcid"
              type="number"
              placeholder="Max"
              class="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <!-- Mass -->
        <div>
          <label class="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
            Available Mass (kg)
          </label>

          <div class="flex items-center gap-2">
            <input
              v-model="filters.minMass"
              type="number"
              placeholder="Min"
              class="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <span class="text-muted">-</span>
            <input
              v-model="filters.maxMass"
              type="number"
              placeholder="Max"
              class="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="pt-4 mt-auto border-t border-border">
        <button
          @click="applyFilters"
          class="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-2.5 rounded-lg shadow-glow transition-all text-sm flex items-center justify-center"
        >
          <i class="fa-solid fa-filter mr-2"></i>
          Apply Filters
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const filters = reactive({
  lotCode: '',
  types: ['purchased', 'prepared'],
  minAcid: '',
  maxAcid: '',
  minMass: '',
  maxMass: '',
})

const resetFilters = () => {
  filters.lotCode = ''
  filters.types = ['purchased', 'prepared']
  filters.minAcid = ''
  filters.maxAcid = ''
  filters.minMass = ''
  filters.maxMass = ''
}

const applyFilters = () => {
  console.log('Filters applied:', { ...filters })
}
</script>
