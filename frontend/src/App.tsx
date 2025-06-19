import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Registry from "./pages/Registry.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path={"/register"} element={<Registry />}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <div>Главная страница</div>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
