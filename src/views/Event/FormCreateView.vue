<template>
  <div class="text-white space-y-5 font-poppins">
    <h2 class="text-2xl font-bold">Crea un evento</h2>
    <p class="text-sm">Ingresa la siguiente información</p>
    <Form @submit="submitForm" />
  </div>
</template>
<script lang="ts" setup>
import { useEventStore } from "@/stores/Event/event";
import { useRouter } from "vue-router";

import Form from "@/components/Event/Form.vue";
import type { Event } from "@/interfaces/Event/event";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const eventStore = useEventStore();
const router = useRouter();

const submitForm = (event: Event) => {
  try {
    eventStore.actions.createEvent(event);
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
    // router.push("/");
  } catch (error) {
    console.error("Error al enviar el evento: ", error);
  }
};
</script>
