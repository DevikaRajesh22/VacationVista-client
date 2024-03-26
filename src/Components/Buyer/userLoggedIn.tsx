import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        buyerData:string
    }
}

const UserLoggedIn = () => {
    const buyerData = useSelector((state:state)=>state.auth);
    return (
        buyerData.buyerData ? < Outlet /> : <Navigate to='/login' />
    )
}

export default UserLoggedIn
