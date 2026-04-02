<template>
  <div class="p-4 bg-danger/5 border-y border-danger/20 flex justify-between items-center">
    <div class="flex gap-3">
      <i class="fa-solid fa-triangle-exclamation text-danger"></i>
      <div>
        <p class="text-sm font-bold text-danger">Faltantes Detectados</p>
        <p class="text-xs text-danger/80">Faltan materiales en el proceso</p>
      </div>
    </div>

    <button
      class="px-4 py-2 border border-danger text-danger rounded-lg text-sm hover:bg-danger hover:text-white"
    >
      Generar Solicitud
    </button>
  </div>
</template>
