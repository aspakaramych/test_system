import axios from "axios";
import {toast} from "react-toastify";

const authApi = axios.create({
    baseURL: 'http://localhost:15000',
})

interface LoginResponse {
    access_token: string;
    id: string
}

interface isAllowResponse {
    isAllow: boolean
}

interface SetClassResponse {
    status: string
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

export const isAllow = async (id: string) : Promise<boolean> => {
    try{
        const response = await authApi.post<isAllowResponse>("/allow", {
            "id": id
        })
        return response.data.isAllow;
    } catch (error){
        toast.error('Ошибка сервера')
        throw error
    }
}

export const setClassApi = async (user_id: string, class_id: string) : Promise<string> => {
    try{
        const response = await authApi.post<SetClassResponse>("/set_class", {
            "user_id": user_id,
            "class_id": class_id
        })
        return response.data.status;
    } catch (error){
        toast.error('Ошибка сервера')
        throw error
    }
}