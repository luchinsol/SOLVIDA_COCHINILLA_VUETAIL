<template>
  <section id="planning-panel" class="w-[30%] flex flex-col gap-4">
    <div
      class="bg-surface rounded-2xl shadow-soft border border-border p-5 flex flex-col h-full overflow-hidden relative"
    >
      <!-- Warning Banner -->
      <div
        v-if="!isTargetMet"
        class="absolute top-0 left-0 right-0 bg-warning/10 border-b border-warning/30 px-5 py-2 flex items-center gap-2"
      >
        <i class="fa-solid fa-triangle-exclamation text-warning text-sm"></i>
        <span class="text-xs font-medium text-dark">
          Target concentration not met ({{ diffConc }}%)
        </span>
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-5 mt-6">
        <h2 class="text-lg font-bold text-dark">Pre-planning</h2>
        <i class="fa-solid fa-calculator text-muted"></i>
      </div>

      <!-- Target Inputs -->
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="bg-secondary p-3 rounded-xl border border-border">
          <label class="block text-xs font-medium text-muted mb-1"> Target Mass (kg) </label>
          <input
            v-model.number="targetMass"
            type="number"
            class="w-full bg-transparent text-lg font-bold text-dark outline-none"
          />
        </div>

        <div class="bg-secondary p-3 rounded-xl border border-border">
          <label class="block text-xs font-medium text-muted mb-1"> Target Conc. (%) </label>
          <input
            v-model.number="targetConc"
            type="number"
            class="w-full bg-transparent text-lg font-bold text-dark outline-none"
          />
        </div>
      </div>

      <!-- Button -->
      <button
        @click="calculateMix"
        class="w-full bg-dark hover:bg-opacity-90 text-white font-medium py-2.5 rounded-lg transition-all text-sm mb-6"
      >
        Calculate Mix
      </button>

      <!-- Mix -->
      <div class="flex-1 overflow-y-auto mb-4">
        <h3 class="text-xs font-bold text-muted uppercase tracking-wider mb-3">Suggested Mix</h3>

        <div class="space-y-3">
          <div
            v-for="item in mix"
            :key="item.id"
            class="p-3 border border-border rounded-xl hover:border-primary/50 transition-colors"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-dark">
                {{ item.code }}
              </span>
              <span class="text-xs font-medium text-muted"> {{ item.conc }}% CA </span>
            </div>

            <div class="flex items-center gap-3">
              <!-- Slider -->
              <input
                type="range"
                min="0"
                :max="targetMass"
                v-model.number="item.mass"
                class="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <!-- Input -->
              <div class="w-20 text-right">
                <input
                  type="number"
                  v-model.number="item.mass"
                  class="w-full text-sm font-semibold text-dark text-right bg-transparent outline-none border-b border-dashed border-muted focus:border-primary"
                />
                <span class="text-[10px] text-muted block mt-0.5">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-auto pt-4 border-t border-border bg-surface">
        <div class="flex justify-between items-end mb-4">
          <!-- Mass -->
          <div>
            <p class="text-xs text-muted mb-1">Calculated Mass</p>
            <p class="text-lg font-bold text-dark">
              {{ totalMass.toFixed(1) }}
              <span class="text-sm font-normal text-muted">kg</span>
            </p>
          </div>

          <!-- Concentration -->
          <div class="text-right">
            <p class="text-xs text-muted mb-1">Est. Concentration</p>
            <p
              class="text-lg font-bold flex items-center justify-end gap-1"
              :class="isTargetMet ? 'text-primary' : 'text-warning'"
            >
              {{ estimatedConc.toFixed(1) }}%
              <i v-if="!isTargetMet" class="fa-solid fa-arrow-down text-xs"></i>
            </p>
          </div>
        </div>

        <button
          :disabled="!isTargetMet"
          class="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-xl shadow-glow transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Create Prepared Lot
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const targetMass = ref(1000)
const targetConc = ref(18.0)

// Simulación de lotes seleccionados
const mix = ref([
  { id: 1, code: 'PUR-8421', conc: 18.5, mass: 450.5 },
  { id: 2, code: 'PUR-8550', conc: 16.2, mass: 549.5 },
])

// Total masa
const totalMass = computed(() => mix.value.reduce((sum, item) => sum + item.mass, 0))

// Concentración estimada (promedio ponderado)
const estimatedConc = computed(() => {
  if (totalMass.value === 0) return 0

  return mix.value.reduce((sum, item) => sum + item.mass * item.conc, 0) / totalMass.value
})

// Validación
const isTargetMet = computed(() => estimatedConc.value >= targetConc.value)

// Diferencia
const diffConc = computed(() => (estimatedConc.value - targetConc.value).toFixed(1))

// Acción (mock)
const calculateMix = () => {
  console.log('Calculando mezcla...')
}
</script>
