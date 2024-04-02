import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState{
    auth:{
        sellerInfo:string
    }
}

const SellerLoggedIn=()=>{
    const sellerInfo=useSelector((state:RootState)=>state.auth);
    return(
        sellerInfo.sellerInfo ? <Outlet/> : <Navigate to='/seller/login'/>
    )
}

export default SellerLoggedIn