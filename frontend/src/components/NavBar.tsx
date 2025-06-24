import {useNavigate} from "react-router-dom";
import "../styles/navStyle.css"

function Navbar() {
    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    return (
        <nav className={"navbar"}>
            <button type={"button"} onClick={() => navigate("/")}>Главная</button>
            <button type={"button"} onClick={() => navigate(`/account/${id}`)}>Аккаунт</button>
        </nav>

    )
}

export default Navbar;