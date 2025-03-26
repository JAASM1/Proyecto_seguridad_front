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

      <div class="bg-cpnDark rounded-lg p-3 flex flex-col gap-2 w-full" v-if="event?.idOrganizer == idUser">
        <p class="text-sm">Copia e invita por medio de este enlace</p>
        <span
          class="bg-white border-2 rounded-full border-white flex w-1/2"
        ></span>
        <div class="bg-Dark p-1.5 rounded-lg flex justify-between items-center">
          <p class="text-white font-light line-clamp-1">
            {{ url + `${event?.token}` }}
          </p>
          <!-- Boton para copiar la url en el portapapeles -->
          <button @click="copyToClipboard" class="cursor-pointer">
            <ClipboardDocumentIcon class="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div>
        <div class="flex space-x-2">
          <!-- Boton para ver invitados -->
          <div class="flex flex-1" v-if="event?.idOrganizer == idUser">
            <button
              @click="showGuestListModal = true"
              type="button"
              class="p-2 px-5 bg-primary rounded-lg font-bold transition cursor-pointer flex items-center gap-2"
            >
              <p>Lista de invitados</p>
              <UserGroupIcon class="size-6" />
            </button>
          </div>
          <!-- Boton de editar -->
          <button
            v-if="event?.idOrganizer == idUser"
            @click="editEvent"
            type="button"
            class="p-2 hover:bg-gray-700 rounded-full transition cursor-pointer"
          >
            <PencilIcon class="size-6" />
          </button>
          <!-- Boton para eliminar evento !NO tocar¡ -->
          <div
            class="card flex justify-center"
            v-if="event?.idOrganizer == idUser"
          >
            <button
              class="p-2 hover:bg-gray-700 rounded-full transition cursor-pointer"
              type="button"
              @click="visible = true"
            >
              <TrashIcon class="size-6" />
            </button>
            <Dialog
              v-model:visible="visible"
              modal
              header="Eliminar evento"
              :style="{ width: '25rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
              class="rounded-lg overflow-hidden [&_.p-dialog-content]:bg-cpnDark [&_.p-dialog-header]:bg-cpnDark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
            >
              <div
                class="text-white font-poppins flex flex-col items-center gap-2"
              >
                <p class="text-2xl font-semibold">¿Estas seguro?</p>
                <p class="text-sm font-light">
                  Una vez eliminado no hay forma de recuperarlo
                </p>
                <ExclamationTriangleIcon
                  class="w-16 h-16 text-alert animate-pulse"
                />
              </div>
              <div class="flex justify-center gap-10 mt-4">
                <Button @click="deleteEvent" label="Eliminar" severity="warn" />

                <Button
                  @click="visible = false"
                  label="Cancelar"
                  severity="secondary"
                />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de invitados -->
    <Dialog
      v-model:visible="showGuestListModal"
      modal
      header="Invitados Agregados"
      :style="{ width: '500px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="[&_.p-dialog-header]:bg-Dark [&_.p-dialog-content]:bg-Dark [&_.p-dialog-footer]:bg-Dark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
      <div class="space-y-4">
        <div
          v-for="(guest, index) in guests"
          :key="index"
          class="border-b pb-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold text-white">{{ guest.name }}</p>
              <p class="text-white text-sm opacity-40">{{ guest.email }}</p>
            </div>

            <div class="flex gap-2 items-center">
              <Button
                @click="toggleStatus(guest, RegistrationStatus.Accepted)"
                :severity="
                  guest.status === RegistrationStatus.Accepted
                    ? 'success'
                    : 'secondary'
                "
                text
                rounded
                :label="'Aceptada'"
              />
              <Button
                @click="toggleStatus(guest, RegistrationStatus.Cancelled)"
                :severity="
                  guest.status === RegistrationStatus.Cancelled
                    ? 'danger'
                    : 'secondary'
                "
                text
                rounded
                :label="'Cancelada'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                  :class="
                    guest.status === RegistrationStatus.Cancelled
                      ? 'text-red-500'
                      : 'text-gray-500'
                  "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cerrar"
          @click="showGuestListModal = false"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/Event/event";
import DetailsEvent from "@/components/Event/DetailsEvent.vue";
import type { Event } from "@/interfaces/Event/event";
import { formatDate } from "@/utils/dateUtils";
import { useUserStore } from "@/stores/auth/user";

const router = useRouter();
//Esta linea te extrae el id del evento - Alex
const eventId = Number(router.currentRoute.value.params.id);
const editEvent = () => router.push(`/editar-evento/${eventId}`);
const eventStore = useEventStore();
const userStore = useUserStore();

const event = ref<Event & { token?: string; idOrganizer: any }>();
const idUser = userStore.getUserIdFromToken();

const url = import.meta.env.VITE_INVITATION_URL;

const emit = defineEmits(["submit"]);
const toast = useToast();
const showGuestListModal = ref(false);
const currentEventId = ref<number | null>(null);
const visible = ref(false);

// Estructura para invitados
interface Guest {
  id: number;
  name: string;
  email: string;
  status: RegistrationStatus;
  idInvitation?: number;
}

// Estados posibles
enum RegistrationStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Cancelled = "Cancelled",
}

//Informacion de evento - Alex
const fetchEvent = async () => {
  try {
    const eventFound = await eventStore.actions.getEvent(eventId);
    if (!eventFound) {
      router.push("/");
      return;
    }
    event.value = eventFound.data;
  } catch (error) {
    console.error("Error fetching event:", error);
  }
};

// Copiar enlace al portapapeles - Alex
const copyToClipboard = async () => {
  try {
    const eventUrl = `${url}${event.value?.token}`;
    await navigator.clipboard.writeText(eventUrl);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Enlace copiado en el portapapeles",
      life: 2000,
    });
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar el enlace",
      life: 2000,
    });
  }
};

const guests = ref<Guest[]>([]);

// Obtener invitados del evento
const fetchGuests = async () => {
  if (!currentEventId.value) return;

  try {
    const response = await axios.get(
      `https://localhost:7161/api/Event/GetEventById/${currentEventId.value}`
    );
    console.log(response.data);

    guests.value = response.data.invitations.map((inv: any) => ({
      id: inv.guest.id,
      name: inv.guest.name,
      email: inv.guest.email,
      status: inv.guestRegistration?.status || RegistrationStatus.Pending,
      idInvitation: inv.id,
    }));
  } catch (error) {
    console.error("Error fetching guests:", error);
  }
};

// Actualizar estado de invitado
const toggleStatus = async (guest: Guest, status: RegistrationStatus) => {
  try {
    await axios.put(
      `https://localhost:7161/api/Invitation/UpdateStatus/${guest.idInvitation}`,
      { status }
    );

    guest.status = status;
    toast.add({
      severity: "success",
      summary: "Estado Actualizado",
      detail: `Estado cambiado a ${status}`,
      life: 2000,
    });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// Eliminar invitado
const deleteGuest = async (guest: Guest) => {
  try {
    await axios.delete(
      `https://localhost:7161/api/Invitation/Delete/${guest.idInvitation}`
    );

    guests.value = guests.value.filter((g) => g.id !== guest.id);
    toast.add({
      severity: "success",
      summary: "Invitado Eliminado",
      detail: "Invitado removido del evento",
      life: 2000,
    });
  } catch (error) {
    console.error("Error deleting guest:", error);
  }
};

// Eliminar evento - Creado por Alex ¡No tocar!
const deleteEvent = async () => {
  try {
    const response = await eventStore.actions.destroyEvent(eventId);
    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Evento Eliminado",
        detail: "El evento ha sido eliminado",
        life: 3000,
      });
      router.push("/");
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo eliminar el evento",
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchEvent();
  if (currentEventId.value) {
    fetchGuests();
  }
});
</script>
