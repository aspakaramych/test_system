import React from "react";
import "../styles/modalStyle.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string | React.ReactNode
}

const Modal : React.FC<ModalProps> = ({isOpen, onClose, onConfirm, message}) => {
    if (!isOpen) return null;

    return (
        <div className={"modal-overlay"}>
            <div className={"modal-content"}>
                {typeof message === "string" ? (
                    <p>{message}</p>
                ) : (
                    <div className={"modal-form"}>{message}</div>
                )}
                <div className={"modal-button"}>
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={onConfirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

export default Modal