<template>
  <main class="text-white space-y-3">
    <h1 class="text-2xl font-bold">Eventos</h1>
    <p v-if="itemEvents.length <= 0">Sin eventos</p>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <EventCard
        v-for="event in itemEvents"
        :key="event.id"
        :event="event"
        @details="detailsEvent(event.id)"
      />
    </div>
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
const itemEvents = ref<Event[]>([]);

const fetchEvents = async () => {
  try {
    const response = await events.actions.getAllEvents();
    if (response?.status === 200) {
      itemEvents.value = events.state.events;
    }
  } catch (error) {
    console.log(error);
  }
};


// const editEvent = (id: number) => roueter.push(`/editar-evento/${id}`);
const detailsEvent = (id: number) => roueter.push(`/detalles-evento/${id}`);

onMounted(() => {
  fetchEvents();
});
</script>
