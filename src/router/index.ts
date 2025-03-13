import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormCreate from '@/views/Event/FormCreate.vue'
import LoginView from '@/views/Auts/LoginView.vue'
import RegisterView from '@/views/Auts/Register.View.vue'

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
      path: '/login',
      name: 'Login',
      component: LoginView,

    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,

    },
  ],
})

export default router
