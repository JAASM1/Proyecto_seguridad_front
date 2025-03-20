<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div class="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-white text-center">Recuperar contraseña</h2>
        <p class="text-gray-400 text-center mb-6">
          Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
  
        <form @submit.prevent="recoverPassword">
          <div class="mb-4">
            <label class="block text-gray-400">Correo</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="ejemplo@correo.com"
              class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            >
          </div>
  
          <button 
            type="submit" 
            class="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-300"
          >
            Enviar enlace de recuperación
          </button>
        </form>
  
        <div class="text-center mt-4">
          <router-link to="/login" class="text-teal-400 hover:underline">
            Volver al inicio de sesión
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ""
      };
    },
    methods: {
      recoverPassword() {
        // Simulación de envío de recuperación (puedes integrar API aquí)
        alert(`Se ha enviado un enlace de recuperación a: ${this.email}`);
      }
    }
  };
  </script>
  