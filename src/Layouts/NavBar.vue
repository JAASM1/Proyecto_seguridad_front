<template>
  <header
    class="font-poppins bg-white dark:bg-Dark text-black dark:text-white py-4 flex items-center justify-between"
  >
    <RouterLink to="/" class="text-3xl font-bold dark:text-white"> Evnto </RouterLink>
    <div>
      <BtnDarkMode />
      <div class="flex justify-center">
        <button
          type="button"
          @click="toggle($event)"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          class="text-black dark:text-white"
        >
          <Bars3Icon class="size-7" />
        </button>
        <Menu
          ref="menu"
          id="overlay_menu"
          :model="items"
          :popup="true"
          class="bg-white dark:bg-cpnDark text-black dark:text-white"
        />  
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Menu from "primevue/menu";
import { Bars3Icon } from "@heroicons/vue/24/solid";
import { useUserStore } from "@/stores/auth/user";
import BtnDarkMode from "../components/BtnDarkMode.vue";

const auth = useUserStore();
const router = useRouter();
const menu = ref(null);

const items = ref([
  {
    label: "Opciones",
    items: [
      {
        label: "Eventos",
        command: () => router.push("/"),
      },
      {
        label: "Cerrar Sesión",
        command: () => auth.Logout(),
      },
    ],
  },
]);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};
</script>
