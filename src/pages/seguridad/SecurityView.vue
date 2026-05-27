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
        <button class="px-4 py-2 bg-surface border border-border-color rounded-xl text-sm">
          Exportar Auditoría
        </button>

        <button class="px-4 py-2 bg-primary text-secondary rounded-xl text-sm font-bold">
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
</template>

<script setup>
import { ref } from 'vue'

import UserTable from '@/pages/seguridad/UserTable.vue'
import UserEditPanel from '@/pages/seguridad/UserEditPanel.vue'
import GestionRoles from '@/pages/seguridad/GestionRoles.vue'

const activeTab = ref('usuarios')

const userTableRef = ref(null)
const selectedUser = ref(null)

const onEditUser = (user) => {
  selectedUser.value = user
}

const onUserSaved = async () => {
  await userTableRef.value.getUsers()
}
</script>
