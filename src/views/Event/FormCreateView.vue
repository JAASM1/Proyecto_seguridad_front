<template>
  <div class="text-white space-y-5 font-poppins">
    <Toast />
    <h2 class="text-2xl font-bold">Crea un evento</h2>
    <p class="text-sm">Ingresa la siguiente información</p>
    <Form @submit="submitForm" />
  </div>
</template>
<script lang="ts" setup>
import { useEventStore } from "@/stores/Event/event";
import { useRouter } from "vue-router";

import Form from "@/components/Event/Form.vue";
import Toast from "primevue/toast";
import type { Event } from "@/interfaces/Event/event";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const eventStore = useEventStore();
const router = useRouter();

const submitForm = async (event: Event) => {
  try {
    const response = await eventStore.actions.createEvent(event);
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
