import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const {user, token} = useStateContext()
    if (!token){
        return <Navigate to="/login" />
    }
    const onLogout = (ev) =>{
        ev.preventDefault()
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>header para usuarios que si estan logueados</div>
                    <div>{user.name}</div>
                    <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            
        </div>
    )
}