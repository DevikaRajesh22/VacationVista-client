import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState{
    auth:{
        sellerInfo:string
    }
}

const SellerLoggedOut=()=>{
    const sellerInfo=useSelector((state:RootState)=>state.auth);
    console.log('sellerLoggedOut',sellerInfo)
    return(
        sellerInfo.sellerInfo ? <Navigate to='/seller/dashboard'/> : <Outlet/>
    )
}

export default SellerLoggedOut