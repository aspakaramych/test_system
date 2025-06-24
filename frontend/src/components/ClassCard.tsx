import type {classEntity} from "../entities/classEntity.ts";
import {useNavigate} from "react-router-dom";

function ClassCard(classentity: classEntity) {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <h2>{classentity.title}</h2>
            </div>
            <div>
                <div>
                    <button type={"button"} onClick={() => navigate("/")}>Задачи</button>
                </div>
                <div>
                    <span>Очередь</span>
                </div>
            </div>
            <div>
                <span>Пользователи</span>
            </div>
        </div>
    )
}

export default ClassCard;