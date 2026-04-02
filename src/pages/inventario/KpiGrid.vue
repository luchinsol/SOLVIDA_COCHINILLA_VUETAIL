<!-- components/KpiGrid.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <KpiCard icon="fa-solid fa-boxes-stacked" title="Valor Inventario" value="$1,245,600" />
    <KpiCard icon="fa-solid fa-warehouse" title="Stock Disponible" value="85,230 kg" />
    <KpiCard icon="fa-solid fa-shopping-cart" title="Stock Reservado" value="12,450 kg" />
    <KpiCard icon="fa-solid fa-exclamation-triangle" title="Alertas" value="8 items" />
  </div>
</template>

<script setup>
import KpiCard from './KpiCard.vue'
</script>
