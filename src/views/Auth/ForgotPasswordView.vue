<template>
  <div class="container bg-white">
    <h2>Recuperar Contraseña</h2>
    <input v-model="email" type="email" placeholder="Correo electrónico" required />
    <button :disabled="loading" @click="handleForgotPassword">Enviar</button>
    <p v-if="message">{{ message }} 
      <a href="/ResetPassword">Actualizar contraseña</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { forgotPassword } from "@/services/Auth/Auth";

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
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>