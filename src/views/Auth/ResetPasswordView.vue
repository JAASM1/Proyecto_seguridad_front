<template>
  <div class="flex justify-center items-center min-h-screen bg-cnpDark">
    <Card class="w-[400px] shadow-lg">
      <template #title>
        <h2 class="text-center text-xl font-semibold">Restablecer Contraseña</h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <span class="p-input-icon-left">
            <i class="pi pi-lock"></i>
            <Password v-model="newPassword" toggleMask placeholder="Nueva contraseña" class="w-full" />
          </span>
          <span class="p-input-icon-left">
            <i class="pi pi-key"></i>
            <InputText v-model="token" type="text" placeholder="Token" class="w-full" required />
          </span>
          <span class="p-input-icon-left">
            <i class="pi pi-envelope"></i>
            <InputText v-model="email" type="email" placeholder="Correo electrónico" class="w-full" required />
          </span>
          <Button :disabled="loading" @click="handleResetPassword" label="Actualizar" class="w-full" />
          <Message v-if="message" severity="info">{{ message }}</Message>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "@/services/Auth/Auth";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";

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

<style scoped>
</style>