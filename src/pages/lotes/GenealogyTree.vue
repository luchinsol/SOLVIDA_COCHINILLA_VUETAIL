<template>
  <div class="bg-white rounded-xl border flex flex-col">
    <!-- Tabs -->
    <div class="flex border-b px-2">
      <button class="tab-active">Árbol Genealógico</button>
      <button class="tab">Movimientos</button>
      <button class="tab">QC</button>
    </div>

    <div class="p-6">
      <h3 class="font-bold mb-6">Trazabilidad One-Up / One-Down</h3>

      <div class="bg-gray-50 border rounded-xl p-6">
        <!-- Nodo principal -->
        <div class="flex items-center gap-4 mb-8">
          <div
            class="w-12 h-12 bg-orange-100 border-2 border-orange-500 rounded flex items-center justify-center"
          >
            <i class="fa-solid fa-flask text-orange-500"></i>
          </div>

          <div class="border border-orange-500 rounded p-3 w-64 bg-white">
            <p class="text-xs text-orange-500 font-bold">Lote Actual</p>
            <p class="font-bold">EXT-2023-10-28-01</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  @apply px-6 py-4 text-sm text-gray-500 hover:text-black;
}
.tab-active {
  @apply px-6 py-4 text-sm font-bold border-b-2 border-orange-500 text-orange-500;
}
</style>
