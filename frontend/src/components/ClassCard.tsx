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
                <h3>{classentity.description}</h3>
            </div>
            <div>
                <div>
                    <button type={"button"} onClick={() => navigate(`/${classentity.id}/tasks`)}>Задачи</button>
                </div>
                <div>
                    <button type={"button"} onClick={() => navigate(`/${classentity.id}/queue`)}>Очередь</button>
                </div>
            </div>
            <div>
                <button type={"button"} onClick={() => navigate(`/${classentity.id}/users`)}>Пользователи</button>
            </div>
        </div>
    )
}

export default ClassCard;