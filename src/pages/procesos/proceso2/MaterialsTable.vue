<template>
  <div class="flex-1 overflow-x-auto">
    <table class="w-full whitespace-nowrap min-w-[1000px]">
      <thead>
        <tr class="bg-slate-50 border-b">
          <th class="p-4 text-xs text-text-muted">Material</th>
          <th class="p-4 text-xs text-text-muted">Lote</th>
          <th class="p-4 text-xs text-text-muted">Ubicación</th>
          <th class="p-4 text-xs text-right text-text-muted">Stock</th>
          <th class="p-4 text-xs text-right text-text-muted">Req.</th>
          <th class="p-4 text-xs text-center text-text-muted">Tol.</th>
          <th class="p-4 text-xs text-right text-text-muted">Reservar</th>
          <th class="p-4 text-xs text-center text-text-muted">QC</th>
          <th class="p-4 text-xs text-text-muted">Acciones</th>
        </tr>
      </thead>

      <tbody class="divide-y">
        <MaterialRow type="normal" />
        <MaterialRow type="service" />
        <MaterialRow type="warning" />
        <MaterialRow type="danger" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import MaterialRow from './MaterialRow.vue'
</script>
