import {useEffect, useState} from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, [])

    const login = (token: string, id: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

    return { isAuthenticated, login, logout };
}