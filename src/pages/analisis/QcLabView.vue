<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- TITLE -->
      <div class="flex justify-between">
        <div>
          <h1 class="text-2xl font-bold">Análisis QC</h1>
          <p class="text-gray-500 text-sm">Gestión de laboratorio</p>
        </div>
      </div>

      <SummaryCards />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <WorkQueueTable />
          <ResultsEntry />
        </div>

        <div class="space-y-6">
          <DecisionBox />
          <NonConformances />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SummaryCards from '@/pages/analisis/SummaryCards.vue'
import WorkQueueTable from '@/pages/analisis/WorkQueueTable.vue'
import ResultsEntry from '@/pages/analisis/ResultsEntry.vue'
import DecisionBox from '@/pages/analisis/DecisionBox.vue'
import NonConformances from '@/pages/analisis/NonConformances.vue'
</script>
