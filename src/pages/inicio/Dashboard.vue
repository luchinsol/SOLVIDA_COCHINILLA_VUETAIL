<template>
  <Topbar />

  <StatsCards />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <div class="lg:col-span-2 space-y-6">
      <ActiveProcesses />
      <RecentBatchesTable />
    </div>

    <div class="space-y-6">
      <SafetyNotifications />
      <QuickActions />
    </div>
  </div>
</template>

<script setup>
//import DashboardLayout from '@/pages/inicio/DashboardLayout.vue'
import Topbar from '@/pages/inicio/Topbar.vue'
import StatsCards from '@/pages/inicio/StatsCards.vue'
import ActiveProcesses from '@/pages/inicio/ActiveProcesses.vue'
import RecentBatchesTable from '@/pages/inicio/Tabla.vue'
import SafetyNotifications from '@/pages/inicio/SafetyNotifications.vue'
import QuickActions from '@/pages/inicio/QuickActions.vue'
</script>
