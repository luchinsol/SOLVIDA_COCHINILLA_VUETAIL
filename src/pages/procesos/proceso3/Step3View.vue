<template>
  <div class="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col max-w-7xl mx-auto w-full gap-6">
    <WizardHeader />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT -->
      <div class="lg:col-span-2 space-y-6">
        <ProcessDetailsCard />
        <MaterialsTable />
      </div>

      <!-- RIGHT -->
      <div class="space-y-6">
        <ChecklistCard />
        <SignaturesCard />
      </div>
    </div>

    <!-- FOOTER -->
    <div
      class="bg-surface rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between mt-auto"
    >
      <button
        class="px-6 py-2.5 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
      >
        <i class="fa-solid fa-arrow-left"></i> Atrás
      </button>

      <button
        class="px-8 py-3 bg-success text-white rounded-lg text-sm font-bold hover:bg-success/90 flex items-center gap-2"
      >
        <i class="fa-solid fa-flag-checkered"></i> Crear Proceso
      </button>
    </div>
  </div>
</template>

<script setup>
import WizardHeader from '@/pages/procesos/proceso3/WizardHeader.vue'
import ProcessDetailsCard from '@/pages/procesos/proceso3/ProcessDetailsCard.vue'
import MaterialsTable from '@/pages/procesos/proceso3/MaterialsTable.vue'
import ChecklistCard from '@/pages/procesos/proceso3/ChecklistCard.vue'
import SignaturesCard from '@/pages/procesos/proceso3/SignaturesCard.vue'
</script>
