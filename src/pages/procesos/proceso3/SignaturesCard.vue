<template>
  <div class="bg-surface rounded-xl border p-6">
    <h2 class="text-sm font-bold mb-4 flex gap-2">
      <i class="fa-solid fa-file-signature text-primary"></i>
      Autorizaciones
    </h2>

    <div class="mb-4 p-3 bg-warning/10 border rounded-lg text-warning text-xs">
      Material incompleto — requiere supervisor
    </div>

    <div class="space-y-4">
      <div class="p-4 border rounded bg-slate-50">
        <p class="text-sm font-semibold">Operador</p>
        <p class="text-xs text-text-muted">Carlos R.</p>
      </div>

      <div class="p-4 border rounded bg-primary/5">
        <input type="password" placeholder="PIN" class="w-full p-2 border rounded mb-2" />
        <button class="w-full bg-primary text-white py-2 rounded">Firmar</button>
      </div>
    </div>
  </div>
</template>
