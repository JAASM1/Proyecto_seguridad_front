import { LogService } from "@/services/LogService/logService";
import { getEventsByUser, postEvent, getEventById } from "@/services/Event/eventService";
import type { Event } from "@/interfaces/Event/event";

import { defineStore } from "pinia";
import { reactive } from "vue";

const idUser = 1;
export const useEventStore = defineStore("event", () => {
  const state = reactive({
    events: [] as Event[],
    loading: false,
    error: null as string | null,
  });

  const actions = {
    async getAllEvents() {
      state.loading = true;
      try {
        const response = await getEventsByUser(idUser);
        state.events = response?.data || [];
        return response;
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error fetching events", error);
      } finally {
        state.loading = false;
      }
    },

    async getEvent(id: number) {
      state.loading = true;
      try {
        const response = await getEventById(id);
        return response;
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error fetching event", error);
      } finally {
        state.loading = false;
      }
    },

    async createEvent(event: Event) {
      state.loading = true;
      try {
        const data = {
          ...event,
          eventDateTime: event.eventDateTime?.toISOString(),
          idOrganizer: 1,
        };
        const response = await postEvent(data);

        if (response && response.status === 200) {
          state.events.push(event);
          return response;
        } else {
          throw new Error("Error al crear el evento");
        }
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error creating event", error);
        throw error;
      } finally {
        state.loading = false;
      }
    },
  };

  return { state, actions };
});
