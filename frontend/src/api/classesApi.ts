import axios from "axios";
import type {classEntity} from "../entities/classEntity.ts";
import {toast} from "react-toastify";

const classesApi = axios.create({
    baseURL: "http://localhost:16000"
});

interface getClassesResponse {
    classes: Array<classEntity>
}

interface createClassResponse {
    id: string
}

export const getClasses = async (id: string): Promise<Array<classEntity>> => {
    try {
        const response = await classesApi.post<getClassesResponse>("/", {"id": id});
        return response.data.classes
    } catch (error) {
        toast.error("Ошибка получения классов");
        throw error;
    }
}

export const createClassApi = async (id: string, title: string, descriprion: string): Promise<string> => {
    try {
        const response = await classesApi.post<createClassResponse>("/create", {"user_id": id, "title": title, "description": descriprion})
        return response.data.id
    } catch (error) {
        toast.error("Ошибка создания класса")
        throw error
    }
}