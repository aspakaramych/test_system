import axios from "axios";
import {toast} from "react-toastify";

const authApi = axios.create({
    baseURL: 'http://localhost:15000',
})

interface LoginResponse {
    access_token: string;
    id: string
}

export const login = async (username: string, password: string): Promise<[string, string]> => {
    try {
        const response = await authApi.post<LoginResponse>("/login", {username, password})
        console.log(response.data.access_token)
        return [response.data.access_token, response.data.id]
    } catch (error) {
        toast.error('Ошибка входа')
        throw error;
    }
}

export const register = async (username: string, password: string, name: string, surname: string): Promise<void> => {
    try {
        console.log({"username": username, "password": password, "name": name, "surname": surname, "teacher": false, "classes": []})
        await authApi.post("/register", {
            "classes": [],
            "name": name,
            "password": password,
            "surname": surname,
            "teacher": false,
            "username": username,
        })

        toast.success('Регистрация успешна')
    } catch (error) {
        toast.error('Ошибка регистрации')
        throw error;
    }
}