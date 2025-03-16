import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormCreate from "@/views/Event/FormCreateView.vue";
import FormEdit from "@/views/Event/FormEditView.vue";
import FormDetailsView from "@/views/Event/FormDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/crear-evento",
      name: "crear-evento",
      component: FormCreate,
    },
    {
      path: "/editar-evento/:id",
      name: "editar-evento",
      component: FormEdit,
    },
    {
      path: "/detalles-evento",
      name: "detalles-evento",
      component: FormDetailsView,
    },
  ],
});

export default router;
