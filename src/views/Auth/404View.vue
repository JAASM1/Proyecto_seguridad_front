<template>
    <div class="not-found">
      <div class="content">
        <i class="pi pi-exclamation-triangle icon"></i>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <Button label="Ir al Login" icon="pi pi-sign-in" severity="primary" :link="true">
          <a href="/login"></a>
        </Button>
      </div>
    </div>
  </template>
  
  <script setup>
  import Button from "primevue/button";
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
  }
  
  .content {
    padding: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 4rem;
    color: #ff4a4a;
    margin-bottom: 10px;
  }
  
  h1 {
    font-size: 2rem;
    color: #333;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
  
  a {
    text-decoration: none;
    color: white;
  }
  </style>  