<template>
  <div class="bg-primary rounded-2xl border border-primary-light shadow-card p-6 text-white">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-xl font-bold">Editar Perfil</h3>
        <p class="text-secondary font-medium mt-1 text-sm">
          {{ user.name }}
        </p>
      </div>

      <span
        class="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded border border-secondary/30"
      >
        {{ user.role }}
      </span>
    </div>

    <!-- Form -->
    <form class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Nombre Completo </label>
        <input v-model="form.name" type="text" class="input" />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Correo Electrónico </label>
        <input v-model="form.email" type="email" class="input" />
      </div>

      <!-- Rol -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Rol Asignado </label>
        <select v-model="form.role" class="input">
          <option>Administrador</option>
          <option>Supervisor</option>
          <option>Operador Planta</option>
          <option>Calidad (QC)</option>
        </select>
      </div>

      <!-- Permisos -->
      <div class="pt-4 border-t border-gray-700">
        <p class="text-sm font-bold mb-3">Permisos Especiales</p>

        <div class="space-y-2">
          <label class="checkbox">
            <input type="checkbox" v-model="form.permissions.qc" />
            <span>Liberación de Lotes QC</span>
          </label>

          <label class="checkbox">
            <input type="checkbox" v-model="form.permissions.inventory" />
            <span>Ajuste Manual de Inventario</span>
          </label>

          <label class="checkbox">
            <input type="checkbox" v-model="form.permissions.catalog" />
            <span>Modificación de Catálogos</span>
          </label>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex gap-2">
        <button type="button" @click="onCancel" class="btn-cancel">Cancelar</button>

        <button type="button" @click="onSave" class="btn-save">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const user = {
  name: 'Carlos Ramirez',
  role: 'Admin',
}

const form = reactive({
  name: 'Carlos Ramirez',
  email: 'cramirez@carmine.com',
  role: 'Administrador',
  permissions: {
    qc: true,
    inventory: true,
    catalog: false,
  },
})

const onCancel = () => {
  console.log('Cancelar edición')
}

const onSave = () => {
  console.log('Datos guardados:', form)
}
</script>

<style scoped>
.input {
  @apply w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400;
}
.checkbox {
  @apply flex items-center gap-2 cursor-pointer text-sm text-gray-300;
}

.checkbox input {
  @apply rounded border-gray-600 text-blue-400 focus:ring-blue-400 bg-gray-800;
}
.btn-cancel {
  @apply flex-1 py-2 bg-transparent border border-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors;
}

.btn-save {
  @apply flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-400 transition-colors;
}
</style>
