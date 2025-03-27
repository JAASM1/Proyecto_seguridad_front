<template>
  <div
    class="text-white space-y-5 font-poppins flex-col pb-5 min-h-screen flex items-center justify-center"
  >
  <div class="text-center space-y-2">
    <h1 class="text-5xl font-bold">¡Felicidades!</h1>
    <p class="text-xl font-semibold">Estas invidato a la fiesta</p>
    <p>Acepta la invitacion para poder asistir</p>
  </div>

    <div class="w-1/3 space-y-5 border p-8 rounded-lg">
      <div class="space-y-3 w-full rounded-lg">
        <h2 class="text-2xl font-bold">{{ event?.name }}</h2>
        <DetailsEvent
          v-if="event"
          title="Descripción"
          :body="event.description"
        />
        <DetailsEvent
          v-if="event"
          title="Fecha y hora"
          :body="formatDate(event.eventDateTime)"
        />
        <DetailsEvent v-if="event" title="Ubicación" :body="event.location" />
      </div>
      <div class="flex w-full justify-between gap-5">
        <button
          @click="register"
          class="bg-teal-500 w-full hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Aceptar
        </button>
        <button
          @click="rechazarInvitacion"
          class="bg-gray-500 w-full hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Rechazar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de Login -->
  <div
    v-if="modalAbierto && isLogin"
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs"
  >
    <div class="w-full max-w-md p-8 bg-cpnDark rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-2">Inicia sesión</h2>
      <p class="text-gray-400 mb-6">Por favor ingresa tus credenciales</p>
      <Form @submit="submitLogin">
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
        <div class="flex justify-between mt-4">
          <button
            type="submit"
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2"
          >
            Iniciar sesión
          </button>
          <button
            @click="cerrarModal"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          >
            Cancelar
          </button>
        </div>
      </Form>
      <p class="text-gray-400 mt-4 text-center">
        ¿No tienes cuenta?
        <button @click="isLogin = false" class="text-teal-500 hover:underline">
          Regístrate aquí
        </button>
      </p>
    </div>
  </div>

  <!-- Modal de Registro -->
  <div
    v-if="modalAbierto && !isLogin"
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs"
  >
    <div class="w-full max-w-md p-8 bg-cpnDark rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-2">Crea tu cuenta</h2>
      <p class="text-gray-400 mb-6">Por favor llena los siguientes campos</p>
      <Form @submit="submitRegister" :validation-schema="RegisterValidation">
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
        <div class="flex justify-between mt-4">
          <button
            type="submit"
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2"
          >
            Crear cuenta
          </button>
          <button
            @click="cerrarModal"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          >
            Cancelar
          </button>
        </div>
      </Form>
      <p class="text-gray-400 mt-4 text-center">
        ¿Ya tienes cuenta?
        <button @click="isLogin = true" class="text-teal-500 hover:underline">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  </div>
  <!-- Alerta Notificación -->
  <div
    v-if="alerta.mostrar"
    :class="[
      'fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all',
      alerta.tipo === 'error' ? 'bg-red-500' : 'bg-teal-500',
    ]"
  >
    <p class="text-white font-semibold">{{ alerta.mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import DetailsEvent from "@/components/Event/DetailsEvent.vue";
import { genericRequest } from "@/utils/genericRequest";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Event } from "@/interfaces/Event/event";
import { formatDate } from "@/utils/dateUtils";
import { isAuthenticated } from "@/services/Auth/Auth";
import { useUserStore } from "@/stores/auth/user";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
import type { Iauth, Iuser, IUserRegister } from "@/interfaces/user/user";
import { RegisterValidation } from "@/Validations/Auth/authValidation";
import { useEventStore } from "@/stores/Event/event";

const userStore = useUserStore();
const eventStore = useEventStore();
const route = useRoute();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const isLogin = ref(true);

const event = ref<Event>({} as Event);

onMounted(async () => {
  await GetEvent(route.params.token);
});

async function GetEvent(id: any) {
  const response = await genericRequest(
    `https://localhost:7161/api/Event/GetEventByToken/${id}`,
    "get"
  );
  event.value = response.data;
}

const modalAbierto = ref(false);
const alerta = ref({ mostrar: false, mensaje: "", tipo: "success" });

const abrirModalRegistro = () => {
  modalAbierto.value = true;
};

const cerrarModal = () => {
  modalAbierto.value = false;
};

interface ResponseHelper {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const register = async () => {
  try {
    if (!isAuthenticated()) {
      abrirModalRegistro();
      return;
    }

    const idUser = userStore.getUserIdFromToken();
    const result = await eventStore.actions.CreateInvitationStore(
      event.value.id,
      idUser
    );

    if (result?.status === 200) {
      Swal.fire({
        title: "Invitación Aceptada Correctamente",
        text: "Tu cuenta se ha enlazado con la invitación",
        icon: "success",
        showConfirmButton: false,
        showCancelButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      router.push("/");
    } else {
      Swal.fire({
        title: "Invitación No Aceptada Correctamente",
        text: "Tu cuenta no se ha enlazado con la invitación",
        icon: "error",
        showConfirmButton: false,
        showCancelButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    Swal.fire({
      title: "Error en el registro",
      text: "Hubo un problema, intenta nuevamente",
      icon: "error",
      confirmButtonColor: "#e53e3e",
    });
  }
};

interface LoginForm {
  email: string;
  password: string;
}
const submitLogin = async (values: LoginForm) => {
  try {
    await userStore.LoginStore(values);
    Swal.fire({
      title: "¡Inicio de sesión exitoso!",
      text: "Has iniciado sesión correctamente",
      icon: "success",
      confirmButtonColor: "#38b2ac",
    });
    const idUser = userStore.getUserIdFromToken();
    await eventStore.actions.CreateInvitationStore(event.value.id, idUser);

    router.push("/");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    Swal.fire({
      title: "Error al iniciar sesión",
      text: "Credenciales incorrectas, intenta nuevamente",
      icon: "error",
      confirmButtonColor: "#e53e3e",
    });
  }
};

const submitRegister = async () => {
  try {
    let register: Iuser = {
      id: 0,
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const response = await userStore.RegisterStore(register);
    const castResponse = response.data as ResponseHelper;
    Swal.fire({
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente",
      icon: "success",
      confirmButtonColor: "#38b2ac",
    });

    await eventStore.actions.CreateInvitationStore(
      event.value.id,
      castResponse.user.id
    );

    router.push("/login");
  } catch (error) {
    console.error("Error en el registro:", error);
    Swal.fire({
      title: "Error en el registro",
      text: "Hubo un problema, intenta nuevamente",
      icon: "error",
      confirmButtonColor: "#e53e3e",
    });
  }
};

const rechazarInvitacion = () => {
  const isAuth = isAuthenticated();

  const mensaje = isAuth
    ? "Has rechazado la invitación. Serás redirigido al inicio."
    : "Has rechazado la invitación. Serás redirigido al login.";

  mostrarAlerta(mensaje, "error");

  setTimeout(() => {
    window.location.href = isAuth ? "/" : "/login";
  }, 2000);
};

const mostrarAlerta = (mensaje: string, tipo: string = "success") => {
  alerta.value = { mostrar: true, mensaje, tipo };
  setTimeout(() => {
    alerta.value.mostrar = false;
  }, 3000);
};
</script>
