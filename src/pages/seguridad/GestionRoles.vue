<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-[20px] font-bold text-gray-900">Roles del Sistema</h2>

        <p class="text-sm text-gray-500 mt-1">
          Administre los niveles de acceso para los diferentes módulos de producción.
        </p>
      </div>

      <button
        @click="showNuevoPermisoModal = true"
        class="px-4 py-2 bg-gray-900 text-white rounded-[8px] text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
      >
        <i class="fa-solid fa-plus"></i>
        Nuevo Permiso
      </button>
    </div>

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
                class="text-xs font-bold px-2 py-0.5 rounded-full"
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
              @click="showGuardarPermisosModal = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-[8px] text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Guardar cambios
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
                <div class="grid grid-cols-4 gap-3 w-full">
                  <PermissionSelector
                    v-for="(permission, accionNombre) in resource.acciones"
                    :key="accionNombre"
                    :label="accionNombre"
                    :permission="permission"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showGuardarPermisosModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-[500px] shadow-lg">
      <h2 class="text-xl font-bold mb-4">Guardar cambios de permisos</h2>

      <p class="text-sm text-gray-600 mb-6">
        Se actualizarán los permisos modificados para el rol
        <span class="font-semibold"> {{ selectedRole?.nombre }} </span>.
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="showGuardarPermisosModal = false"
          class="px-4 py-2 border border-gray-300 rounded-lg"
        >
          Cancelar
        </button>

        <button
          @click="confirmarGuardarPermisos"
          class="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>

  <!-- SHOW MODAL NUEVO PERMISO  -->
  <div
    v-if="showNuevoPermisoModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white w-[900px] rounded-xl shadow-xl overflow-hidden">
      <!-- HEADER -->
      <div class="flex items-center justify-between px-6 py-4 border-b bg-blue-900">
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 border border-white/20"
          >
            <i class="fa-solid fa-plus text-white text-sm"></i>
          </div>

          <div>
            <h2 class="text-sm font-bold text-white">Agregar Nuevo Permiso</h2>

            <p class="text-[11px] text-indigo-200">Configura módulo, recurso y acciones</p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- INFO -->
      <div class="flex items-center gap-2 px-6 py-3 bg-indigo-50 border-b text-xs text-blue-900">
        <i class="fa-solid fa-circle-info"></i>

        <span> Selecciona un módulo para habilitar el recurso. </span>
      </div>

      <!-- BODY -->
      <div class="p-6 space-y-6">
        <!-- SELECTORES -->
        <div class="grid grid-cols-2 gap-4">
          <!-- MODULO -->
          <div>
            <label class="block text-xs font-semibold mb-2"> Módulo </label>

            <select
              v-model="form.modulo_id"
              @change="cargarRecursos(form.modulo_id)"
              class="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Seleccionar módulo</option>

              <option v-for="modulo in modulos" :key="modulo.modulo_id" :value="modulo.modulo_id">
                {{ modulo.nombre }}
              </option>
            </select>
          </div>

          <!-- RECURSO -->
          <div>
            <label class="block text-xs font-semibold mb-2"> Recurso </label>

            <select v-model="form.recurso" class="w-full border rounded-lg px-3 py-2">
              <option value="">Seleccionar recurso</option>

              <option v-for="recurso in recursos" :key="recurso.recurso" :value="recurso.recurso">
                {{ recurso.recurso_label }}
              </option>
            </select>
          </div>
        </div>

        <!-- ACCIONES -->
        <div class="border rounded-xl overflow-hidden">
          <div class="grid grid-cols-4 bg-blue-900 text-white px-4 py-3 text-xs font-semibold">
            <div></div>
            <div>Acción</div>
            <div>Descripción</div>
            <div class="text-center">Alcance</div>
          </div>

          <div
            v-if="recursoSeleccionado"
            v-for="(accionData, accionNombre) in recursoSeleccionado.acciones"
            :key="accionNombre"
            class="grid grid-cols-4 items-center px-4 py-3 border-t"
          >
            <div class="flex justify-center">
              <input type="checkbox" v-model="accionData.activo" />
            </div>

            <div class="font-medium capitalize">
              {{ accionNombre }}
            </div>

            <div class="text-xs text-gray-500">
              {{
                accionData.opciones?.valorado?.descripcion ||
                accionData.opciones?.no_valorado?.descripcion ||
                accionData.opciones?.on?.descripcion ||
                '-'
              }}
            </div>

            <div class="flex justify-center gap-2">
              <button
                v-if="accionData.opciones?.valorado?.permiso_id"
                @click="accionData.alcanceSeleccionado = 'valorado'"
                :class="
                  accionData.alcanceSeleccionado === 'valorado' ? 'bg-blue-600 text-white' : ''
                "
                class="px-2 py-1 text-xs border rounded"
              >
                V
              </button>

              <button
                v-if="accionData.opciones?.no_valorado?.permiso_id"
                @click="accionData.alcanceSeleccionado = 'no_valorado'"
                :class="
                  accionData.alcanceSeleccionado === 'no_valorado' ? 'bg-blue-600 text-white' : ''
                "
                class="px-2 py-1 text-xs border rounded"
              >
                NV
              </button>
              <span v-if="accionData.tipo_selector === 'booleano'" class="text-xs text-slate-500">
                Booleano
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="flex justify-end gap-3 p-4 border-t bg-gray-50">
        <button @click="showNuevoPermisoModal = false" class="px-4 py-2 border rounded-lg">
          Cancelar
        </button>

        <button @click="guardarPermiso" class="px-4 py-2 bg-blue-900 text-white rounded-lg">
          Guardar Permiso
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import PermissionSelector from './PermisoSelector/PermissionSelector.vue'

const roles = ref([])
const searchRole = ref('')
const rolePermissions = ref([])
const originalPermissions = ref([])
const selectedRole = ref(null)
const showGuardarPermisosModal = ref(false)
// modal nuevo permiso
const showNuevoPermisoModal = ref(false)
// modales
const modulos = ref([])
const recursos = ref([])

const form = ref({
  modulo_id: '',
  recurso: '',
})

const postPermiso = async () => {
  try {
    //await axios.post(...)

    showNuevoPermisoModal.value = false
  } catch (error) {
    console.error(error)
  }
}

const acciones = ref([
  {
    codigo: 'ver',
    nombre: 'Ver',
    descripcion: 'Visualizar registros',
    activo: false,
    alcance: null,
  },
])

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
    const token = localStorage.getItem('token')
    const response = await axios.get(`${baseUrl}/rol-permisos/vista?rol_id=${rolId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    rolePermissions.value = response.data.modulos

    console.log('Permisos del rol:', rolePermissions.value)
    originalPermissions.value = JSON.parse(JSON.stringify(response.data.modulos))
  } catch (error) {
    console.error('Error cargando permisos:', error)
  }
}

const obtenerCambios = () => {
  const cambios = []

  rolePermissions.value.forEach((modulo, moduloIndex) => {
    modulo.recursos.forEach((recurso, recursoIndex) => {
      Object.entries(recurso.acciones).forEach(([accionNombre, accion]) => {
        const original =
          originalPermissions.value[moduloIndex].recursos[recursoIndex].acciones[accionNombre]

        if (accion.tipo_selector === 'booleano') {
          if (accion.activo !== original.activo) {
            cambios.push({
              rol_id: selectedRole.value.rol_id,
              recurso: recurso.recurso,
              accion: accionNombre,
              alcance: null,
              activo: accion.activo,
            })
          }
        }

        if (accion.tipo_selector === 'alcance') {
          if (accion.opciones.valorado.activo !== original.opciones.valorado.activo) {
            cambios.push({
              rol_id: selectedRole.value.rol_id,
              recurso: recurso.recurso,
              accion: accionNombre,
              alcance: 'valorado',
              activo: accion.opciones.valorado.activo,
            })
          }

          if (accion.opciones.no_valorado.activo !== original.opciones.no_valorado.activo) {
            cambios.push({
              rol_id: selectedRole.value.rol_id,
              recurso: recurso.recurso,
              accion: accionNombre,
              alcance: 'no_valorado',
              activo: accion.opciones.no_valorado.activo,
            })
          }
        }
      })
    })
  })

  return cambios
}

const construirCambios = () => {
  const cambios = []

  rolePermissions.value.forEach((modulo) => {
    modulo.recursos.forEach((recurso) => {
      Object.entries(recurso.acciones).forEach(([accionNombre, accion]) => {
        if (accion.tipo_selector === 'alcance') {
          cambios.push({
            rol_id: selectedRole.value.rol_id,
            recurso: recurso.recurso,
            accion: accionNombre,
            alcance: 'valorado',
            activo: accion.opciones.valorado.activo,
          })

          cambios.push({
            rol_id: selectedRole.value.rol_id,
            recurso: recurso.recurso,
            accion: accionNombre,
            alcance: 'no_valorado',
            activo: accion.opciones.no_valorado.activo,
          })
        } else {
          cambios.push({
            rol_id: selectedRole.value.rol_id,
            recurso: recurso.recurso,
            accion: accionNombre,
            alcance: null,
            activo: accion.activo,
          })
        }
      })
    })
  })

  return cambios
}
const guardarCambios = async () => {
  try {
    //   const cambios = construirCambios()
    const cambios = obtenerCambios()
    const token = localStorage.getItem('token')

    if (!cambios.length) {
      alert('No hay cambios para guardar')
      return
    }
    console.log('Payload:', cambios)

    const baseUrl = import.meta.env.VITE_API_URL
    /*
    await Promise.all(
      cambios.map((item) =>
        axios.patch(`${baseUrl}/rol-permisos`, item, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_LOGIN}`,
          },
        }),
      ),
    )*/
    for (const item of cambios) {
      try {
        console.log('ENVIANDO:', item)

        const response = await axios.patch(`${baseUrl}/rol-permisos`, item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        console.log('OK:', response.data)
      } catch (error) {
        console.log('FALLO:', item)
        console.log(error.response?.data)
      }
    }
    originalPermissions.value = JSON.parse(JSON.stringify(rolePermissions.value))
    alert('Permisos actualizados correctamente')
  } catch (error) {
    console.error('ERROR COMPLETO:', error.response?.data)
    console.error(error)
  }
}
const confirmarGuardarPermisos = async () => {
  await guardarCambios()

  showGuardarPermisosModal.value = false
}

const getModulos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseUrl}/modulos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    modulos.value = response.data
  } catch (error) {
    console.error('ERROR:', error)
  }
}

const cargarRecursos = async (moduloId) => {
  if (!moduloId) return
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseUrl}/permisos/catalogo?modulo_id=${moduloId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    recursos.value = response.data[0].recursos
  } catch (error) {
    console.error('ERROR:', error)
  }
}

const recursoSeleccionado = computed(() => {
  return recursos.value.find((r) => r.recurso === form.value.recurso)
})

const guardarPermiso = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const moduloSeleccionado = modulos.value.find((m) => m.modulo_id == form.value.modulo_id)

    const permisos = []

    Object.entries(recursoSeleccionado.value.acciones).forEach(([accionNombre, accionData]) => {
      if (accionData.activo) {
        permisos.push({
          modulo: moduloSeleccionado.nombre,
          recurso: form.value.recurso,
          accion: accionNombre,
          alcance:
            accionData.tipo_selector === 'alcance' ? accionData.alcanceSeleccionado || null : null,
          descripcion:
            accionData.opciones?.valorado?.descripcion ||
            accionData.opciones?.no_valorado?.descripcion ||
            accionData.opciones?.on?.descripcion ||
            '',
        })
      }
    })

    console.log('Payload:', permisos)
    console.log(localStorage.getItem('token'))
    await Promise.all(
      permisos.map((item) =>
        axios.post(`${baseUrl}/permisos`, item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      ),
    )
    console.log(item)
    console.log({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    })
    showNuevoPermisoModal.value = false

    alert('Permisos creados correctamente')
  } catch (error) {
    console.log(error.response?.status)
    console.log(error.response?.data)
  }
}

onMounted(() => {
  getListRoles()
  getModulos()
  //  cargarRecursos()
})
</script>
