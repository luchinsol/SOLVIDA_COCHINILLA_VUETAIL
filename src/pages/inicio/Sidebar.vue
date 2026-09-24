<template>
  <aside
    class="hidden md:flex flex-col w-64 bg-white h-screen fixed border-r border-slate-200 z-20"
  >
    <div class="p-6 flex items-center space-x-3">
      <div
        class="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-lg shadow-lg shadow-red-100"
      >
        <i class="fa-solid fa-leaf"></i>
      </div>
      <div>
        <h1 class="text-sm font-black text-primary leading-tight">Carmin-Cotecsa</h1>
        <p class="text-[10px] text-slate-400 font-bold uppercase">Gestión de Producción</p>
      </div>
    </div>

    <nav class="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
      <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 ml-4">
        Módulos
      </p>
      <router-link
        to="/panel/dashboard"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i class="fa-solid fa-chart-pie w-5"></i>
        <span>Panel inicial</span>
      </router-link>

      <router-link
        v-if="hasModulo('Producción')"
        to="/panel/procesos"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i class="fa-solid fa-industry w-5"></i>
        <span>Producción</span>
      </router-link>

      <router-link
        v-if="hasModulo('Lotes')"
        to="/panel/lotes"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i class="fa-solid fa-layer-group w-5"></i>
        <span>Lotes</span>
      </router-link>

      <div v-if="hasModulo('Inventario')" class="rounded-lg p-1" :class="{ 'bg-slate-50': route.name === 'inventario' }">
        <button
          type="button"
          class="nav-item w-full"
          :class="{ 'nav-item-active': route.name === 'inventario' }"
          :aria-expanded="inventarioAbierto"
          @click="toggleInventario"
        >
          <i class="fa-solid fa-boxes-stacked w-5"></i>
          <span>Inventario</span>
          <i
            class="fa-solid fa-chevron-down ml-auto text-xs transition-transform"
            :class="{ 'rotate-180': inventarioAbierto }"
          ></i>
        </button>

        <div v-show="inventarioAbierto" class="relative ml-5 pl-7 pb-2 space-y-1">
          <span class="absolute left-2 top-0 bottom-2 w-px bg-slate-200"></span>
          <router-link
            :to="{ name: 'inventario', query: { vista: 'inventario' } }"
            class="subnav-item"
            :class="{
              'subnav-item-active':
                route.name === 'inventario' && route.query.vista !== 'kardex',
            }"
          >
            <span class="subnav-dot"></span>
            <span>Inventario</span>
          </router-link>

          <router-link
            v-if="canViewKardex"
            :to="{ name: 'inventario', query: { vista: 'kardex' } }"
            class="subnav-item"
            :class="{
              'subnav-item-active':
                route.name === 'inventario' && route.query.vista === 'kardex',
            }"
          >
            <span class="subnav-dot"></span>
            <span>Kardex</span>
          </router-link>
        </div>
      </div>

      <router-link
        v-if="hasModulo('Laboratorio')"
        to="/panel/analisis"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i class="fa-solid fa-flask-vial w-5"></i>
        <span>Análisis de laboratorio</span>
      </router-link>

      <router-link
        v-if="hasModulo('Seguridad')"
        to="/panel/seguridad"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i class="fa-solid fa-shield-halved w-5"></i>
        <span>Seguridad</span>
      </router-link>
    </nav>

    <div class="p-5 border-t border-slate-100 bg-slate-50/50">
      <div class="flex items-center p-2 mb-3">
        <img class="w-8 h-8 rounded-lg border-2 border-white shadow-sm" src="https://i.pravatar.cc/40" />
        <div class="ml-2">
          <p class="text-xs font-black text-slate-800">Carlos M.</p>
          <p class="text-[9px] text-slate-400 font-bold uppercase">Plant Manager</p>
        </div>
      </div>
      <div>
        <button
          @click="salir"
          type="submit"
          class="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
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
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const modulosAcceso = JSON.parse(localStorage.getItem('modulos_acceso') || '[]')
const permisos = JSON.parse(localStorage.getItem('permisos') || '[]')
const canViewKardex = permisos.includes('movimiento_almacen.ver')
const inventarioAbierto = ref(route.name === 'inventario')

const normalizeModulo = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const hasModulo = (nombre) =>
  modulosAcceso.some((modulo) => normalizeModulo(modulo.modulo_nombre) === normalizeModulo(nombre))

const toggleInventario = async () => {
  inventarioAbierto.value = !inventarioAbierto.value

  if (inventarioAbierto.value && route.name !== 'inventario') {
    await router.push({ name: 'inventario', query: { vista: 'inventario' } })
  }
}

const salir = async () => {
  loading.value = true
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('permisos')
    localStorage.removeItem('modulos_acceso')
    await router.push({ name: 'Login' })
  } catch (error) {
    console.error('Error al salir:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors;
}

.nav-item-active {
  @apply font-black text-primary bg-slate-50;
}

.subnav-item {
  @apply flex items-center gap-3 px-2 py-2 text-[13px] font-medium text-slate-400 hover:text-slate-600 rounded-lg transition-colors;
}

.subnav-item-active {
  @apply font-bold text-primary;
}

.subnav-dot {
  @apply w-1.5 h-1.5 rounded-full border border-slate-300 bg-white shrink-0;
}

.subnav-item-active .subnav-dot {
  @apply bg-primary border-primary ring-4 ring-blue-50;
}
</style>
