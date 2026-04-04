<template>
  <div class="min-h-screen bg-background p-6 lg:p-8 flex flex-col gap-6">
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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <UserTable />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PermissionsSummary />
          <SecurityStatus />
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex flex-col gap-6">
        <UserEditPanel />
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
</script>
