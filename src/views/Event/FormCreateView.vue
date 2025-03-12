<template>
  <div class="text-white space-y-5 font-poppins">
    <h2 class="text-2xl font-bold">Crea un evento</h2>
    <p class="text-sm">Ingresa la siguiente información</p>
    <Form @submit="submitForm" />
  </div>
</template>
<script lang="ts" setup>
import Form from "@/components/Event/Form.vue";
import type { Event } from "@/interfaces/Event/event";
import { useRouter } from "vue-router";

const router = useRouter();

const submitForm = (event: Event) => {
  console.log("Form submitted", event);
    router.push("/");
};
</script>
