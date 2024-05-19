import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        adminInfo: string
    }
}

const AdminLoggedOut = () => {

    const { adminInfo } = useSelector((state: RootState) => state.auth);

    return (

        adminInfo ? < Navigate to='/admin/user' /> : <Outlet />

    )
}

export default AdminLoggedOut;