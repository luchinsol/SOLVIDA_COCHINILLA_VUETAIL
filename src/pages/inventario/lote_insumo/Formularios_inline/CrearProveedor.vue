<template>
  <div
    v-if="modelValue"
    class="space-y-4 rounded-lg border-2 border-dashed border-red-100 bg-red-50/50 p-5 sm:p-6"
  >
    <div class="flex items-center justify-between gap-3">
      <h4 class="text-[11px] font-black uppercase text-red-800">
        Nuevo proveedor
      </h4>
      <span class="text-[9px] font-bold uppercase tracking-widest text-red-400">
        Paso rápido
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        v-model="formProveedor.nombre_razon_social"
        class="provider-field"
        placeholder="Nombre o Razón Social"
      />

      <input
        v-model="formProveedor.ruc"
        type="text"
        inputmode="numeric"
        maxlength="11"
        pattern="[0-9]{11}"
        class="provider-field"
        placeholder="RUC (11 dígitos, opcional)"
      />

      <input
        v-model="formProveedor.telefono"
        type="tel"
        inputmode="numeric"
        maxlength="9"
        pattern="[0-9]{9}"
        class="provider-field"
        placeholder="Teléfono (9 dígitos, opcional)"
      />

      <input
        v-model="formProveedor.correo"
        type="email"
        class="provider-field"
        placeholder="Correo electrónico (opcional)"
      />

      <input
        v-model="formProveedor.direccion"
        class="provider-field sm:col-span-2"
        placeholder="Dirección (opcional)"
      />
    </div>

    <p v-if="validationError" class="text-xs font-bold text-red-600">
      {{ validationError }}
    </p>

    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        @click="$emit('update:modelValue', false)"
        class="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-red-400 transition-colors hover:text-red-700"
      >
        Cancelar
      </button>

      <button
        type="button"
        @click="crearProveedor"
        class="rounded-lg bg-red-600 px-5 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-100 transition-colors hover:bg-red-700"
      >
        Registrar proveedor
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
  telefono: '',
  correo: '',
  direccion: '',
  ruc: '',
})

const validationError = ref('')

const crearProveedor = async () => {
  validationError.value = ''

  const telefono = formProveedor.value.telefono.trim()
  const correo = formProveedor.value.correo.trim()
  const direccion = formProveedor.value.direccion.trim()
  const ruc = formProveedor.value.ruc.trim()

  if (telefono && !/^\d{9}$/.test(telefono)) {
    validationError.value = 'El teléfono debe tener exactamente 9 dígitos'
    return
  }

  if (ruc && !/^\d{11}$/.test(ruc)) {
    validationError.value = 'El RUC debe tener exactamente 11 dígitos'
    return
  }

  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    validationError.value = 'Ingrese un correo electrónico válido'
    return
  }

  const baseURL = import.meta.env.VITE_API_URL
  const payload = {
    nombre_razon_social: formProveedor.value.nombre_razon_social.trim(),
    telefono: telefono || null,
    correo: correo || null,
    direccion: direccion || null,
    ruc: ruc || null,
  }

  try {
    await axios.post(`${baseURL}/proveedores`, payload)
    emit('created')
    emit('update:modelValue', false)
  } catch (error) {
    validationError.value = error.response?.data?.message || 'No se pudo crear el proveedor'
  }
}
</script>

<style scoped>
.provider-field {
  @apply w-full rounded-lg border border-red-100 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 outline-none transition-all placeholder:font-medium placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-200;
}
</style>
