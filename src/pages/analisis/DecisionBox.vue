<template>
  <div class="bg-white border rounded-xl p-6">
    <h2 class="font-bold mb-4">Decisión de Lote</h2>

    <div class="space-y-3">
      <label class="flex gap-2 items-center border p-3 rounded">
        <input type="radio" name="decision" />
        <span class="text-green-600 font-bold">Aprobar</span>
      </label>

      <label class="flex gap-2 items-center border p-3 rounded">
        <input type="radio" name="decision" />
        <span class="text-red-600 font-bold">Rechazar</span>
      </label>
    </div>

    <textarea class="w-full border mt-4 p-2 rounded" placeholder="Comentarios"></textarea>

    <button class="w-full mt-4 bg-red-600 text-white py-2 rounded">Confirmar</button>
  </div>
</template>
