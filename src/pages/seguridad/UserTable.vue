<template>
  <div
    class="bg-surface rounded-2xl border border-border-color shadow-card flex flex-col overflow-hidden"
  >
    <!-- HEADER -->
    <div class="p-5 border-b flex justify-between items-center">
      <h2 class="font-bold text-primary">Directorio de Usuarios</h2>
      <input placeholder="Buscar..." class="border px-3 py-1 rounded-lg text-sm" />
    </div>

    <!-- TABLE -->
    <table class="w-full text-sm">
      <thead class="bg-surface-light text-text-muted text-xs uppercase">
        <tr>
          <th class="p-3 text-left">Usuario</th>
          <th class="p-3 text-left">Rol</th>
          <th class="p-3 text-left">Estado</th>
          <th class="p-3 text-left">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <UserRow v-for="u in users" :key="u.name" v-bind="u" @edit="emit('edit', u)" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import UserRow from './UserRow.vue'

const emit = defineEmits(['edit'])

const users = [
  { name: 'Carlos Ramirez', role: 'Administrador', active: true },
  { name: 'Ana Lopez', role: 'QC', active: true },
]
</script>
