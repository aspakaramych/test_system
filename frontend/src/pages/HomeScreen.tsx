import Navbar from "../components/NavBar.tsx";
import React, {useState} from "react";
import Modal from "../components/Modal.tsx";
import {onCreateClass} from "../hooks/onCreate.ts";
import "../styles/homepageStyle.css"
import {isAllow} from "../api/authApi.ts";
import {toast} from "react-toastify";

function HomeScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [Class, setClass] = useState({
        title: "",
        description: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setClass((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCreateClass = async () => {
        const id = localStorage.getItem("id");

        if (!id) {
            console.error("ID не найден");
            return;
        }
        const allow = await isAllow(id);
        if (allow){
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
                onConfirm={onCreateClass}
                message={
                    <form>
                        <label>
                            Название
                            <input type={"text"} name={"title"} value={Class.title} onChange={handleChange} required/>
                        </label>
                        <label>
                            Описание
                            <input type={"text"} name={"description"} value={Class.description}
                                   onChange={handleChange}/>
                        </label>
                    </form>
                }
            />

        </>
    )
}

export default HomeScreen;