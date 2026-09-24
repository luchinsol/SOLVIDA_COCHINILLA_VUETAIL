<!-- components/HeaderSection.vue -->
<template>
  <div class="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-slate-200">
    <div>
      <h1 class="text-xl font-black text-slate-900 tracking-normal">{{ title }}</h1>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        Gestión de existencias
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center bg-slate-100 p-1 rounded-lg" aria-label="Vista de inventario">
        <button
          type="button"
          class="view-option"
          :class="view === 'lotes' ? 'view-option-active' : 'view-option-inactive'"
          @click="emit('update:view', 'lotes')"
        >
          Lotes
        </button>
        <button
          type="button"
          class="view-option"
          :class="view === 'almacenes' ? 'view-option-active' : 'view-option-inactive'"
          @click="emit('update:view', 'almacenes')"
        >
          Almacenes
        </button>
      </div>

      <button
        class="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 transition-colors"
      >
        Descargar informe general
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  view: {
    type: String,
    default: 'lotes',
  },
})

const emit = defineEmits(['update:view'])
</script>

<style scoped>
.view-option {
  @apply px-5 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-colors;
}

.view-option-active {
  @apply bg-white text-slate-900 shadow-sm;
}

.view-option-inactive {
  @apply text-slate-400 hover:text-slate-600;
}
</style>
