<template>
  <tr class="border-b hover:bg-surface-light transition">
    <td class="p-3">
      <span class="font-medium text-black">
        <!-- AGREGADO: props. -->
        {{ props.nombres }} {{ props.apellidos }}
      </span>
    </td>

    <td class="p-3">
      <!-- AGREGADO: props. -->
      {{ props.rol_nombre }}
    </td>

    <td class="p-3">
      <!-- AGREGADO: props. -->
      <span :class="props.estado === 'Activo' ? 'text-green-600' : 'text-red-600'">
        {{ props.estado }}
      </span>
    </td>

    <td class="p-3 flex gap-2">
      <!-- CORREGIDO: Pasar el objeto completo de props al emitir -->
      <button @click="emit('edit', props)">✏️</button>
      <button>🔑</button>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  id: [Number, String],
  nombres: String,
  apellidos: String,
  correo: String,
  rol_id: [Number, String],
  rol_nombre: String,
  departamento: String,
  estado: String,
  ultimo_acceso: String,
})

const emit = defineEmits(['edit'])
</script>
