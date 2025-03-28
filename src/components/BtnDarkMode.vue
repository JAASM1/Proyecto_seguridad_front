<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
const isDark = ref(false);

onMounted(() => {
  // Verificar si el usuario tiene una preferencia guardada
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.documentElement.classList.toggle("dark", isDark.value);
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  // Guardar la preferencia en localStorage
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="p-2 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
  >
    <span v-if="isDark"><SunIcon class="size-5" /></span>
    <span v-else><MoonIcon class="size-5" /></span>
  </button>
</template>
