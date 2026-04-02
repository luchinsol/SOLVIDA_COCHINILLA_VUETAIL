<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card title="Muestras Pendientes" value="24" color="yellow" icon="fa-vial" />
    <Card title="En Análisis" value="18" color="indigo" icon="fa-microscope" />
    <Card title="Lotes Liberados" value="45" color="green" icon="fa-check-double" />
    <Card title="No Conformidades" value="3" color="red" icon="fa-ban" />
  </div>
</template>

<script setup>
import Card from './SummaryItem.vue'
</script>
