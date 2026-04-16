<template>
  <div v-if="modelValue" class="border p-4 rounded bg-gray-50 mt-3">
    <h4 class="font-bold mb-3">Nuevo Proveedor</h4>

    <input v-model="form.nombre" class="input mb-2" placeholder="Nombre proveedor" />
    <input v-model="form.ruc" class="input mb-2" placeholder="RUC" />

    <div class="flex justify-end gap-2">
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
  ruc: '',
})

const guardar = () => {
  console.log(form.value)
  emit('update:modelValue', false)
}
</script>
