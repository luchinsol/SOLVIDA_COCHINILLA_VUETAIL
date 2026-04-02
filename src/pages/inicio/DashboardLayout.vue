<template>
  <div class="flex bg-background min-h-screen font-sans text-textMain">
    <Sidebar />

    <main class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <Topbar />

      <div class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <slot />
        <Footer />
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/pages/inicio/Sidebar.vue'
import Topbar from '@/pages/inicio/Topbar.vue'
import Footer from '@/pages/inicio/Footer.vue'
</script>
