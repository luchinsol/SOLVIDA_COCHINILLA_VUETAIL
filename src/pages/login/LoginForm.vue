<template>
  <!-- FORM -->
  <form @submit.prevent="login" class="space-y-5">
    <!-- USER -->
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

    <!-- PASSWORD -->
    <div>
      <label class="block text-sm text-neutral-700 mb-2"> Contraseña </label>

      <div class="relative">
        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>

        <input
          v-model="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          class="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900"
        />

        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2">
          <i class="fa-solid fa-eye text-neutral-400 hover:text-neutral-600"></i>
        </button>
      </div>
    </div>

    <!-- OPTIONS -->
    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input type="checkbox" class="w-4 h-4 border-neutral-300 rounded text-neutral-900" />
        <span class="ml-2 text-sm text-neutral-700">Recordarme</span>
      </label>

      <a href="#" class="text-sm text-neutral-900 hover:text-neutral-700">
        Olvidaste tu contraseña?
      </a>
    </div>

    <!-- BUTTON -->
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
  <!-- CIRCULAR PROGRESS-->
  <div v-if="loading" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl flex flex-col items-center gap-4 shadow-lg">
      <!-- Spinner -->
      <div
        class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
      ></div>

      <!-- Texto -->
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

  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/login', {
      nickname: username.value,
      password: password.value,
    })

    console.log('Respuesta del servidor:', response.data)

    // Guardar token si es necesario
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

    // 🔥 Simular transición UX
    setTimeout(() => {
      router.push('/panel') // cambia a tu ruta real
    }, 3000)

    // Redirigir o hacer algo con la respuesta
    console.log('Login exitoso:', response.data)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error en el login'
    console.error('Error:', err)
    loading.value = false
  } finally {
  }
}
</script>
