import { Outlet } from "react-router-dom"

export default function GuestLayout() {
    return (
        <div>
            para usuarios que no han iniciado sesion
            <Outlet />
        </div>
    )
}