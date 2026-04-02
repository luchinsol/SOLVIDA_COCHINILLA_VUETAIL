<template>
  <div class="bg-surface rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-6 border-b">
      <h2 class="text-lg font-bold flex gap-2">
        <i class="fa-solid fa-boxes-stacked text-primary"></i>
        Materiales Reservados
      </h2>
    </div>

    <table class="w-full text-left">
      <thead class="bg-slate-50 text-xs text-text-muted">
        <tr>
          <th class="p-4">Material</th>
          <th class="p-4 text-right">Cantidad</th>
          <th class="p-4 text-center">Estado</th>
        </tr>
      </thead>

      <tbody class="divide-y">
        <tr>
          <td class="p-4">Cochinilla Grado A</td>
          <td class="p-4 text-right font-bold">450 kg</td>
          <td class="p-4 text-center">
            <StatusBadge type="success" text="OK" />
          </td>
        </tr>

        <tr>
          <td class="p-4">Hidróxido de Sodio</td>
          <td class="p-4 text-right text-warning">0 / 150 kg</td>
          <td class="p-4 text-center">
            <StatusBadge type="warning" text="Incompleto" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import StatusBadge from '@/pages/procesos/proceso3/StatusBadge.vue'
</script>
