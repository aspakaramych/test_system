import axios from "axios";
import type {classEntity} from "../entities/classEntity.ts";
import {toast} from "react-toastify";

const classesApi = axios.create({
    baseURL: "http://localhost:16000"
});

interface getClassesResponse{
    classes: Array<classEntity>
}


export const getClasses = async (id: string) : Promise<Array<classEntity>> => {
    try {
        const response = await classesApi.post<getClassesResponse>("/", {"id": id});
        return response.data.classes
    } catch (error){
        toast.error("Ошибка получения классов");
        throw error;
    }
}