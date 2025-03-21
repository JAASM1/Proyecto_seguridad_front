<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8 bg-cpnDark rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-2">Crea tu cuenta</h2>
      <p class="text-gray-400 mb-6">Por favor llena los siguientes campos</p>
      
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Nombre completo</label>
          <div class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2">
            <i class="fas fa-user"></i>
            <input v-model="name" type="text" class="bg-transparent focus:outline-none ml-2 w-full" placeholder="Nombre completo" required>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Correo</label>
          <div class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2">
            <i class="fas fa-envelope"></i>
            <input v-model="email" type="email" class="bg-transparent focus:outline-none ml-2 w-full" placeholder="Correo" required>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-400 mb-1">Contraseña</label>
          <div class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2">
            <i class="fas fa-lock"></i>
            <input v-model="password" type="password" class="bg-transparent focus:outline-none ml-2 w-full" placeholder="Contraseña" required>
          </div>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-400 mb-1">Repite tu contraseña</label>
          <div class="flex items-center bg-gray-800 text-gray-300 rounded-lg px-3 py-2">
            <i class="fas fa-sync-alt"></i>
            <input v-model="confirmPassword" type="password" class="bg-transparent focus:outline-none ml-2 w-full" placeholder="Repite tu contraseña" required>
          </div>
        </div>
        
        <button type="submit" class="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition">
          Crear cuenta
        </button>
      </form>
      
      <p class="text-gray-400 text-center mt-4">¿Ya tienes una cuenta? <a href="/login" class="text-teal-400 hover:underline">Inicia sesión</a></p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert('Registro exitoso');
    }
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
</style>
