import Navbar from "../components/NavBar.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getTasks, type TaskResponse} from "../api/classesApi.ts";

function TasksPage() {
    const {id} = useParams()

    const {data: tasks, isLoading, isError} = useQuery<TaskResponse[]>({
        queryKey: ["class_id", id],
        queryFn: () => getTasks(id!),
        retry: 2
    })
    console.log(tasks)

    return (
        <>
            <Navbar />
        </>
    )
}

export default TasksPage;