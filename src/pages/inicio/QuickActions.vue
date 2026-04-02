<template>
  <section class="bg-white p-5 rounded-xl shadow-card">
    <h3 class="text-sm mb-4">Acciones</h3>

    <div class="grid grid-cols-2 gap-3">
      <button class="border p-3 rounded-lg hover:bg-blue-50">
        <i
          class="fa-solid fa-vial-circle-check text-textMuted group-hover:text-primary mb-2 text-lg"
        ></i>
        Ingresar Lab
      </button>
      <button class="border p-3 rounded-lg hover:bg-blue-50">
        <i
          class="fa-solid fa-truck-loading text-textMuted group-hover:text-primary mb-2 text-lg"
        ></i>
        Recepción
      </button>
      <button class="border p-3 rounded-lg hover:bg-blue-50">
        <i
          class="fa-solid fa-file-contract text-textMuted group-hover:text-primary mb-2 text-lg"
        ></i>
        Crear Orden
      </button>
      <button class="border p-3 rounded-lg hover:bg-blue-50">
        <i
          class="fa-solid fa-triangle-exclamation text-textMuted group-hover:text-accent mb-2 text-lg"
        ></i>
        Reportar
      </button>
    </div>
  </section>
</template>
