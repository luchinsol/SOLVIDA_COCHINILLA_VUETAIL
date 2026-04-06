<template>
  <div class="flex">
    <!-- Sidebar SIEMPRE visible -->
    <Sidebar />

    <!-- Contenido que cambia -->
    <main class="flex-1 md:ml-64 flex flex-col min-h-screen p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/pages/inicio/Sidebar.vue'
</script>
