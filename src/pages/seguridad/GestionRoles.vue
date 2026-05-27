<template>
  <div class="flex flex-col gap-6">
    <!-- HEADER
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-[20px] font-bold text-gray-900">Roles del Sistema</h2>

        <p class="text-sm text-gray-500 mt-1">
          Administre los niveles de acceso para los diferentes módulos de producción.
        </p>
      </div>

      <button
        class="px-4 py-2 bg-gray-900 text-white rounded-[8px] text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
      >
        <i class="fa-solid fa-plus"></i>
        Nuevo Rol
      </button>
    </div>
 -->
    <!-- MAIN -->
    <div class="flex gap-6 min-h-[700px]">
      <!-- ROLES -->
      <div
        class="w-[360px] bg-white border border-gray-200 rounded-[12px] shadow-sm flex flex-col overflow-hidden"
      >
        <!-- SEARCH -->
        <div class="p-4 border-b border-gray-100 bg-gray-50/50">
          <div class="relative">
            <i
              class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            ></i>

            <input
              v-model="searchRole"
              type="text"
              placeholder="Buscar rol..."
              class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <!-- LIST -->
        <div class="flex-1 overflow-y-auto p-2">
          <div
            v-for="role in filteredRoles"
            :key="role.rol_id"
            @click="((selectedRole = role), getRolePermissions(role.rol_id))"
            class="p-3 mb-1 rounded-[8px] cursor-pointer flex justify-between items-center group transition-colors"
            :class="
              selectedRole?.rol_id === role.rol_id
                ? 'bg-blue-50 border border-blue-100'
                : 'hover:bg-gray-50'
            "
          >
            <div>
              <h3
                class="text-sm font-semibold"
                :class="selectedRole?.rol_id === role.rol_id ? 'text-blue-600' : 'text-gray-900'"
              >
                {{ role.nombre }}
              </h3>

              <p class="text-xs text-gray-500 mt-0.5">
                {{ role.descripcion }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-full"
                :class="
                  selectedRole?.rol_id === role.rol_id
                    ? 'bg-white border border-blue-400 text-blue-600'
                    : 'bg-gray-100 text-gray-700'
                "
              >
                {{ role.total_usuarios }} usuarios
              </span>

              <i
                class="fa-solid fa-chevron-right text-xs"
                :class="selectedRole?.rol_id === role.rol_id ? 'text-blue-400' : 'text-gray-300'"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- PERMISSIONS -->
      <!-- PERMISSIONS -->
      <div
        v-if="selectedRole"
        class="flex-1 bg-white border border-gray-200 rounded-[12px] shadow-sm flex flex-col overflow-hidden"
      >
        <!-- TOP -->
        <div class="p-6 border-b border-gray-200 flex justify-between items-start bg-white">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="text-lg font-bold text-gray-900">{{ selectedRole.nombre }}</h2>

              <span
                class="bg-green-100 text-green-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
              >
                Activo
              </span>
            </div>

            <p class="text-sm text-gray-500">Configuración de permisos detallados para este rol.</p>
          </div>

          <div class="flex gap-3">
            <button
              class="px-4 py-2 bg-gray-900 text-white rounded-[8px] text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Editar
            </button>
          </div>
        </div>

        <!-- BODY -->
        <div class="flex-1 overflow-y-auto p-6 bg-[#F9FAFB] space-y-6">
          <!-- MODULE -->
          <div
            v-for="module in rolePermissions"
            :key="module.id"
            class="bg-white border border-gray-200 rounded-[12px] shadow-sm overflow-hidden"
          >
            <!-- MODULE HEADER -->
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-[8px] bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center"
                >
                  <i :class="module.icon"></i>
                </div>

                <div>
                  <h3 class="font-semibold text-gray-900 text-[15px]">
                    Módulo {{ module.modulo_nombre }}
                  </h3>
                </div>
              </div>

              <input type="checkbox" class="w-4 h-4" checked />
            </div>

            <!-- RESOURCES -->
            <div class="divide-y divide-gray-100">
              <div
                v-for="resource in module.recursos"
                :key="resource.id"
                class="p-5 hover:bg-gray-50/50 transition-colors flex flex-col xl:flex-row xl:items-center justify-between gap-5"
              >
                <!-- LEFT -->
                <div class="flex items-start gap-4 xl:w-[35%]">
                  <div class="mt-1 text-gray-400">
                    <i :class="resource.icon"></i>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-[14px] font-semibold text-gray-800">
                        {{ resource.recurso }}
                      </span>

                      <span
                        class="text-[11px] font-medium text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"
                      >
                        {{ resource.code }}
                      </span>
                    </div>

                    <p class="text-[12px] text-gray-500">
                      {{ resource.description }}
                    </p>
                  </div>
                </div>

                <!-- ACTIONS -->
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    v-for="action in actions"
                    :key="action"
                    class="px-3 py-1.5 rounded-[6px] text-[12px] font-medium border transition-colors flex items-center gap-1.5"
                    :class="
                      resource.acciones[action.toLowerCase()]
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                    "
                  >
                    {{ action }}
                  </button>
                </div>
                <!-- SEGMENTED -->
                <div class="inline-flex bg-gray-100/80 p-1 rounded-[10px] border border-gray-200">
                  <!-- VALORADO -->
                  <button
                    class="px-4 py-2 text-[12px] font-semibold rounded-[8px] flex items-center gap-2 transition-all"
                    :class="
                      resource.scope === 'valorado'
                        ? 'bg-white text-green-700 shadow-sm border border-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    "
                    @click="resource.scope = 'valorado'"
                  >
                    <i class="fa-solid fa-sack-dollar text-[11px]"></i>
                    Valorado
                  </button>

                  <!-- NO VALORADO -->
                  <button
                    class="px-4 py-2 text-[12px] font-medium rounded-[8px] flex items-center gap-2 transition-all"
                    :class="
                      resource.scope === 'no-valorado'
                        ? 'bg-white text-gray-700 shadow-sm border border-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    "
                    @click="resource.scope = 'no-valorado'"
                  >
                    <i class="fa-solid fa-ban text-[11px]"></i>
                    No valorado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const roles = ref([])
const searchRole = ref('')
const rolePermissions = ref([])

const selectedRole = ref(null)
const filteredRoles = computed(() => {
  if (!searchRole.value) {
    return roles.value
  }

  return roles.value.filter((role) =>
    role.nombre.toLowerCase().includes(searchRole.value.toLowerCase()),
  )
})

const actions = ['Ver', 'Crear', 'Editar', 'Eliminar']

const getListRoles = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/roles`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_LOGIN}`,
      },
    })

    roles.value = response.data

    // seleccionar primer rol
    if (roles.value.length > 0) {
      selectedRole.value = roles.value[0]

      await getRolePermissions(selectedRole.value.rol_id)
    }

    console.log('Roles cargados:', roles.value)
  } catch (error) {
    console.error('Error al cargar roles:', error)
  }
}

const getRolePermissions = async (rolId) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/rol-permisos/vista?rol_id=${rolId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_LOGIN}`,
      },
    })

    rolePermissions.value = response.data.modulos

    console.log('Permisos del rol:', rolePermissions.value)
  } catch (error) {
    console.error('Error cargando permisos:', error)
  }
}

onMounted(() => {
  getListRoles()
})
</script>
