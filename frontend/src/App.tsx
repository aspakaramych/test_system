import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Registry from "./pages/Registry.tsx";
import HomeScreen from "./pages/HomeScreen.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path={"/register"} element={<Registry />}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <HomeScreen />
                    </PrivateRoute>
                }/>
                <Route path={`/account/:id`} element={<AccountPage/>}></Route>
                <Route path={":id/tasks"} element={<TasksPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
