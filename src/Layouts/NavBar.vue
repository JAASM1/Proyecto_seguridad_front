<template>
    <header
      class="font-poppins bg-Dark text-white py-4 flex items-center justify-between"
    >
      <RouterLink to="/" class="text-3xl font-bold"> Evnto </RouterLink>
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
  </template>
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
      ],
    },
  ]);
  
  const toggle = (event: Event) => {
    menu.value?.toggle(event);
  };
  </script>  