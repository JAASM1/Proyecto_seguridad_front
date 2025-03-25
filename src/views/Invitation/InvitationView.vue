<template>
  <div
    class="text-white space-y-5 font-poppins flex flex-col items-center pb-5"
  >
    <div class="space-y-3 w-full max-w-lg">
      <h2 class="text-2xl font-bold">{{ event?.name }}</h2>
      <DetailsEvent
        v-if="event"
        title="Descripción"
        :body="event.description"
      />
      <DetailsEvent
        v-if="event"
        title="Fecha y hora"
        :body="formatDate(event.eventDateTime)"
      />
      <DetailsEvent v-if="event" title="Ubicación" :body="event.location" />
    </div>
    <div class="flex justify-between mt-4">
    <button
      @click="abrirModalRegistro"
      class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2"
    >
      Aceptar
    </button>
    <button
      @click="rechazarInvitacion"
      class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2"
    >
      Rechazar
    </button>

    <!-- Modal de Registro -->
    <div
      v-if="modalAbierto"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-bold border-b pb-2">
          Registrarse para aceptar la invitación
        </h2>

        <div class="mt-4">
          <label class="text-gray-300 text-sm">Nombre completo</label>
          <input
            type="text"
            class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400"
          />

          <label class="text-gray-300 text-sm mt-3 block">Correo</label>
          <input
            type="email"
            class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400"
          />

          <label class="text-gray-300 text-sm mt-3 block">Contraseña</label>
          <input
            type="password"
            class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400"
          />

          <label class="text-gray-300 text-sm mt-3 block"
            >Repetir Contraseña</label
          >
          <input
            type="password"
            class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400"
          />
        </div>

        <!-- Botones -->
        <div class="flex justify-between mt-4">
          <button
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2"
          >
            Aceptar
          </button>
          <button
            @click="cerrarModal"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Alerta Notificación -->
    <div
      v-if="alerta.mostrar"
      :class="[
        'fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all',
        alerta.tipo === 'error' ? 'bg-red-500' : 'bg-teal-500',
      ]"
    >
      <p class="text-white font-semibold">{{ alerta.mensaje }}</p>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import DetailsEvent from "@/components/Event/DetailsEvent.vue";
import { genericRequest } from "@/utils/genericRequest";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { Event } from "@/interfaces/Event/event";
import { formatDate } from "@/utils/dateUtils";

const event = ref<Event>({} as Event);

onMounted(async () => {
  const router = useRoute();

  await GetEvent(router.params.token);
});

async function GetEvent(id: any) {
  const response = await genericRequest(
    `https://localhost:7161/api/Event/GetEventByToken/${id}`,
    "get"
  );
  event.value = response.data;
}
// Variables reactivas
const modalAbierto = ref(false);
const alerta = ref({ mostrar: false, mensaje: "", tipo: "success" });

// Métodos
const abrirModalRegistro = () => {
  modalAbierto.value = true;
};

const cerrarModal = () => {
  modalAbierto.value = false;
};


const rechazarInvitacion = () => {
  mostrarAlerta(
    "Has rechazado la invitación. Serás redirigido al login.",
    "error"
  );
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};

const mostrarAlerta = (mensaje: string, tipo: string = "success") => {
  alerta.value = { mostrar: true, mensaje, tipo };
  setTimeout(() => {
    alerta.value.mostrar = false;
  }, 3000);
};
</script>
