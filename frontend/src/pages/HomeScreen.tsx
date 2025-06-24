import Navbar from "../components/NavBar.tsx";
import React, {useState} from "react";
import Modal from "../components/Modal.tsx";
import {onCreateClass} from "../hooks/onCreate.ts";

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

    return (
        <>
            <Navbar/>
            <button onClick={() => setIsModalOpen(true)}></button>
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
                            <input type={"text"} name={"description"} value={Class.description} onChange={handleChange}/>
                        </label>
                    </form>
                }
            />

        </>
    )
}

export default HomeScreen;