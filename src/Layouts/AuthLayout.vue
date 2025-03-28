<template>
  <div class="flex flex-col justify-center items-center h-screen w-full gap-5">
    <div class="text-white text-center space-y-2">
      <h1 class="text-5xl font-semibold">Evnto</h1>
      <p class="text-xl">Bienvenido a la plataforma de eventos</p>
    </div>
    <main class="w-full flex justify-center">
      <router-view />
    </main>
  </div>
</template>
