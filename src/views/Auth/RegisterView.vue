<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8 bg-cpnDark rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-2">Crea tu cuenta</h2>
      <p class="text-gray-400 mb-6">Por favor llena los siguientes campos</p>

      <Form @submit="register" :validation-schema="RegisterValidation">
        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Nombre completo</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <i class="fas fa-user"></i>
            <Field
              v-model="name"
              type="text"
              id="name"
              name="name"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Nombre completo"
              required
            />
          </div>
          <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Correo</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <i class="fas fa-envelope"></i>
            <Field
              v-model="email"
              type="email"
              id="email"
              name="email"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Correo"
              required
            />
          </div>
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Contraseña</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <i class="fas fa-lock"></i>
            <Field
              v-model="password"
              type="password"
              id="password"
              name="password"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Contraseña"
              required
            />
          </div>
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-400 mb-1">Repite tu contraseña</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <i class="fas fa-sync-alt"></i>
            <Field
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Repite tu contraseña"
              required
            />
          </div>
          <ErrorMessage name="confirmPassword" class="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          class="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition cursor-pointer"
        >
          Crear cuenta
        </button>
      </Form>

      <p class="text-gray-400 text-center mt-4">
        ¿Ya tienes una cuenta?
        <a href="/login" class="text-teal-400 hover:underline">Inicia sesión</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RegisterValidation } from "@/Validations/Auth/authValidation";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const register = (values: RegisterForm) => {
  console.log(values);
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
</style>
