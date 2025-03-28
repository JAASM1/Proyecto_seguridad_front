<script setup lang="ts">
import Toast from "primevue/toast";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layouts/AuthLayout.vue";
import AppLayout from "./Layouts/AppLayout.vue";
import Invilatout from "./Layouts/Invilatout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "AuthLayout") {
    return AuthLayout;
  } else if (route.meta.layout === "InvitationLayout") {
    return Invilatout;
  } else {
    return AppLayout;
  }
});
</script>

<template>
  <div class="bg-bgWhite dark:bg-Dark px-6 min-h-screen">
    <Toast />
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>
