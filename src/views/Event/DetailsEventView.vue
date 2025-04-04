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

      <div
        class="bg-cpnDark shadow shadow-Dark rounded-lg p-3 flex flex-col gap-2 w-full"
        v-if="event?.idOrganizer == idUser"
      >
        <p class="text-sm">Copia e invita por medio de este enlace</p>
        <span
          class="bg-white border rounded-full border-white flex w-1/2"
        ></span>
        <div class="bg-Dark p-1.5 text-sm rounded-lg flex justify-between items-center">
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
            @click="openEditModal"
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

    <Dialog
      v-model:visible="showEditModal"
      modal
      header="Editar Evento"
      :style="{ width: '500px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="rounded-lg overflow-hidden [&_.p-dialog-content]:bg-cpnDark [&_.p-dialog-header]:bg-cpnDark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
      <Form v-if="event" :event="event" @submit="submitEditForm" />
    </Dialog>

    <Dialog
      v-model:visible="showGuestListModal"
      modal
      header="Lista de invitados"
      :style="{ width: '500px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="rounded-lg overflow-hidden [&_.p-dialog-content]:bg-cpnDark [&_.p-dialog-header]:bg-cpnDark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
      <p v-if="invited.length <= 0" class="text-center">Sin invitados</p>
      <div
        v-for="user in invited"
        :key="user.id"
        class="flex items-center gap-2"
      >
        <div class="border-b w-full py-0.5">
          <p class="text-white capitalize">{{ user.name }}</p>
          <p class="text-sm text-gray-400 font-light mb-1">{{ user.email }}</p>
        </div>
      </div>
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
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/Event/event";
import DetailsEvent from "@/components/Event/DetailsEvent.vue";
import type { Event } from "@/interfaces/Event/event";
import { formatDate } from "@/utils/dateUtils";
import { useUserStore } from "@/stores/auth/user";
import Form from "@/components/Event/Form.vue";
import type { Iuser } from "@/interfaces/user/user";
import { defineProps } from "vue";

const router = useRouter();
const editEvent = () => router.push(`/editar-evento/${props.eventId}`);
const eventStore = useEventStore();
const userStore = useUserStore();
const showEditModal = ref(false);
const event = ref<Event & { token?: string; idOrganizer: any }>();
const invited = ref<Iuser[]>([]);
const idUser = userStore.getUserIdFromToken();

const url = import.meta.env.VITE_INVITATION_URL;

const emit = defineEmits(["submit", "eventUpdated", "eventDeleted"]);
const toast = useToast();
const showGuestListModal = ref(false);
const visible = ref(false);

const props = defineProps<{ eventId: number }>();

//Informacion de evento - Alex
const fetchEvent = async () => {
  try {
    const eventFound = await eventStore.actions.getEvent(props.eventId);
    if (!eventFound) {
      router.push("/");
      return;
    }
    event.value = eventFound.data;
    const listInvited = await eventStore.actions.GetInvitedUsersByEvent(
      props.eventId
    );
    if (listInvited!.status === 200) {
      invited.value = listInvited!.data;
      console.log("Lista de invitados:", invited.value);
    }
  } catch (error) {
    console.error("Error fetching event:", error);
  }
};

const openEditModal = () => {
  showEditModal.value = true;
};

const submitEditForm = async (updatedEvent: Event) => {
  try {
    if (event.value) {
      const response = await eventStore.actions.updateEvent(
        event.value.id,
        updatedEvent
      );
      if (response.status === 200) {
        showEditModal.value = false;
        await fetchEvent(); // Actualiza los datos del evento en la vista
        emit("eventUpdated", updatedEvent);
      }
    }
  } catch (error) {
    console.error("Error al editar el evento:", error);
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

// Eliminar evento - Creado por Alex ¡No tocar!
const deleteEvent = async () => {
  try {
    const response = await eventStore.actions.destroyEvent(props.eventId);
    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Evento Eliminado",
        detail: "El evento ha sido eliminado",
        life: 3000,
      });
      visible.value = false;
      emit("eventDeleted");
      await fetchEvent();
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
});
</script>
