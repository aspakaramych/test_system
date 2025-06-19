import type {JSX} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;