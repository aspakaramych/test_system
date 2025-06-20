import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import {register} from "../api/authApi.ts";
import "../styles/registerStyle.css"

function Registry() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            await register(username, password, name, surname);
            navigate("/login")
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className={"register-form"}>
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <input type={"text"}
                           placeholder={"Логин"}
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required/>
                    <br/>
                    <input type={"password"}
                           placeholder={"Пароль"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required/>
                    <br/>
                    <input type={"text"}
                           placeholder={"Имя"}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required/>
                    <br/>
                    <input type={"text"}
                           placeholder={"Фамилия"}
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                           required/>
                    <br/>
                    <button type={"submit"} disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                    </button>
                </form>
                <p>
                    Уже есть аккаунт? <a href="/login">Войти</a>
                </p>
            </div>
        </>
    )
}

export default Registry;