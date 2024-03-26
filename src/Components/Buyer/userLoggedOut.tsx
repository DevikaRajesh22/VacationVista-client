import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        buyerData:string,
    }
}

const UserLoggedOut=()=>{
    const buyerData = useSelector((state:state)=>state.auth);
    if(buyerData){
        return <Navigate to='/' />
    }else{
        return <Outlet />
    }
}

export default UserLoggedOut