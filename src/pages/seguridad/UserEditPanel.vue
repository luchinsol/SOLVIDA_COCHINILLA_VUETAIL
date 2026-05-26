<template>
  <div class="bg-primary rounded-2xl border border-primary-light shadow-card p-6 text-white">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-xl font-bold">Editar Perfil</h3>
        <p class="text-secondary font-medium mt-1 text-sm">
          {{ props.user.nombres }} {{ props.user.apellidos }}
        </p>
      </div>

      <span
        class="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded border border-secondary/30"
      >
        {{ props.user.rol_nombre }}
      </span>
    </div>

    <!-- Form -->
    <form class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Nombre Completo </label>

        <div class="flex gap-2">
          <input v-model="form.nombres" type="text" placeholder="Nombres" class="input" />

          <input v-model="form.apellidos" type="text" placeholder="Apellidos" class="input" />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Correo Electrónico </label>
        <input v-model="form.correo" type="email" class="input" />
      </div>

      <!-- Rol -->
      <div>
        <label class="block text-xs text-gray-400 mb-1"> Rol Asignado </label>
        <select v-model="form.rol_id" class="input">
          <option value="" disabled selected>Seleccione un rol</option>
          <option v-for="rol in roles" :key="rol.rol_id" :value="rol.rol_id">
            {{ rol.nombre }}
          </option>
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

<
<script setup>
import axios from 'axios'
import { reactive } from 'vue'
import { ref, onMounted, watch } from 'vue'

const roles = ref([])
const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  user: Object,
})

const form = reactive({
  id: null,
  nombres: '',
  apellidos: '',
  correo: '',
  rol_id: '',

  permissions: {
    qc: false,
    inventory: false,
    catalog: false,
  },
})

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.id = newUser.id
      form.nombres = newUser.nombres
      form.apellidos = newUser.apellidos
      form.correo = newUser.correo
      form.rol_id = newUser.rol_id
    }
  },
  { immediate: true },
)

const getRoles = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseUrl}/roles`)
    roles.value = response.data
    console.log('Roles cargados:', roles.value)
  } catch (error) {
    console.error('Error al cargar roles:', error)
  }
}

const onCancel = () => {
  emit('cancel')
}

const onSave = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    // NECESITA TOKEN PARA PRUEBAS
    const token = import.meta.env.VITE_TOKEN_LOGIN

    await axios.patch(
      `${baseUrl}/usuarios/${form.id}/datos`,
      {
        nombres: form.nombres,
        apellidos: form.apellidos,
        correo: form.correo,
        rol_id: form.rol_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    alert('Usuario actualizado')

    emit('save', form)
  } catch (error) {
    console.error(error)
    alert('Error al actualizar')
  }
}

onMounted(() => {
  getRoles()
})
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
