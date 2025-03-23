import type { Iuser, Iuserlogin } from "@/interfaces/user/user";
import { genericRequest } from "@/utils/genericRequest";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}auth`

export const login = async(sesion : Iuserlogin) => {
    return await genericRequest(`${BASE_URL}/login`, 'post', {
        email: sesion.email,
        password: sesion.password,
    })
}

export const register = async(registe : Iuser) => {
    return await genericRequest(`${BASE_URL}/register`, 'post', {
        name: registe.name,
        email: registe.email,
        password: registe.password,
    })
}

export const isAuthenticated = () =>{
    const token = localStorage.getItem("token");
     return token !== null && token !== "" && token !== "{}";
}

export const logout = () =>{
    localStorage.removeItem("token");
}