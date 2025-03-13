<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold">Evento</h2>
        <h3 class="text-lg text-gray-300">Nombre del evento</h3>
  
        <!-- Descripción -->
        <div class="bg-gray-700 p-4 rounded-lg mt-4">
          <h4 class="text-sm text-gray-400">Descripción</h4>
          <p class="text-sm text-gray-200">
            Donec non lacus ac ante sollicitudin tincidunt vitae id sem...
          </p>
        </div>
  
        <!-- Fecha y Hora -->
        <div class="grid grid-cols-2 gap-2 mt-4">
          <div class="bg-gray-700 p-3 rounded-lg">
            <h4 class="text-xs text-gray-400">Fecha</h4>
            <p class="text-sm text-gray-200">25 Mar 2025</p>
          </div>
          <div class="bg-gray-700 p-3 rounded-lg">
            <h4 class="text-xs text-gray-400">Hora</h4>
            <p class="text-sm text-gray-200">12:00 pm</p>
          </div>
        </div>
  
        <!-- Ubicación -->
        <div class="bg-gray-700 p-3 rounded-lg mt-2">
          <h4 class="text-xs text-gray-400">Ubicación</h4>
          <p class="text-sm text-gray-200">Av. Las torres 520 Residencial Aqua</p>
        </div>
  
        <!-- Botones -->
        <div class="flex justify-between mt-4">
          <button @click="aceptarInvitacion"
            class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2">
            Aceptar
          </button>
          <button @click="rechazarInvitacion"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2">
            Rechazar
          </button>
        </div>
      </div>
  
      <!-- Modal de Registro -->
      <div v-if="modalAbierto"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-lg font-bold border-b pb-2">Registrarse para aceptar la invitación</h2>
  
          <div class="mt-4">
            <label class="text-gray-300 text-sm">Nombre completo</label>
            <input v-model="nombre" type="text"
              class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400">
  
            <label class="text-gray-300 text-sm mt-3 block">Correo</label>
            <input v-model="email" type="email"
              class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400">
  
            <label class="text-gray-300 text-sm mt-3 block">Contraseña</label>
            <input v-model="password" type="password"
              class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400">
  
            <label class="text-gray-300 text-sm mt-3 block">Repetir Contraseña</label>
            <input v-model="confirmPassword" type="password"
              class="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 mt-1 focus:outline-none focus:border-teal-400">
          </div>
  
          <!-- Botones -->
          <div class="flex justify-between mt-4">
            <button @click="registrarse"
              class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2">
              Aceptar
            </button>
            <button @click="cerrarModal"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-1/2">
              Cancelar
            </button>
          </div>
        </div>
      </div>
  
      <!-- Alerta Notificación Arriba y Centrada -->
      <div v-if="alerta.mostrar"
        :class="['fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all', 
                 alerta.tipo === 'error' ? 'bg-red-500' : 'bg-teal-500']">
        <p class="text-white font-semibold">{{ alerta.mensaje }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        usuarioAutenticado: false,
        modalAbierto: false,
        alerta: { mostrar: false, mensaje: "", tipo: "success" },
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
    async mounted() {
      await this.verificarSesion();
    },
    methods: {
      async verificarSesion() {
        try {
          const response = await axios.get("http://localhost:5000/api/auth/verificar", {
            withCredentials: true,
          });
          this.usuarioAutenticado = response.data.autenticado;
        } catch (error) {
          this.usuarioAutenticado = false;
        }
      },
      aceptarInvitacion() {
        if (this.usuarioAutenticado) {
          this.enlazarConInvitacion();
        } else {
          this.modalAbierto = true;
        }
      },
      async registrarse() {
        if (!this.nombre || !this.email || !this.password || this.password !== this.confirmPassword) {
          this.mostrarAlerta("Todos los campos son obligatorios y las contraseñas deben coincidir.", "error");
          return;
        }
        try {
          await axios.post("http://localhost:5000/api/auth/register", {
            nombre: this.nombre,
            email: this.email,
            password: this.password,
          });
          this.mostrarAlerta("Registro exitoso. Ahora estás enlazado con la invitación.", "success");
          this.modalAbierto = false;
          this.enlazarConInvitacion();
        } catch (error) {
          this.mostrarAlerta("Error al registrarse.", "error");
        }
      },
      async enlazarConInvitacion() {
        try {
          await axios.post("http://localhost:5000/api/invitacion/aceptar", {}, { withCredentials: true });
          this.mostrarAlerta("¡Invitación aceptada y vinculada con tu cuenta!", "success");
        } catch (error) {
          this.mostrarAlerta("Error al aceptar la invitación.", "error");
        }
      },
      rechazarInvitacion() {
        this.mostrarAlerta("Has rechazado la invitación. Serás redirigido al login.", "error");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      },
      cerrarModal() {
        this.modalAbierto = false;
      },
      mostrarAlerta(mensaje, tipo = "success") {
        this.alerta = { mostrar: true, mensaje, tipo };
        setTimeout(() => {
          this.alerta.mostrar = false;
        }, 3000);
      },
    },
  };
  </script>
  