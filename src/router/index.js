import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../pages/inicio/Dashboard.vue'
import Inventariolayout from '@/pages/inventario/Inventariolayout.vue'
import LotesView from '@/pages/lotes/LotesView.vue'
import QcLabView from '@/pages/analisis/QcLabView.vue'
import SecurityView from '@/pages/seguridad/SecurityView.vue'
import ProcessWizard from '@/pages/procesos/ProcessWizard.vue'
import Step2Materiales from '@/pages/procesos/proceso2/Step2Materiales.vue'
import Step3View from '@/pages/procesos/proceso3/Step3View.vue'
import LoginView from '@/pages/login/LoginView.vue'
import MainLayout from '@/pages/main/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/panel',
      name: 'Home',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/panel/dashboard',
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardLayout,
        },
        {
          path: 'procesos',
          name: 'procesos',
          component: ProcessWizard,
        },
        {
          path: 'lotes',
          name: 'lotes',
          component: LotesView,
        },
        {
          path: 'inventario',
          name: 'inventario',
          component: Inventariolayout,
        },
        {
          path: 'analisis',
          name: 'analisis',
          component: QcLabView,
        },
        {
          path: 'seguridad',
          name: 'seguridad',
          component: SecurityView,
        },
      ],
    },

    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
  ],
})

export default router
