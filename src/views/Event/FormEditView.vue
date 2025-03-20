<template>
  <div class="text-white space-y-5 font-poppins flex flex-col items-center">
    <Toast />
    <div class="space-y-3 w-full max-w-lg">
      <h2 class="text-2xl font-bold">Editar evento</h2>
      <p class="text-sm">Modifica y guarda la información</p>
    </div>
    <Form v-if="event" :event="event" @submit="submitForm" />
  </div>
</template>
<script lang="ts" setup>
import { useEventStore } from "@/stores/Event/event";
import { useRouter } from "vue-router";

import Form from "@/components/Event/Form.vue";
import Toast from "primevue/toast";
import type { Event } from "@/interfaces/Event/event";
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";

const toast = useToast();
const eventStore = useEventStore();
const router = useRouter();

const eventId = Number(router.currentRoute.value.params.id);
const event = ref<Event>();

onMounted(async () => {
  const eventFound = await eventStore.actions.getEvent(eventId);
  if (!eventFound) {
    router.push("/");
    return;
  }
  event.value = eventFound.data;
});

const submitForm = async (eventData: Omit<Event, "id">) => {
  console.log("Evento a enviar: ", event);

  try {
    const response = await eventStore.actions.updateEvent(eventId, eventData);
    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
      router.push("/");
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Message Content",
      life: 3000,
    });
    console.error("Error al enviar el evento: ", error);
  }
};
</script>
