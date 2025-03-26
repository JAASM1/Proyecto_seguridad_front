<template>
  <div class="not-found">
    <div class="content">
      <i class="pi pi-exclamation-triangle icon"></i>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <p class="text-sm">En un momento te regresamos 😊</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token && token !== "{}" && token !== "null" && token !== "undefined";
};


const redirect = () => {
  router.back();
};

onMounted(() => {
  if (!isAuthenticated()) {
    setTimeout(() => {
      redirect();
    }, 5000);
  }
});
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #030712;
  color: #fff;
}

.content {
  padding: 30px;
  border-radius: 12px;
  background: #111827;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 4rem;
  color: #ff4a4a;
  margin-bottom: 15px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #cbd5e1;
}
</style>
