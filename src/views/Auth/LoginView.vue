<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8 bg-cpnDark rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-2">Iniciar sesión</h2>
      <p class="text-gray-400 mb-6">Por favor llena los siguientes campos</p>

      <Form @submit="login" :validation-schema="loginValidation">
        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Correo</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <EnvelopeIcon class="h-5 w-5" />
            <Field
              v-model="email"
              id="email"
              name="email"
              type="email"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Correo"
            />
          </div>
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-400 mb-1">Contraseña</label>
          <div
            class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2"
          >
            <LockClosedIcon class="h-5 w-5" />
            <Field
              v-model="password"
              id="password"
              name="password"
              type="password"
              class="bg-transparent focus:outline-none ml-2 w-full"
              placeholder="Contraseña"
            />
          </div>
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          class="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Iniciar sesión
        </button>
      </Form>

      <p class="text-gray-400 text-center mt-4">
        <a href="/RecoverPassword" class="text-teal-400 hover:underline"
          >¿Olvidaste tu contraseña?</a
        >
      </p>
      <p class="text-gray-400 text-center mt-2">
        ¿No tienes cuenta?
        <a href="/register" class="text-teal-400 hover:underline">Regístrate</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginValidation } from "@/Validations/Auth/authValidation";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/vue/24/outline";

const email = ref("");
const password = ref("");

interface FormValues {
  email: string;
  password: string;
}

const login = (value: FormValues) => {
  console.log(value.email, value.password);
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
</style>
