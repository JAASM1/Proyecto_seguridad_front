import { LogService } from "@/services/LogService/logService";
import { getEventsByUser, postEvent } from "@/services/Event/eventService";
import type { Event } from "@/interfaces/Event/event";

import { defineStore } from "pinia";
import { reactive } from "vue";

export const useEventStore = defineStore("event", () => {
  const state = reactive({
    events: [] as Event[],
    loading: false,
    error: null as string | null,
  });

  const actions = {
    async fetchEvents() {
      state.loading = true;
      try {
        const response = await getEventsByUser();
        state.events = response?.data || [];
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error fetching events", error);
      } finally {
        state.loading = false;
      }
    },
    async createEvent(event: Event) {
      state.loading = true;
      try {
        const data = {
          ...event,
          date: event.EventDateTime?.toISOString(),
          idOrganizer: 1,
        };
        await postEvent(data);
        state.events.push(event);
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error creating event", error);
      } finally {
        state.loading = false;
      }
    },
  };

  return { state, actions };
});
