import type {classEntity} from "../entities/classEntity.ts";
import {useNavigate} from "react-router-dom";
import "../styles/classCardStyle.css"

function ClassCard(classentity: classEntity) {
    const navigate = useNavigate();
    return (
        <div className={"class-card"}>
            <div className={"class-card-header"}>
                <h2 className={"class-card-title"}>{classentity.title}</h2>
            </div>
            <div className={"class-card-description-container"}>
                <h3 className={"class-card-description"}>{classentity.description}</h3>
            </div>
            <div className={"class-card-buttons-group"}>
                <div className={"class-card-button-wrapper"}>
                    <button className={"class-card-button"} type={"button"} onClick={() => navigate(`/${classentity.id}/tasks`)}>Задачи</button>
                </div>
                <div className={"class-card-button-wrapper"}>
                    <button className={"class-card-button"} type={"button"} onClick={() => navigate(`/${classentity.id}/queue`)}>Очередь</button>
                </div>
            </div>
            <div className={"class-card-single-button-group"}>
                <button className={"class-card-button"} type={"button"} onClick={() => navigate(`/${classentity.id}/users`)}>Пользователи</button>
            </div>
        </div>
    )
}

export default ClassCard;