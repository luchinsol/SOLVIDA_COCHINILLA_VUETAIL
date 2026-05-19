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

    <SecurityTabs />

    <!-- MAIN GRID -->
    <div class="grid gap-6" :class="selectedUser ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'">
      <!-- LEFT -->
      <div :class="selectedUser ? 'lg:col-span-2' : 'col-span-1'">
        <UserTable @edit="onEditUser" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PermissionsSummary />
          <SecurityStatus />
        </div>
      </div>

      <!-- RIGHT -->
      <div v-if="selectedUser" class="flex flex-col gap-6">
        <UserEditPanel v-if="selectedUser" :user="selectedUser" @cancel="selectedUser = null" />
        <PoliciesPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import SecurityTabs from '@/pages/seguridad/SecurityTabs.vue'
import UserTable from '@/pages/seguridad/UserTable.vue'
import PermissionsSummary from '@/pages/seguridad/PermissionsSummary.vue'
import SecurityStatus from '@/pages/seguridad/SecurityStatus.vue'
import UserEditPanel from '@/pages/seguridad/UserEditPanel.vue'
import PoliciesPanel from '@/pages/seguridad/PoliciesPanel.vue'

import { ref } from 'vue'

const selectedUser = ref(null)

const onEditUser = (user) => {
  selectedUser.value = user
}

const onCancelEdit = () => {
  selectedUser.value = null
}
</script>
