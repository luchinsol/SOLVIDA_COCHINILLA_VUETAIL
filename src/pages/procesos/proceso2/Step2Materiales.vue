<template>
  <div class="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col max-w-7xl mx-auto w-full">
    <WizardHeader />

    <div
      class="bg-surface rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col"
    >
      <!-- Header Tabla -->
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-text-main">Lista de Materiales y Reservas</h2>

        <div class="flex gap-2">
          <div class="relative">
            <i
              class="fa-solid fa-barcode absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            ></i>
            <input
              type="text"
              placeholder="Escanear código..."
              class="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 bg-slate-50 w-48"
            />
          </div>

          <button
            class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200"
          >
            <i class="fa-solid fa-filter mr-1"></i> Filtros
          </button>
        </div>
      </div>

      <!-- Tabla -->
      <MaterialsTable />

      <!-- Alert -->
      <MissingAlert />

      <!-- Navigation -->
      <WizardNavigation />
    </div>
  </div>
</template>

<script setup>
import WizardHeader from '@/pages/procesos/proceso2/WizardHeader.vue'
import MaterialsTable from '@/pages/procesos/proceso2/MaterialsTable.vue'
import MissingAlert from '@/pages/procesos/proceso2/MissingAlert.vue'
import WizardNavigation from '@/pages/procesos/proceso2/WizardNavigation.vue'
</script>
