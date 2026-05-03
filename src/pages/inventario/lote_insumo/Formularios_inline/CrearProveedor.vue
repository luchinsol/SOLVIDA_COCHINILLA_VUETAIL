<template>
  <div v-if="modelValue" class="border p-4 rounded bg-gray-50 mt-3">
    <h4 class="font-bold mb-3">Nuevo Proveedor</h4>

    <div class="grid grid-cols-2 gap-4">
      <!-- NOMBRE O RAZÓN SOCIAL  -->
      <input
        v-model="formProveedor.nombre_razon_social"
        class="input border rounded px-2 py-1"
        placeholder="Nombre o Razón Social"
      />

      <!-- ACTIVO -->
      <select v-model="formProveedor.activo" class="input border rounded px-2 py-1">
        <option disabled value="">¿Activo?</option>
        <option :value="false">No</option>
        <option :value="true">Sí</option>
      </select>

      <!-- TIPO DE PROVEEDOR -->
      <input
        v-model="formProveedor.tipo_proveedor"
        class="input border rounded px-2 py-1"
        placeholder="Tipo de proveedor (ej: Insumo, Carmin, Extracto)"
      />

      <!-- TELÉFONO -->
      <input
        v-model="formProveedor.telefono"
        class="input border rounded px-2 py-1"
        placeholder="Teléfono"
      />

      <!-- CORREO -->
      <input
        v-model="formProveedor.correo"
        class="input border rounded px-2 py-1"
        placeholder="Correo electrónico"
      />

      <!-- DIRECCIÓN -->
      <input
        v-model="formProveedor.direccion"
        class="input border rounded px-2 py-1"
        placeholder="Dirección"
      />

      <!-- RUC -->
      <input
        v-model="formProveedor.ruc"
        type="number"
        class="input border rounded px-2 py-1"
        placeholder="RUC"
      />
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <button @click="$emit('update:modelValue', false)" class="px-3 py-1 border rounded">
        Cancelar
      </button>

      <button @click="crearProveedor" class="px-3 py-1 bg-green-700 text-white rounded">
        Guardar
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

const formProveedor = ref({
  nombre_razon_social: '',
  tipo_proveedor: '',
  telefono: '',
  correo: '',
  direccion: '',
  activo: false,
  ruc: null,
})

const crearProveedor = async () => {
  console.log(formProveedor.value)

  const baseURL = import.meta.env.VITE_API_URL
  const payload = {
    ...formProveedor.value,
    ruc: formProveedor.value.ruc ? Number(formProveedor.value.ruc) : null,
  }
  await axios.post(`${baseURL}/proveedores`, payload)

  emit('created')
  emit('update:modelValue', false)
}
</script>
