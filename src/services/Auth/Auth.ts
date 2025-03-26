import type { Iuser, Iuserlogin } from "@/interfaces/user/user";
import { genericRequest } from "@/utils/genericRequest";
import { jwtDecode } from "jwt-decode";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}auth`

export const login = async(sesion : Iuserlogin) => {
    return await genericRequest(`${BASE_URL}/login`, 'post', {
        email: sesion.email,
        password: sesion.password,
    })
};

export const register = async(registe : Iuser) => {
    return await genericRequest(`${BASE_URL}/register`, 'post', {
        name: registe.name,
        email: registe.email,
        password: registe.password,
    })
};

export const isAuthenticated = () =>{
    const token = localStorage.getItem("token") ?? "";

    if (!token) return false;
        try{
            const decoded: any = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now()) {
                logout();
                return false;
            }
            return true;
        }catch (error){
            logout();
            return false;
        }
};

export const logout = () =>{
    localStorage.removeItem("token");
};

export const forgotPassword = async (email: string) => {
    return await genericRequest(`${BASE_URL}/forgot-password`, "post", { email });
};

export const resetPassword = async (token: string, newPassword: string, email: string) => {
    return await genericRequest(`${BASE_URL}/reset-password`, "post", {
        email,
        token,
        newPassword,
    });
};