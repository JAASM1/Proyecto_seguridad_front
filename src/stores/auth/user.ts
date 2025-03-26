import type { Iauth, Iuser, Iuserlogin } from "@/interfaces/user/user";
import { login, logout, register } from "@/services/Auth/Auth";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("auth", () => {
  const auth = useStorage("token", {} as Iauth);
  const router = useRouter();

  async function LoginStore(sesion: Iuserlogin) {
    const response = await login(sesion);
    if (response.data) {
      auth.value = response.data;
    }
  }

  async function RegisterStore(registe: Iuser) {
    const response = await register(registe);
    if (response.data) {
      auth.value = response.data;
    }
  }

  async function Logout() {
    await logout();
    router.push("/login");
  }

   function getUserIdFromToken(){
   const tokenData = localStorage.getItem("token");
   if (!tokenData) return null;
 
   try {
     const { refreshToken } = JSON.parse(tokenData);
     const tokenParts = refreshToken.split(".");
     
     if (tokenParts.length !== 3) return null;
 
     const payload = JSON.parse(atob(tokenParts[1]));
     return payload.Id || null;
   } catch (error) {
     console.error("Error al decodificar el token:", error);
     return null;
   }
 }; 

  return { LoginStore, RegisterStore, auth, Logout, getUserIdFromToken };
});
