<template>
  <div class="flex justify-center items-center min-h-screen bg-cnpDark">
    <Card class="w-[400px] shadow-lg">
      <template #title>
        <h2 class="text-center text-xl font-semibold">Recuperar Contraseña</h2>
        <p class="text-center text-lg font-semibold">Por favor, ingresa tu correo electrónico</p>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <span class="p-input-icon-left">
            <i class="pi pi-envelope"></i>
            <InputText v-model="email" type="email" placeholder="Correo electrónico" required class="w-full" />
          </span>
          <Button :disabled="loading" @click="handleForgotPassword" label="Enviar" class="w-full" />
          <RouterLink to="/login" class="text-red-600 hover:underline"
          >Cancelar</RouterLink>
          <Message v-if="message" severity="info">
            {{ message }}
            <a href="/ResetPassword" class="text-blue-600 underline">Actualizar contraseña</a>
          </Message>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { forgotPassword } from "@/services/Auth/Auth";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";

const email = ref("");
const message = ref("");
const loading = ref(false);

const handleForgotPassword = async () => {
  loading.value = true;
  try {
    await forgotPassword(email.value);
    message.value = "Correo enviado. Revisa tu bandeja de entrada.";
  } catch (error) {
    message.value = "Error al enviar el correo.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>