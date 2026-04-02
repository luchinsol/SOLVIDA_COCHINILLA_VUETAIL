<template>
  <div class="bg-white rounded-xl border p-6">
    <div class="flex justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold">EXT-2023-10-28-01</h2>
        <p class="text-sm text-gray-500">Extracto Líquido</p>
      </div>

      <div class="flex gap-2">
        <button class="btn-outline text-xs">Etiqueta</button>
        <button class="btn-outline text-xs">Certificado</button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card">
        <p class="label">Cantidad</p>
        <p class="value">450 kg</p>
      </div>

      <div class="card">
        <p class="label">Inicial</p>
        <p class="value">500 kg</p>
      </div>

      <div class="card">
        <p class="label">Ubicación</p>
        <p class="value">Tanque T-102</p>
      </div>

      <div class="card">
        <p class="label">Caducidad</p>
        <p class="value">28 Abr 2024</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply p-4 rounded-lg border bg-gray-50;
}
.label {
  @apply text-xs text-gray-500;
}
.value {
  @apply font-bold;
}
</style>
