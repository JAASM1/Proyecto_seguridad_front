<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Menu from "primevue/menu";
import { Bars3Icon } from "@heroicons/vue/24/solid";

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
        label: "Crear Evento",
        command: () => router.push("/crear-evento"),
      },
      {
        label: "Inicia sesion",
        command: () => router.push("/login"),
      },
      {
        label: "Registro",
        command: () => router.push("/register"),
      }
    ],
  },
]);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};
</script>

<template>
  <header
    class="font-poppins bg-Dark text-white px-6 py-4 flex items-center justify-between"
  >
    <h1 class="text-3xl font-bold">Evnto</h1>
    <div>
      <div class="flex justify-center">
        <button
          type="button"
          @click="toggle($event)"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        >
          <Bars3Icon class="size-7" />
        </button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </header>
  <div class="font-poppins bg-Dark max-md:px-6 min-h-screen">
    <RouterView />
    <RouterView>login</RouterView>
  </div>
</template>
