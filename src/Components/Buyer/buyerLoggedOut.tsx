import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        buyerInfo: string,
    }
}

const BuyerLoggedOut = () => {
    const buyerInfo = useSelector((state: RootState) => state.auth);
    return (
        buyerInfo.buyerInfo ? <Navigate to='/' /> : <Outlet />
    )
}

export default BuyerLoggedOut