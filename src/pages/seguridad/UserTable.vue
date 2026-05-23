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
        <UserRow v-for="u in users" :key="u.id" v-bind="u" @edit="emit('edit', u)" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import UserRow from './UserRow.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['edit'])

const users = ref([])

const getUsers = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    // TOKEN TEMPORAL
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuaWNrbmFtZSI6InNhcml3aXMiLCJyb2xfaWQiOiIxIiwiaWF0IjoxNzc5NTAwODUxLCJleHAiOjE3Nzk1MDQ0NTF9.j_zDYZSi2BgiKxs5moAmpIi0R994w_utVDqKabsH3-0'

    const response = await axios.get(`${baseUrl}/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('Respuesta de la API:', response.data)
    console.log(response.data)

    users.value = response.data
  } catch (error) {
    console.error('Error obteniendo usuarios:', error)
  }
}

onMounted(() => {
  getUsers()
})

defineExpose({
  getUsers,
})
</script>
