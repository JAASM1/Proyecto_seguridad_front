<template>
  <main class="text-white space-y-3">
    <h1 class="text-2xl font-bold">Eventos</h1>
    <EventCard v-for="event in itemEvents" :key="event.id" :event="event" />
  </main>
</template>

<script setup lang="ts">
import { useEventStore } from "@/stores/Event/event";
import EventCard from "@/components/Event/EventCard.vue";
import type { Event } from "@/interfaces/Event/event";
import { onMounted, ref } from "vue";

const events = useEventStore();
const itemEvents = ref<Event[]>([]);

const fetchEvents = async () => {
  try {
    const response = await events.actions.getAllEvents();
    if (response?.status === 200) {
      itemEvents.value = events.state.events;
      console.log(itemEvents.value);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchEvents();
});
</script>
