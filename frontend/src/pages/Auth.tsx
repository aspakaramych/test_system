import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {login} from "../api/authApi.ts";
import "../styles/loginStyle.css"

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const {login: loginHook} = useAuth();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const token = await login(username, password);
            loginHook(token)
            navigate("/")
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div>
                <div className={"auth-form"}>
                    <h2>Вход</h2>
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
                        <button type={"submit"} disabled={isLoading}>
                            {isLoading ? "Загрузка..." : "Войти"}
                        </button>
                    </form>
                    <p>
                        Нет аккаунта? <a href={"/register"}>Зарегистрироваться</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Auth;