import axios from "axios";
import {toast} from "react-toastify";

const authApi = axios.create({
    baseURL: 'http://localhost:8000',
})

interface LoginResponse {
    access_token: string;
}

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const response = await authApi.post<LoginResponse>("/login", {username, password})
        return response.data.access_token
    } catch (error) {
        toast.error('Ошибка входа')
        throw error;
    }
}

export const register = async (username: string, password: string): Promise<void> => {
    try {
        await authApi.post("/register", {username, password})
        toast.success('Регистрация успешна')
    } catch (error) {
        toast.error('Ошибка регистрации')
        throw error;
    }
}