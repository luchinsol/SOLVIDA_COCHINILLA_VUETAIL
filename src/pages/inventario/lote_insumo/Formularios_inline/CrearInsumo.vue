<template>
  <div v-if="modelValue" class="border p-4 rounded bg-gray-50 mt-3">
    <h4 class="font-bold mb-3">Nuevo Tipo de Insumo</h4>

    <div class="grid grid-cols-2 gap-4">
      <input v-model="form.nombre" class="input border rounded px-2 py-1" placeholder="Nombre" />

      <select v-model="form.controlado" class="input border rounded px-2 py-1">
        <option disabled value="">Controlado</option>
        <option :value="false">No</option>
        <option :value="true">Sí</option>
      </select>
      <input
        v-model="form.descripcion"
        class="input border rounded px-2 py-1"
        placeholder="Descripción"
      />

      <select v-model="form.vigente" class="input border rounded px-2 py-1">
        <option disabled value="">Vigente</option>
        <option :value="false">No</option>
        <option :value="true">Sí</option>
      </select>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <button @click="$emit('update:modelValue', false)" class="px-3 py-1 border rounded">
        Cancelar
      </button>

      <button @click="guardar" class="px-3 py-1 bg-green-700 text-white rounded">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const form = ref({
  nombre: '',
  controlado: '',
  descripcion: '',
  vigente: '',
})

const guardar = () => {
  console.log(form.value)
  emit('update:modelValue', false)
}
</script>
