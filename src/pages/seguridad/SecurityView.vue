<template>
  <div class="flex flex-col gap-6">
    <!-- TITLE -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-primary mb-1">Seguridad y Usuarios</h1>

        <p class="text-sm text-text-muted">
          Gestión de accesos, políticas de seguridad y configuración de firmas electrónicas.
        </p>
      </div>

      <div class="flex gap-3">
        <!--button class="px-4 py-2 bg-surface border border-border-color rounded-xl text-sm">
          Exportar Auditoría
        </button-->

        <button
          @click="showNuevoUsuarioModal = true"
          class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold"
        >
          Nuevo Usuario
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div class="flex overflow-x-auto border-b border-border-color">
      <button
        @click="activeTab = 'usuarios'"
        class="px-6 py-3 border-b-2 text-sm"
        :class="
          activeTab === 'usuarios'
            ? 'border-primary text-primary font-bold'
            : 'border-transparent text-text-muted hover:text-primary'
        "
      >
        Usuarios y Roles
      </button>

      <button
        @click="activeTab = 'politicas'"
        class="px-6 py-3 border-b-2 text-sm"
        :class="
          activeTab === 'politicas'
            ? 'border-primary text-primary font-bold'
            : 'border-transparent text-text-muted hover:text-primary'
        "
      >
        Políticas y Accesos
      </button>
    </div>

    <!-- CONTENIDO -->
    <template v-if="activeTab === 'usuarios'">
      <div class="grid gap-6" :class="selectedUser ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'">
        <!-- LEFT -->
        <div :class="selectedUser ? 'lg:col-span-2' : 'col-span-1'">
          <UserTable ref="userTableRef" @edit="onEditUser" />
        </div>

        <!-- RIGHT -->
        <div v-if="selectedUser" class="flex flex-col gap-6">
          <UserEditPanel :user="selectedUser" @cancel="selectedUser = null" @save="onUserSaved" />
        </div>
      </div>
    </template>

    <!-- TAB POLITICAS -->
    <template v-if="activeTab === 'politicas'">
      <GestionRoles />
    </template>
  </div>

  <!-- MODAL NUEVO USUARIO -->
  <div
    v-if="showNuevoUsuarioModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white w-[800px] rounded-2xl shadow-2xl overflow-hidden">
      <!-- HEADER -->
      <div class="bg-slate-900 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 class="text-white text-lg font-bold">Nuevo Usuario</h2>

          <p class="text-slate-300 text-xs">Registro de usuarios del sistema</p>
        </div>

        <button @click="showNuevoUsuarioModal = false" class="text-white text-xl">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- BODY -->
      <div class="p-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2"> Nombres </label>

            <input v-model="formUsuario.nombres" class="w-full border rounded-xl px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2"> Apellidos </label>

            <input v-model="formUsuario.apellidos" class="w-full border rounded-xl px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2"> Correo </label>

            <input
              v-model="formUsuario.correo"
              type="email"
              class="w-full border rounded-xl px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2"> Nickname </label>

            <input v-model="formUsuario.nickname" class="w-full border rounded-xl px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2"> DNI </label>

            <input v-model="formUsuario.dni" class="w-full border rounded-xl px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2"> Rol </label>

            <select v-model="formUsuario.rol_id" class="w-full border rounded-xl px-3 py-2">
              <option value="">Seleccionar rol</option>

              <option v-for="rol in roles" :key="rol.rol_id" :value="rol.rol_id">
                {{ rol.nombre }}
              </option>
            </select>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-semibold mb-2"> Departamento </label>

            <select v-model="formUsuario.departamento" class="w-full border rounded-xl px-3 py-2">
              <option value="">Seleccionar departamento</option>

              <option v-for="item in departamentos" :key="item.modulo_id" :value="item.nombre">
                {{ item.nombre }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="border-t bg-slate-50 px-6 py-4 flex justify-end gap-3">
        <button @click="showNuevoUsuarioModal = false" class="px-4 py-2 border rounded-xl">
          Cancelar
        </button>

        <button @click="guardarUsuario" class="px-4 py-2 bg-slate-900 text-white rounded-xl">
          Guardar Usuario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import UserTable from '@/pages/seguridad/UserTable.vue'
import UserEditPanel from '@/pages/seguridad/UserEditPanel.vue'
import GestionRoles from '@/pages/seguridad/GestionRoles.vue'

const activeTab = ref('usuarios')

const userTableRef = ref(null)
const selectedUser = ref(null)
const roles = ref([])
const showNuevoUsuarioModal = ref(false)

const formUsuario = ref({
  nombres: '',
  apellidos: '',
  rol_id: '',
  correo: '',
  nickname: '',
  dni: '',
  departamento: '',
})
const cargarRoles = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/roles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    roles.value = response.data
  } catch (error) {
    console.error(error)
  }
}
const cargarDepartamentos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/modulos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    departamentos.value = response.data
  } catch (error) {
    console.error(error)
  }
}
const guardarUsuario = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    await axios.post(
      `${baseUrl}/usuarios`,
      {
        nombres: formUsuario.value.nombres,
        apellidos: formUsuario.value.apellidos,
        rol_id: Number(formUsuario.value.rol_id),
        correo: formUsuario.value.correo,
        nickname: formUsuario.value.nickname,
        dni: Number(formUsuario.value.dni),
        departamento: formUsuario.value.departamento,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )

    showNuevoUsuarioModal.value = false

    formUsuario.value = {
      nombres: '',
      apellidos: '',
      rol_id: '',
      correo: '',
      nickname: '',
      dni: '',
      departamento: '',
    }

    alert('Usuario creado correctamente')
  } catch (error) {
    console.error(error.response?.data)
  }
}
const departamentos = ref([])

const onEditUser = (user) => {
  selectedUser.value = user
}

const onUserSaved = async () => {
  await userTableRef.value.getUsers()
}

onMounted(() => {
  cargarDepartamentos()
  cargarRoles()
})
</script>
