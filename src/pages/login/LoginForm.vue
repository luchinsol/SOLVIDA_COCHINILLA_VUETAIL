<template>
  <form @submit.prevent="login" class="space-y-5">
    <div>
      <label class="block text-sm text-neutral-700 mb-2"> Usuario </label>

      <div class="relative">
        <i class="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>

        <input
          v-model="username"
          type="text"
          placeholder="Ingresa tu usuario"
          class="w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm text-neutral-700 mb-2"> Contrasena </label>

      <div class="relative">
        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>

        <input
          v-model="password"
          type="password"
          placeholder="Ingresa tu contrasena"
          class="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900"
        />

        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2">
          <i class="fa-solid fa-eye text-neutral-400 hover:text-neutral-600"></i>
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input
          v-model="rememberMe"
          type="checkbox"
          class="w-4 h-4 border-neutral-300 rounded text-neutral-900"
        />
        <span class="ml-2 text-sm text-neutral-700">Recordarme</span>
      </label>

      <a href="#" class="text-sm text-neutral-900 hover:text-neutral-700">
        Olvidaste tu contrasena?
      </a>
    </div>

    <button
      type="submit"
      class="w-full bg-green-800 text-white py-2.5 rounded-md hover:bg-green-700"
    >
      <i class="fa-solid fa-right-to-bracket mr-2"></i>
      <span class="text-lg">Ingresar</span>
    </button>

    <p v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </p>
  </form>

  <div v-if="loading" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl flex flex-col items-center gap-4 shadow-lg">
      <div
        class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
      ></div>

      <p class="text-sm text-neutral-700">Un momento...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const login = async () => {
  if (!username.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  loading.value = true
  error.value = ''
  const baseUrl = import.meta.env.VITE_API_URL
  try {
    const response = await axios.post(`${baseUrl}/usuarios/login`, {
      nickname: username.value,
      password: password.value,
    })

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

    if (response.data.usuario) {
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
    }

    if (response.data.permisos) {
      localStorage.setItem('permisos', JSON.stringify(response.data.permisos))
    }

    if (response.data.modulos_acceso) {
      localStorage.setItem('modulos_acceso', JSON.stringify(response.data.modulos_acceso))
    }

    await router.push('/panel')
  } catch (err) {
    error.value = err.response?.data?.error || err.response?.data?.message || 'Error en el login'
    loading.value = false
  }
}
</script>
