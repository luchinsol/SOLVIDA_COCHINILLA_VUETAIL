<template>
  <aside class="hidden md:flex flex-col w-64 bg-white h-screen fixed border-r shadow-soft">
    <div class="p-6 flex items-center space-x-3 border-b">
      <div class="w-10 h-10 bg-accent text-white flex items-center justify-center rounded-lg">
        <i class="fa-solid fa-leaf"></i>
      </div>
      <div>
        <h1 class="font-bold text-primary">Carmin-Cotecsa</h1>
        <p class="text-xs text-textMuted">Gestión de Producción</p>
      </div>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1">
      <router-link
        to="/panel/dashboard"
        class="nav-item active flex items-center px-4 py-3 rounded-lg"
      >
        <i class="fa-solid fa-chart-pie w-6"></i>
        <span class="ml-3">Panel inicial</span>
      </router-link>

      <router-link
        to="/panel/procesos"
        class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg"
      >
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Producción</span>
      </router-link>

      <router-link
        to="/panel/lotes"
        class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg"
      >
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Lotes</span>
      </router-link>

      <router-link
        to="/panel/inventario"
        class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg"
      >
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Inventario</span>
      </router-link>

      <router-link
        to="/panel/analisis"
        class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg"
      >
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Análisis de laboratorio</span>
      </router-link>

      <router-link
        to="/panel/seguridad"
        class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg"
      >
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Seguridad</span>
      </router-link>
    </nav>

    <div class="p-4 border-t">
      <div class="flex items-center bg-gray-50 p-2 rounded-lg">
        <img class="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" />
        <div class="ml-2">
          <p class="text-sm font-medium">Carlos M.</p>
          <p class="text-xs text-textMuted">Plant Manager</p>
        </div>
      </div>
      <div>
        <button
          @click="salir"
          type="submit"
          class="w-full bg-gray-500 text-white py-2.5 rounded-md hover:bg-blue-700"
        >
          <i class="fa-solid fa-right-to-bracket mr-2"></i>
          <span class="text-md">Salir</span>
        </button>
      </div>
    </div>
  </aside>
  <!-- CIRCULAR PROGRESS-->
  <div v-if="loading" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl flex flex-col items-center gap-4 shadow-lg">
      <!-- Spinner -->
      <div
        class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
      ></div>

      <!-- Texto -->
      <p class="text-sm text-neutral-700">Saliendo...</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const loading = ref(false)

const salir = () => {
  loading.value = true
  try {
    setTimeout(() => {
      router.push('/') // cambia a tu ruta real
      loading.value = false
    }, 5000)
  } catch (error) {
    loading.value = false
    console.error('Error al salir:', error)
  }
}
</script>
