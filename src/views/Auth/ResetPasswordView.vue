<template>
  <div class="container bg-white">
    <h2>Restablecer Contraseña</h2>
    <input v-model="newPassword" type="password" placeholder="Nueva contraseña" required />
    <input v-model="token" type="text" placeholder="Token" required/>
    <input v-model="email" type="text" placeholder="Email" required/>
    <button :disabled="loading" @click="handleResetPassword">Actualizar</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "@/services/Auth/Auth";
const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const email = ref("");
const token = ref("");
const message = ref("");
const loading = ref(false);


const handleResetPassword = async () => {
  loading.value = true;
  try {
    await resetPassword(email.value, token.value, newPassword.value);
    message.value = "Contraseña actualizada. Redirigiendo al login...";
    setTimeout(() => router.push("/login"), 3000);
  } catch (error) {
    message.value = "Error al restablecer la contraseña.";
  } finally {
    loading.value = false;
  }
};
</script>