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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardLayout,
      children: [],
    },
    {
      path: '/inventario',
      name: 'Inventario',
      component: Inventariolayout,
    },
    {
      path: '/lotes',
      name: 'Lotes',
      component: LotesView,
    },
    {
      path: '/qc',
      name: 'QC Lab',
      component: QcLabView,
    },
    {
      path: '/seguridad',
      name: 'Seguridad',
      component: SecurityView,
    },
    {
      path: '/procesos',
      name: 'Procesos',
      component: ProcessWizard,
    },
    {
      path: '/procesos2',
      name: 'Materiales',
      component: Step2Materiales,
    },
    {
      path: '/procesos3',
      name: 'Proceso Detallado',
      component: Step3View,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ],
})

export default router
