<template>
  <div class="bg-surface rounded-xl border border-border-color flex flex-col">
    <!-- TABS -->
    <div class="flex border-b border-border-color px-2">
      <button class="px-6 py-4 text-sm font-bold text-secondary border-b-2 border-secondary">
        Árbol Genealógico
      </button>
    </div>

    <!-- CONTENT -->
    <div class="p-6">
      <GenealogyTree />
    </div>
  </div>
</template>

<script setup>
import GenealogyTree from '@/pages/lotes/GenealogyTree.vue'
</script>
