import type { Iauth, Iuser, Iuserlogin } from "@/interfaces/user/user";
import { login, register } from "@/services/Auth/Auth";
import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore("auth", () => {
    const auth = useStorage("token", {} as Iauth)

    async function LoginStore(sesion:Iuserlogin) {
       const response = await login(sesion);
       if (response.data) {
        auth.value = response.data
       }
    }

    async function RegisterStore(registe:Iuser) {
        const response = await register(registe);
        if (response.data) {
        auth.value = response.data
        }
     }

     return {LoginStore, RegisterStore, auth}
})