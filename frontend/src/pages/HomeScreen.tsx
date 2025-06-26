import Navbar from "../components/NavBar.tsx";
import React, {useEffect, useState} from "react";
import Modal from "../components/Modal.tsx";
import "../styles/homepageStyle.css"
import {isAllow} from "../api/authApi.ts";
import {toast} from "react-toastify";
import {createClassApi, getClasses} from "../api/classesApi.ts";
import ClassCard from "../components/ClassCard.tsx";
import type {classEntity} from "../entities/classEntity.ts";

function HomeScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isIdModalOpen, setIsIdModalOpen] = useState(false)
    const [responseId, setIsResponseId] = useState("")
    const [classes, setClasses] = useState<classEntity[]>([]);
    const [Class, setClass] = useState({
        title: "",
        description: "",
    })

    useEffect(() => {
        fetchClasses()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setClass((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const createClass = async () => {
        const id = localStorage.getItem("id");
        if (!id) {
            console.error("ID не найден");
            return;
        }
        const response = await createClassApi(id, Class.title, Class.description);
        setIsModalOpen(false)
        setIsIdModalOpen(true)
        setIsResponseId(response)
    }

    const fetchClasses = async () => {
        try {
            const id = localStorage.getItem("id")
            if (!id) {
                console.error("ID не найден");
                return;
            }
            const response = await getClasses(id)
            console.log(response.classes)
            setClasses(response.classes)
            console.log(classes)
        } catch (error){
            toast.error("Ошибка загрузки классов")
        }
    }

    const handleCreateClass = async () => {
        const id = localStorage.getItem("id");

        if (!id) {
            console.error("ID не найден");
            return;
        }
        const allow = await isAllow(id);
        if (allow) {
            setIsModalOpen(true)
        } else {
            toast.error("Вы не можете создать класс")
        }
    }

    return (
        <>
            <Navbar/>
            <button className={"floating-button"} onClick={handleCreateClass}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 12H6M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={createClass}
                message={
                    <form>
                        <label>
                            Название Класса
                            <input type={"text"} name={"title"} value={Class.title} onChange={handleChange} required/>
                        </label>
                        <label>
                            Описание(опционально)
                            <input type={"text"} name={"description"} value={Class.description}
                                   onChange={handleChange}/>
                        </label>
                    </form>
                }
            />
            <Modal
                isOpen={isIdModalOpen}
                onClose={() => setIsIdModalOpen(false)}
                onConfirm={() => setIsIdModalOpen(false)}
                message={
                    <>
                        <p>{responseId}</p>
                    </>
                }/>
            <div>
                {classes.length > 0 ? (
                    classes.map((classEntityEl) => (
                        <ClassCard
                            key={classEntityEl.id}
                            id={classEntityEl.id}
                            title={classEntityEl.title}
                            description={classEntityEl.description}
                        />
                    ))
                ) : (
                    <p>Нет доступных классов</p>
                )}
            </div>
        </>
    )
}

export default HomeScreen;