import axios from "axios";

const tasksApi = axios.create({
    baseURL: "http://localhost:17000"
})

export const get_tasks = async () => {

}