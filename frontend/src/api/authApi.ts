import axios from "axios";
import {toast} from "react-toastify";

const authApi = axios.create({
    baseURL: 'http://localhost:15000',
})

interface LoginResponse {
    access_token: string;
}

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const response = await authApi.post<LoginResponse>("/login", {username, password})
        console.log(response.data.access_token)
        return response.data.access_token
    } catch (error) {
        toast.error('Ошибка входа')
        throw error;
    }
}

export const register = async (username: string, password: string, name: string, surname: string): Promise<void> => {
    try {
        console.log({"username": username, "password": password, "name": name, "surname": surname})
        await authApi.post("/register", {"username": username, "password": password, "name": name, "surname": surname})

        toast.success('Регистрация успешна')
    } catch (error) {
        toast.error('Ошибка регистрации')
        throw error;
    }
}