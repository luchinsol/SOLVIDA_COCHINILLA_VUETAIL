<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-bold text-text-main">Registro de Nuevo Proceso</h1>
        <p class="text-sm text-text-muted mt-1">Paso 2 de 3: Requerimientos de Materiales</p>
      </div>

      <button class="text-text-muted hover:text-danger text-sm font-medium">Cancelar</button>
    </div>

    <!-- Progress -->
    <div class="relative pt-4">
      <div class="flex justify-between relative z-10">
        <StepCircle status="done" label="Configuración" icon="fa-check" />

        <StepCircle status="active" label="Materiales" :step="2" />

        <StepCircle status="pending" label="Resumen" :step="3" />
      </div>

      <div class="absolute top-9 left-0 w-full h-1 bg-slate-100 rounded-full">
        <div class="h-full bg-primary rounded-full w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StepCircle from './StepCircle.vue'
</script>
