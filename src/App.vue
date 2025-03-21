<script setup lang="ts">
import Toast from "primevue/toast";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layouts/AuthLayout.vue";
import AppLayout from "./Layouts/AppLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout == "AuthLayout" ? AuthLayout : AppLayout;
});
</script>

<template>
  <div class="bg-Dark px-6 min-h-screen">
    <Toast />
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>
