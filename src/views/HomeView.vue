<template>
  <main class="text-black dark:text-white space-y-3">
    <h1 class="text-2xl font-bold">Eventos</h1>
    <div class="flex w-full gap-10">
      <section v-if="createdEvents.length > 0" class="w-1/2">
        <p v-if="createdEvents.length <= 0" class="text-black dark:text-white">Sin eventos creados</p>
        <p class="text-xl font-semibold mb-2">Tus eventos creados</p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <EventCard
            v-for="event in createdEvents"
            :key="event.id"
            :event="event"
            @details="openDetailsModal(event.id)"
          />
        </div>
      </section>

      <section v-if="invitedEvents.length > 0" class="w-1/2">
        <p v-if="invitedEvents.length <= 0" class="text-black dark:text-white">Sin eventos creados</p>
        <p class="text-xl font-semibold mb-2">
          Eventos a los que estas invitado
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <EventCard
            v-for="event in invitedEvents"
            :key="event.id"
            :event="event"
            @details="openDetailsModal(event.id)"
          />
        </div>
      </section>
    </div>
    <!-- Mensaje si no hay eventos -->
    <p v-if="createdEvents.length === 0 && invitedEvents.length === 0" class="text-black dark:text-white">
      No tienes eventos creados ni invitaciones pendientes.
    </p>
    <button
      @click="openCreateModal"
      class="fixed cursor-pointer bottom-5 right-5 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark"
    >
      <span class="text-2xl font-bold"><PlusIcon class="size-8 stroke-3"/></span>
    </button>
    <Dialog
      v-model:visible="isModalVisible"
      modal
      header="Crear Evento"
      :style="{ width: '500px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="rounded-lg overflow-hidden [&_.p-dialog-content]:bg-cpnDark [&_.p-dialog-header]:bg-cpnDark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
      <Form v-if="modalMode === 'create'" @submit="submitCreateForm" />
    </Dialog>

    <Dialog
      v-model:visible="isDetailsVisible"
      modal
      header="Detalles del evento"
      :style="{ width: '500px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="rounded-lg overflow-hidden [&_.p-dialog-content]:bg-cpnDark [&_.p-dialog-header]:bg-cpnDark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
      <DetailsEventView :eventId="selectedEvent || 0" @eventUpdated="updateEventInList" @eventDeleted="closeDetailsModal"/>
    </Dialog>
  </main>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/Event/event";
import EventCard from "@/components/Event/EventCard.vue";
import type { Event } from "@/interfaces/Event/event";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Form from "@/components/Event/Form.vue";
import Dialog from "primevue/dialog";
import { PlusIcon } from "@heroicons/vue/24/outline";
import DetailsEventView from "./Event/DetailsEventView.vue";

const roueter = useRouter();
const events = useEventStore();
const createdEvents = ref<Event[]>([]);
const invitedEvents = ref<Event[]>([]);
const isModalVisible = ref(false);
const isDetailsVisible = ref(false);
const modalTitle = ref("");
const modalMode = ref<"create" | "edit">("create");
const selectedEvent = ref<number | null>(null); // Can be null initially

const openCreateModal = () => {
  modalTitle.value = "Crear Evento";
  modalMode.value = "create";
  isModalVisible.value = true;
};

const openDetailsModal = (eventId: number) => {
  selectedEvent.value = eventId;
  isDetailsVisible.value = true;
};

const closeDetailsModal = async () => {
  isDetailsVisible.value = false;
  selectedEvent.value = null;
  await fetchEvents();
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedEvent.value = null;
};
const updateEventInList = (updatedEvent: Event) => {
  const index = createdEvents.value.findIndex((e) => e.id === updatedEvent.id);
  if (index !== -1) {
    createdEvents.value[index] = updatedEvent;
  }
  const invitedIndex = invitedEvents.value.findIndex(
    (e) => e.id === updatedEvent.id
  );
  if (invitedIndex !== -1) {
    invitedEvents.value[invitedIndex] = updatedEvent;
  }
};

const submitCreateForm = async (event: Event) => {
  try {
    const response = await events.actions.createEvent(event);
    console.log(response);
    closeModal();
    await fetchEvents();
  } catch (error) {
    console.error("Error al crear el evento:", error);
  }
};

const fetchEvents = async () => {
  try {
    const response = await events.actions.getAllEvents();
    if (response?.status === 200) {
      createdEvents.value = events.state.events;
    }
    const invitations = await events.actions.GetEventByInvitation();
    if (invitations?.status === 200 && invitations.data.length >= 1) {
      invitedEvents.value.push(...invitations.data);
    }
  } catch (error) {
    console.log(error);
  }
};


onMounted(() => {
  fetchEvents();
});
</script>
