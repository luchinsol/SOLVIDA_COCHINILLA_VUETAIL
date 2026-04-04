<!-- components/KpiCard.vue -->
<template>
  <div
    class="bg-surface rounded-xl border border-gray-200 p-2 group hover:border-gray-300 transition-colors"
  >
    <!-- Top -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <div class="w-5 h-5 rounded-lg flex items-center justify-center" :class="iconBg">
          <i :class="['fa-solid', icon]"></i>
        </div>

        <div>
          <p class="text-sm text-textMuted font-medium">{{ title }}</p>

          <h3 class="text-xl font-bold text-textMain mt-1">
            {{ value }}
            <span v-if="suffix" class="text-sm font-normal text-textMuted">
              {{ suffix }}
            </span>
          </h3>
        </div>
      </div>

      <!-- botón -->
      <button v-if="!actionLabel" class="text-textMuted hover:text-textMain">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <button v-else class="text-sm font-medium" :class="textColor">
        {{ actionLabel }}
      </button>
    </div>

    <!-- Progress -->
    <div v-if="progress !== null">
      <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div class="h-1.5 rounded-full" :class="bgColor" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="text-xs text-textMuted mt-2">{{ progressLabel }}</p>
    </div>

    <!-- Trend -->
    <div v-else class="flex items-center gap-2 text-xs">
      <template v-if="trend">
        <span class="px-2 py-0.5 rounded font-medium flex items-center gap-1" :class="badgeColor">
          <i class="fa-solid fa-arrow-trend-up"></i>
          {{ trend }}
        </span>
        <span class="text-textMuted">{{ trendLabel }}</span>
      </template>

      <template v-else-if="description">
        <span class="text-textMuted">{{ description }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: String,
  suffix: String,
  icon: String,
  color: String,
  trend: String,
  trendLabel: String,
  description: String,
  progress: { type: Number, default: null },
  progressLabel: String,
  actionLabel: String,
})

// ⚠️ Tailwind no detecta clases dinámicas → usamos mapa explícito
const colorMap = {
  success: {
    bg: 'bg-success',
    text: 'text-success',
    soft: 'bg-success/10 text-success',
  },
  warning: {
    bg: 'bg-warning',
    text: 'text-warning',
    soft: 'bg-warning/10 text-warning',
  },
  danger: {
    bg: 'bg-danger',
    text: 'text-danger',
    soft: 'bg-danger/10 text-danger',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    soft: 'bg-secondary/10 text-secondary',
  },
}

const bgColor = computed(() => colorMap[props.color]?.bg || 'bg-secondary')
const textColor = computed(() => colorMap[props.color]?.text || 'text-white')
const iconBg = computed(() => colorMap[props.color]?.soft || 'bg-secondary/10 text-secondary')
const badgeColor = computed(() => colorMap[props.color]?.soft || 'bg-secondary/10 text-secondary')
</script>
