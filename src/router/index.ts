import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormCreate from "@/views/Event/FormCreateView.vue";
import FormEdit from "@/views/Event/FormEditView.vue";
import DetailsEventView from "@/views/Event/DetailsEventView.vue";
import Login from "@/views/Auts/LoginView.vue";
import Register from "@/views/Auts/RegisterView.vue";
import RecoverPassword from "@/views/Auts/RecoverPassword.vue";

import AppLayout from "@/Layouts/AppLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/crear-evento",
      name: "crear-evento",
      component: FormCreate,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/editar-evento/:id",
      name: "editar-evento",
      component: FormEdit,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/detalles-evento/:id",
      name: "detalles-evento",
      component: DetailsEventView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/RecoverPassword",
      name: "RecoverPassword",
      component: RecoverPassword,
    },
  ],
});

export default router;
