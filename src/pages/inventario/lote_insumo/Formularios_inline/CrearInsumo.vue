<template>
  <div
    v-if="modelValue"
    class="space-y-4 rounded-lg border-2 border-dashed border-blue-100 bg-blue-50/50 p-5 sm:p-6"
  >
    <div class="flex items-center justify-between gap-3">
      <h4 class="text-[11px] font-black uppercase text-blue-800">
        Nuevo tipo de insumo
      </h4>
      <span class="text-[9px] font-bold uppercase tracking-widest text-blue-400">
        Paso rápido
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        v-model="formTipoInsumo.nombre"
        class="quick-field"
        placeholder="Nombre del tipo"
      />

      <select v-model="formTipoInsumo.controlado" class="quick-field cursor-pointer">
        <option disabled value="">¿Es insumo IQBF?</option>
        <option :value="true">Sí</option>
        <option :value="false">No</option>
      </select>

      <input
        v-model="formTipoInsumo.descripcion"
        class="quick-field sm:col-span-2"
        placeholder="Descripción breve"
      />

    </div>

    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        @click="$emit('update:modelValue', false)"
        class="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-700"
      >
        Cancelar
      </button>

      <button
        type="button"
        @click="crearTipoInsumo"
        class="rounded-lg bg-blue-600 px-5 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-700"
      >
        Registrar tipo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'created'])

const formTipoInsumo = ref({
  nombre: '',
  controlado: '',
  descripcion: '',
})

const crearTipoInsumo = async () => {
  console.log(formTipoInsumo.value)
  const baseURL = import.meta.env.VITE_API_URL
  await axios.post(`${baseURL}/tipo-insumo`, formTipoInsumo.value)

  emit('created')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.quick-field {
  @apply w-full rounded-lg border border-blue-100 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 outline-none transition-all placeholder:font-medium placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200;
}
</style>
