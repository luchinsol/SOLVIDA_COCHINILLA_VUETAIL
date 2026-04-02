<template>
  <div class="bg-white rounded-xl border p-6">
    <h2 class="font-bold mb-4">
      Captura de Resultados: <span class="text-indigo-600">M-2023-1025</span>
    </h2>

    <div class="space-y-4">
      <Parameter name="Ácido Carmínico (%)" value="51.2" ok />
      <Parameter name="Humedad (%)" value="4.8" ok />
      <Parameter name="pH" value="11.8" error />
    </div>

    <div class="mt-6 flex justify-end gap-3">
      <button class="border px-4 py-2 rounded">Guardar</button>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded">Validar</button>
    </div>
  </div>
</template>

<script setup>
import Parameter from './ParameterItem.vue'
</script>
