import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormCreate from '@/views/Event/FormCreate.vue'
import Invitation from '../views/Invitation/InvitationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/crear-evento',
      name: 'crear-evento',
      component:FormCreate
    },
    {
      path:'/invitacion',
      name: 'invitacion',
      component:Invitation
    }
  ],
})

export default router
