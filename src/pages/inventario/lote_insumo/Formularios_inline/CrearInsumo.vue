<template>
  <div v-if="modelValue" class="border p-4 rounded bg-gray-50 mt-3">
    <h4 class="font-bold mb-3">Nuevo Tipo de Insumo</h4>

    <div class="grid grid-cols-2 gap-4">
      <!-- NOMBRE -->
      <input
        v-model="formTipoInsumo.nombre"
        class="input border rounded px-2 py-1"
        placeholder="Nombre"
      />
      <!-- CONTROLADO -->
      <select v-model="formTipoInsumo.controlado" class="input border rounded px-2 py-1">
        <option disabled value="">Controlado</option>
        <option :value="false">No</option>
        <option :value="true">Sí</option>
      </select>

      <!-- DESCRIPCIÓN  -->
      <input
        v-model="formTipoInsumo.descripcion"
        class="input border rounded px-2 py-1"
        placeholder="Descripción"
      />

      <!-- VIGENTE -->

      <select v-model="formTipoInsumo.vigente" class="input border rounded px-2 py-1">
        <option disabled value="">Vigente</option>
        <option :value="false">No</option>
        <option :value="true">Sí</option>
      </select>

      <!-- UNIDAD DE MEDIDA -->
      <select v-model="formTipoInsumo.unidad_medida" class="input border rounded px-2 py-1">
        <option disabled value="">Unidad de Medida</option>
        <option value="kg">kg</option>
        <option value="l">l</option>
        <option value="mol">mol</option>
        <option value="vol">vol</option>
      </select>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <button @click="$emit('update:modelValue', false)" class="px-3 py-1 border rounded">
        Cancelar
      </button>

      <button @click="crearTipoInsumo" class="px-3 py-1 bg-green-700 text-white rounded">
        Crear
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
  vigente: '',
  unidad_medida: '',
})

const crearTipoInsumo = async () => {
  console.log(formTipoInsumo.value)
  const baseURL = import.meta.env.VITE_API_URL
  await axios.post(`${baseURL}/tipo-insumo`, formTipoInsumo.value)

  emit('created')
  emit('update:modelValue', false)
}
</script>
