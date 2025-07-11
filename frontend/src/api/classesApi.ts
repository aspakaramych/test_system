import axios from "axios";
import type {classEntity} from "../entities/classEntity.ts";
import {toast} from "react-toastify";

const classesApi = axios.create({
    baseURL: "http://localhost:16000"
});

const userApi = axios.create({
    baseURL: "http://localhost:15000"
})

interface getClassesResponse {
    classes: Array<classEntity>
}

interface createClassResponse {
    id: string
}

export interface TaskResponse {
    id: string
    title: string
}

interface Tasks {
    tasks: TaskResponse[]
}

export const getClasses = async (id: string): Promise<Array<classEntity>> => {
    try {
        const response = await userApi.post<getClassesResponse>("/get_class", {"id": id});
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

export const getTasks = async (class_id: string) : Promise<TaskResponse[]> => {
    try {
        const response = await classesApi.post<Tasks>("/get_tasks", {"class_id": class_id})
        return response.data.tasks
    } catch (error) {
        toast.error("Ошибка получения классов")
        throw error
    }
}