import { LogService } from "@/services/LogService/logService";
import {
  getEventsByUser,
  postEvent,
  getEventById,
  putEvent,
  deleteEvent,
  CreateInvitation,
  getEventByInvitation,
} from "@/services/Event/eventService";
import type { Event, EventForm } from "@/interfaces/Event/event";

import { defineStore } from "pinia";
import { reactive } from "vue";
import { useUserStore } from "../auth/user";

export const useEventStore = defineStore("event", () => {
  const auth = useUserStore();
  const state = reactive({
    events: [] as Event[],
    loading: false,
    error: null as string | null,
  });

  const idUser = auth.getUserIdFromToken();

  const actions = {
    async getAllEvents() {
      state.loading = true;
      try {
        const response = await getEventsByUser(idUser);
        state.events = response?.data || [];
        console.log(idUser);
        return response;
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error fetching events", error);
      } finally {
        state.loading = false;
      }
    },

    async GetEventByInvitation() {
      state.loading = true;
      try {
        const response = await getEventByInvitation(idUser);
        state.events = response?.data || [];
        return response;
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error fetching event", error);
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
          idOrganizer: idUser,
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

    async updateEvent(id: number, event: Omit<Event, "id">) {
      state.loading = true;
      try {
        const data = {
          ...event,
          eventDateTime: event.eventDateTime?.toISOString(),
        };
        const response = await putEvent(id, data);
        if (response && response.status === 200) {
          const index = state.events.findIndex((e) => e.id === id);
          if (index !== -1) {
            state.events[index] = { ...state.events[index], ...event };
          }
          return response;
        } else {
          throw new Error("Error al actualizar el evento");
        }
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error updating event", error);
        throw error;
      } finally {
        state.loading = false;
      }
    },

    async destroyEvent(id: number) {
      state.loading = true;
      try {
        const response = await deleteEvent(id);
        if (response && response.status === 200) {
          // Hacer esto es incorrecto. Joshua Romero.
          // Es mala practica jugar con el arreglo. Es mejor recargar el arreglo principal
          // llamando al GetEventsAll y recargando al estado global de la aplicacion porque
          // si ocurre un error habras eliminado para el usuario este y tambien le habras quitado
          // al arreglo y aun asi cuando recargue se verá.
          const index = state.events.findIndex((e) => e.id === id);
          if (index !== -1) {
            state.events.splice(index, 1);
          }
          return response;
        } else {
          throw new Error("Error al cancelar el evento");
        }
      } catch (error: any) {
        state.error = error.message;
        await LogService.log("error", "Error deleting event", error);
        throw error;
      } finally {
        state.loading = false;
      }
    },

    async CreateInvitationStore(idEvent: number, idUser: number) {
      try {
        state.loading = true;
        const response = await CreateInvitation(idEvent, idUser);
        return response;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error estándar:", error.message);
        } else {
          console.log("Error no estándar:", error);
        }
      }
    },
  };

  return { state, actions };
});
