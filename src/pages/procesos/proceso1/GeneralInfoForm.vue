<template>
  <section>
    <h3 class="text-sm font-semibold mb-4 uppercase">Detalles Operativos</h3>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label class="text-sm">Planta</label>
        <select class="input">
          <option>Línea A</option>
        </select>
      </div>

      <div>
        <label class="text-sm">Equipo</label>
        <select class="input">
          <option>Reactor R-101</option>
        </select>
      </div>

      <div>
        <label class="text-sm">Responsable</label>
        <select class="input">
          <option>Carlos R.</option>
        </select>
      </div>

      <div>
        <label class="text-sm">Fecha Inicio</label>
        <input type="datetime-local" class="input" />
      </div>

      <div>
        <label class="text-sm">Objetivo (kg)</label>
        <input type="number" class="input" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.input {
  @apply w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50;
}
</style>
