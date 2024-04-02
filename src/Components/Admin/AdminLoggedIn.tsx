import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState{
    auth:{
        adminInfo : string
    }
}

const AdminLoggedIn = ()=>{

    const {adminInfo} = useSelector((state:RootState)=>state.auth);
    return (
        adminInfo ? <Outlet/> : < Navigate to='/admin/login' />
    )
}

export default AdminLoggedIn;