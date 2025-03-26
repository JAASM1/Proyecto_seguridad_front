<template>
  <main class="text-white space-y-3">
    <h1 class="text-2xl font-bold">Eventos</h1>

    <div class="flex w-full gap-10">
      <section v-if="createdEvents.length > 0" class="w-1/2">
        <p v-if="createdEvents.length <= 0">Sin eventos creados</p>
        <p class="text-xl font-semibold mb-2">Tus eventos creados</p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <EventCard
            v-for="event in createdEvents"
            :key="event.id"
            :event="event"
            @details="detailsEvent(event.id)"
          />
        </div>
      </section>

      <section v-if="invitedEvents.length > 0" class="w-1/2">
        <p v-if="invitedEvents.length <= 0">Sin eventos creados</p>
        <p class="text-xl font-semibold mb-2">
          Eventos a los que estas invitado
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <EventCard
            v-for="event in invitedEvents"
            :key="event.id"
            :event="event"
            @details="detailsEvent(event.id)"
          />
        </div>
      </section>
    </div>
    <!-- Mensaje si no hay eventos -->
    <p v-if="createdEvents.length === 0 && invitedEvents.length === 0">
      No tienes eventos creados ni invitaciones pendientes.
    </p>
  </main>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/Event/event";
import EventCard from "@/components/Event/EventCard.vue";
import type { Event } from "@/interfaces/Event/event";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const roueter = useRouter();
const events = useEventStore();
const createdEvents = ref<Event[]>([]);
const invitedEvents = ref<Event[]>([]);

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

const detailsEvent = (id: number) => roueter.push(`/detalles-evento/${id}`);

onMounted(() => {
  fetchEvents();
});
</script>
