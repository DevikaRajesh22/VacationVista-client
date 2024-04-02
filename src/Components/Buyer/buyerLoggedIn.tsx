import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        buyerInfo: string
    }
}

const BuyerLoggedIn = () => {
    const buyerInfo = useSelector((state: RootState) => state.auth);
    return (
        buyerInfo.buyerInfo ? < Outlet /> : <Navigate to='/login' />
    )
}

export default BuyerLoggedIn
