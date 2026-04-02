<template>
  <section class="bg-slate-50 p-6 rounded-xl border">
    <h3 class="text-sm font-semibold mb-4">Parámetros de Extracción</h3>

    <div class="space-y-4">
      <select class="input w-1/2">
        <option>REC-EXT-001</option>
      </select>

      <div class="grid lg:grid-cols-2 gap-4">
        <div class="card">
          <h4 class="font-semibold mb-2">Lotes</h4>
          <button class="btn-dashed">+ Seleccionar</button>
        </div>

        <div class="card">
          <h4 class="font-semibold mb-2">Insumos</h4>
          <div class="flex justify-between text-sm">
            <span>Agua</span>
            <input type="number" class="w-20 border rounded px-2" />
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-3 rounded text-sm">Cálculo automático basado en receta.</div>
    </div>
  </section>
</template>

<style scoped>
.input {
  @apply border rounded px-3 py-2 bg-white;
}

.card {
  @apply border rounded-lg p-4 bg-white;
}

.btn-dashed {
  @apply w-full border-2 border-dashed p-2 rounded text-sm;
}
</style>
