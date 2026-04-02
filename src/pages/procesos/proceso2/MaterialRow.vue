<template>
  <tr :class="rowClass">
    <!-- Material -->
    <td class="p-4">
      <div class="flex gap-3 items-center">
        <div :class="iconClass">
          <i :class="icon"></i>
        </div>

        <div>
          <p class="text-sm font-semibold">Material Demo</p>
          <p class="text-xs text-text-muted">Código</p>
        </div>
      </div>
    </td>

    <!-- Lote -->
    <td class="p-4 text-sm">L-001</td>

    <!-- Ubicación -->
    <td class="p-4 text-sm">Almacén</td>

    <!-- Stock -->
    <td class="p-4 text-right">100</td>

    <!-- Requerido -->
    <td class="p-4 text-right text-primary font-semibold">50</td>

    <!-- Tolerancia -->
    <td class="p-4 text-center">±2%</td>

    <!-- Reserva -->
    <td class="p-4 text-right">
      <input class="w-20 border rounded px-2 py-1 text-right text-sm" value="50" />
    </td>

    <!-- QC -->
    <td class="p-4 text-center">
      <span :class="qcClass">Estado</span>
    </td>

    <!-- Acciones -->
    <td class="p-4">
      <button class="text-primary">
        <i class="fa-solid fa-right-left"></i>
      </button>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({ type: String })

const map = {
  normal: {
    row: '',
    icon: 'fa-solid fa-leaf',
    iconClass: 'w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded',
    qc: 'bg-success/10 text-success px-2 py-1 rounded-full text-xs',
  },
  warning: {
    row: 'bg-warning/5 border-l-4 border-warning',
    icon: 'fa-solid fa-flask',
    iconClass: 'w-8 h-8 bg-purple-100 text-purple-600 flex items-center justify-center rounded',
    qc: 'bg-warning/10 text-warning px-2 py-1 rounded-full text-xs',
  },
  danger: {
    row: 'bg-danger/5 border-l-4 border-danger',
    icon: 'fa-solid fa-box',
    iconClass: 'w-8 h-8 bg-orange-100 text-orange-600 flex items-center justify-center rounded',
    qc: 'bg-success/10 text-success px-2 py-1 rounded-full text-xs',
  },
  service: {
    row: '',
    icon: 'fa-solid fa-droplet',
    iconClass: 'w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded',
    qc: 'bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs',
  },
}

const rowClass = map[props.type].row
const icon = map[props.type].icon
const iconClass = map[props.type].iconClass
const qcClass = map[props.type].qc
</script>
