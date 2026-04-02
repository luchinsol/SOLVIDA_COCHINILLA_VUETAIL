<template>
  <div class="bg-white rounded-xl border p-5">
    <h3 class="font-bold mb-4">Buscador de Lotes</h3>

    <div class="space-y-4">
      <input type="text" value="EXT-2023-10-28-01" class="input" />

      <div class="grid grid-cols-2 gap-3">
        <select class="input">
          <option>Todos</option>
          <option selected>Intermedio</option>
        </select>

        <select class="input">
          <option selected>Liberado</option>
          <option>Cuarentena</option>
        </select>
      </div>

      <button class="w-full btn-outline">Buscar</button>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none;
}
</style>
