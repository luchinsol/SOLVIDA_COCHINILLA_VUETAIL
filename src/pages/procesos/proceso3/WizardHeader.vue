<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-bold">Registro de Nuevo Proceso</h1>
        <p class="text-sm text-text-muted">Paso 3 de 3: Resumen y Firma</p>
      </div>
      <button class="text-text-muted hover:text-danger text-sm">Cancelar</button>
    </div>

    <ProgressBar />
  </div>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue'
</script>
