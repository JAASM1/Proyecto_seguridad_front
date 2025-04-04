import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormCreate from "@/views/Event/FormCreateView.vue";
import DetailsEventView from "@/views/Event/DetailsEventView.vue";
import Invitation from "@/views/Invitation/InvitationView.vue";

import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import RecoverPassword from "@/views/Auth/RecoverPassword.vue";
import { isAuthenticated } from "@/services/Auth/Auth";
import ForgotPasswordView from "@/views/Auth/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/Auth/ResetPasswordView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "AppLayout",
        requiresAuth: true,
      },
    },
    {
      path: "/invitacion/:token",
      name: "invitacion",
      component: Invitation,
      meta: {
        layout: "InvitationLayout",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        layout: "AuthLayout",
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        layout: "AuthLayout",
      },
    },
    {
      path: "/cambio-contrasena",
      name: "cambio-contraseña",
      component: RecoverPassword,
      meta: {
        layout: "AuthLayout",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: () => import("../views/Auth/404View.vue"),
      meta: {
        layout: "AuthLayout",
      },
    },
    {
      path: "/ForgotPassword",
      name: "fogotpassword",
      component: () => import("../views/Auth/ForgotPasswordView.vue"),
      meta: {
        layout: "AuthLayout",
      }
    },
    {
      path: "/ResetPassword",
      name: "resetpassword",
      component: ResetPasswordView,
      meta:{
        layout: "AuthLayout",
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();
  if (to.meta.requiresAuth && !authenticated) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && authenticated) {
    next("/");
  } else {
    next();
  }
});


export default router;
