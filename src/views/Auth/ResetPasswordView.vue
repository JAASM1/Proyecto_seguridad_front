<template>
  <div class="container">
    <h2>Restablecer Contraseña</h2>
    <input v-model="newPassword" type="password" placeholder="Nueva contraseña" required />
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
const message = ref("");
const loading = ref(false);
let token = "";
let email = "";

onMounted(() => {
  token = route.query.token as string || "";
});

const handleResetPassword = async () => {
  loading.value = true;
  try {
    await resetPassword(email, token, newPassword.value);
    message.value = "Contraseña actualizada. Redirigiendo al login...";
    setTimeout(() => router.push("/login"), 3000);
  } catch (error) {
    message.value = "Error al restablecer la contraseña.";
  } finally {
    loading.value = false;
  }
};
</script>