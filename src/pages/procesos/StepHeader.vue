<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold">Registro de Nuevo Proceso</h1>
        <p class="text-sm text-slate-500">Configure los parámetros iniciales y requerimientos.</p>
      </div>
      <button class="text-sm text-red-500">Cancelar</button>
    </div>

    <!-- Progress -->
    <div class="relative pt-4">
      <div class="flex justify-between z-10 relative">
        <StepCircle number="1" label="Configuración" active />
        <StepCircle number="2" label="Materiales" />
        <StepCircle number="3" label="Resumen" />
      </div>

      <div class="absolute top-9 w-full h-1 bg-slate-100 rounded">
        <div class="h-full bg-primary w-0 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StepCircle from './StepCircle.vue'
</script>
