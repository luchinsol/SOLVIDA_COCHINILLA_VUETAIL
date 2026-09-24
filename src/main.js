import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@mdi/font/css/materialdesignicons.css'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const tokenInvalido =
      error.response?.status === 403 && error.response?.data?.error === 'Token inválido'

    if (error.response?.status === 401 || tokenInvalido) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      localStorage.removeItem('permisos')
      localStorage.removeItem('modulos_acceso')
      router.push({ name: 'Login' })
    }

    return Promise.reject(error)
  },
)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
