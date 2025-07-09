import "../styles/menuStyle.css"
import React from "react";

interface MenuProps {
    isOpen: boolean,
    join: () => void,
    create: () => void
}

const Menu: React.FC<MenuProps> = ({isOpen, join, create}) => {
    if (!isOpen) return null;
    return (
        <>
            <div className={"menu"}>
                <button onClick={join}>Присоединиться</button>
                <button onClick={create}>Создать курс</button>
            </div>
        </>

    )
}

export default Menu;