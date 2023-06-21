import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div>
            para usuarios que si estan logueados
         <Outlet />
        </div>
    )
}