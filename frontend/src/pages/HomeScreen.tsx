import Navbar from "../components/NavBar.tsx";
import React, {useEffect, useRef, useState} from "react";
import Modal from "../components/Modal.tsx";
import "../styles/homepageStyle.css"
import {isAllow, setClassApi} from "../api/authApi.ts";
import {toast} from "react-toastify";
import {createClassApi, getClasses} from "../api/classesApi.ts";
import ClassCard from "../components/ClassCard.tsx";
import type {classEntity} from "../entities/classEntity.ts";
import Menu from "../components/Menu.tsx";

function HomeScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isIdModalOpen, setIsIdModalOpen] = useState(false)
    const [responseId, setIsResponseId] = useState("")
    const [classes, setClasses] = useState<classEntity[]>([]);
    const [openMenu, setOpenMenu] = useState(false)
    const [isOpenJoinModal, setIsOpenJoinModal] = useState(false)
    const [requestId, setIsRequestId] = useState("")
    const [Class, setClass] = useState({
        title: "",
        description: "",
    })
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        fetchClasses()
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (!menuButtonRef.current?.contains(target)) {
                setOpenMenu(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleChangeClass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setClass((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setIsRequestId(value)
    }

    const joinClass = async () => {
        const id = localStorage.getItem("id");
        if (!id) {
            console.error("ID не найден");
            return;
        }
        const response = await setClassApi(id, requestId)
        if (response !== "ok"){
            toast.error("Нельзя подключиться по этому id")
        }
        setIsOpenJoinModal(false)
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
        } catch (error) {
            toast.error("Ошибка загрузки классов")
        }
    }

    const handleOpenCreateModal = async () => {
        const id = localStorage.getItem("id");
        setOpenMenu(false)
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

    const handleJoinModal = () => {
        setIsOpenJoinModal(true)
        setIsModalOpen(false)
    }

    const handleOpenMenu = () => {
        setOpenMenu(true);
    }

    return (
        <>
            <Navbar/>
            <button className={"floating-button"} onClick={handleOpenMenu} ref={menuButtonRef}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 12H6M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <Menu
                isOpen={openMenu}
                create={handleOpenCreateModal}
                join={handleJoinModal}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={createClass}
                message={
                    <form>
                        <label>
                            Название Класса
                            <input type={"text"} name={"title"} value={Class.title} onChange={handleChangeClass} required/>
                        </label>
                        <label>
                            Описание(опционально)
                            <input type={"text"} name={"description"} value={Class.description}
                                   onChange={handleChangeClass}/>
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
            <Modal
                isOpen={isOpenJoinModal}
                onClose={() => setIsOpenJoinModal(false)}
                onConfirm={joinClass}
                message={
                    <form>
                        <label>
                            Id класса
                            <input type={"text"} value={requestId} onChange={handleChangeId} required/>
                        </label>
                    </form>
                }/>
            <div className={"class-card-list"}>
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