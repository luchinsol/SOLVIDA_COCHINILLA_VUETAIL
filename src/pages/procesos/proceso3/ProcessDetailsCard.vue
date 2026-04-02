<template>
  <div class="bg-surface rounded-xl border border-slate-200 shadow-sm p-6">
    <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
      <i class="fa-solid fa-gears text-primary"></i>
      Detalles del Proceso
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InfoItem label="Tipo de Proceso" value="Extracción (Línea 1)" />
      <InfoItem label="Receta" value="REC-EXT-001 v2.4" />
      <InfoItem label="Volumen" value="1,000 L" />
      <InfoItem label="Fecha" value="28 Oct 2023 - 08:00 AM" />
    </div>
  </div>
</template>

<script setup>
import InfoItem from '@/pages/procesos/proceso3/InfoItem.vue'
</script>
